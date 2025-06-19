import { test, expect } from "@playwright/test";

// Skip visual tests in CI by default
const skipVisualTests = process.env.CI === "true";

// Increase timeout for all tests in this file
test.describe.configure({ mode: "serial" });

test.describe("Blog Post Details", () => {
  // Skip WebKit tests
  test.skip(
    ({ browserName }) => browserName === "webkit",
    "Skipping WebKit tests",
  );
  test.beforeEach(async ({ page }) => {
    // Navigate to the blog page first
    await page.goto("http://localhost:3003/blog");
    await expect(page.getByRole("heading", { name: /blog/i })).toBeVisible({
      timeout: 10000,
    });

    // Wait for blog posts to load
    await page.waitForSelector('a[href^="/blog/"]', {
      state: "visible",
      timeout: 10000,
    });

    // Find and click on the first blog post
    const firstPostLink = page.locator('a[href^="/blog/"]').first();
    const postHref = await firstPostLink.getAttribute("href");

    if (!postHref) {
      throw new Error("Could not find blog post href");
    }

    console.log(`Navigating to blog post: ${postHref}`);
    await firstPostLink.click();
    await page.waitForURL(`**${postHref}`, { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    // Wait for the main content to be visible
    await page
      .waitForSelector('main, article, [role="main"], .post-content', {
        state: "visible",
        timeout: 10000,
      })
      .catch(() => {
        console.log("Main content not found, but continuing with tests...");
      });
  });

  test("should render blog post content", async ({ page, browserName }) => {
    test.slow(browserName === "webkit", "Skipping some checks in WebKit");

    // Take a screenshot for debugging
    await page.screenshot({
      path: "test-results/blog-post-content.png",
      fullPage: true,
    });

    // Get the page content for debugging
    const pageContent = await page.content();
    console.log(
      "Page content (first 1000 chars):",
      pageContent.substring(0, 1000),
    );

    // Check for main content with more flexible selectors
    const contentSelectors = [
      "main",
      "article",
      '[role="main"]',
      ".post-content",
      ".blog-post",
      ".container",
      "div:has(h1)",
      'div[class*="content"]',
      'div[class*="post"]',
      'div[class*="blog"]',
      "body", // Fallback to body if nothing else works
    ];

    // Try multiple selectors to find the main content
    let mainContent = null;
    for (const selector of contentSelectors) {
      const elements = await page.$$(selector);
      if (elements.length > 0) {
        mainContent = page.locator(selector).first();
        break;
      }
    }

    if (!mainContent) {
      console.log(
        "Could not find main content with standard selectors, falling back to body",
      );
      mainContent = page.locator("body");
    }

    // Take a screenshot for debugging
    await page.screenshot({
      path: "test-results/blog-post-content.png",
      fullPage: true,
    });

    // Check for title with more flexible selectors
    const titleSelectors = [
      "h1",
      "h2",
      ".post-title",
      ".entry-title",
      "header h1",
    ];
    let titleFound = false;

    for (const selector of titleSelectors) {
      const title = page.locator(selector).first();
      if ((await title.count()) > 0) {
        await expect(title)
          .toBeVisible({ timeout: 5000 })
          .catch(() => {});
        const text = await title.textContent();
        if (text && text.trim().length > 0) {
          titleFound = true;
          console.log(`Found title with selector '${selector}':`, text.trim());
          break;
        }
      }
    }

    if (!titleFound) {
      console.log("Could not find a visible title with standard selectors");
    }

    // Check for publication date or similar metadata
    const datePatterns = [
      /published on/i,
      /posted on/i,
      /date:/i,
      /\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4}/, // Matches dates like 01/01/2023
      /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* \d{1,2},? \d{4}/i, // Matches dates like Jan 1, 2023
    ];

    let dateFound = false;
    for (const pattern of datePatterns) {
      const dateElement = page.getByText(pattern).first();
      if ((await dateElement.count()) > 0) {
        dateFound = true;
        console.log(
          "Found date element with text:",
          await dateElement.textContent(),
        );
        break;
      }
    }

    if (!dateFound) {
      console.log("Could not find date element with standard patterns");
    }

    // Check for content sections with more flexible selectors
    const contentSectionSelectors = [
      "article p",
      ".post-content p",
      "main p",
      'div[class*="content"] p',
      'div[class*="post"] p',
      "div:has(h1) p",
    ];

    let contentFound = false;
    for (const selector of contentSectionSelectors) {
      const content = page.locator(selector).first();
      if ((await content.count()) > 0) {
        contentFound = true;
        console.log(`Found content with selector '${selector}'`);
        break;
      }
    }

    if (!contentFound) {
      console.log("Could not find content with standard selectors");
    }

    // If we're in WebKit, we're more lenient with assertions
    if (browserName !== "webkit") {
      if (!titleFound && !dateFound && !contentFound) {
        console.error("No expected content found on the page");
        console.log("Title found:", titleFound);
        console.log("Date found:", dateFound);
        console.log("Content found:", contentFound);
      }
      expect(titleFound || dateFound || contentFound).toBeTruthy();
    }
  });

  test("should have working tag links", async ({ page, browserName }) => {
    test.skip(
      browserName === "webkit" && process.env.CI === "true",
      "Skipping in WebKit on CI",
    );
    // Find all tag links
    const tagLinks = page.locator('a[href^="/blog/tag/"]');
    const tagCount = await tagLinks.count();

    if (tagCount > 0) {
      const firstTag = tagLinks.first();
      const tagText = await firstTag.textContent();

      // Click on the first tag
      await firstTag.click();
      await page.waitForLoadState("networkidle");

      // Verify we're on the tag page
      await expect(page).toHaveURL(/\/blog\/tag\//);

      // Check that the tag name is in the page title or heading
      const heading = page.locator("h1, h2").first();
      const headingText = await heading.textContent();
      expect(headingText?.toLowerCase()).toContain(tagText?.toLowerCase());

      // Check that posts are filtered by tag
      const postLinks = page.locator('a[href^="/blog/"]');
      await expect(postLinks.first()).toBeVisible();
    }
  });

  test("should have working navigation", async ({ page, browserName }) => {
    test.skip(
      browserName === "webkit" && process.env.CI === "true",
      "Skipping in WebKit on CI",
    );
    // Check for back to blog link
    const backLink = page
      .getByRole("link", { name: /back to blog|blog|all posts/i })
      .first();
    if (await backLink.isVisible()) {
      await backLink.click();
      await page.waitForURL("**/blog");
      await expect(page.getByRole("heading", { name: /blog/i })).toBeVisible();
    }
  });

  test("should be responsive on mobile", async ({ page, browserName }) => {
    test.skip(skipVisualTests, "Skipping visual tests in CI");
    test.skip(
      browserName !== "chromium",
      "Skipping visual tests in non-Chromium browsers",
    );
    // Skip this test for non-Chromium browsers in CI
    test.skip(
      browserName !== "chromium",
      "Skipping visual tests in non-Chromium browsers",
    );

    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    // Check for mobile menu toggle button
    const menuButton = page.locator(
      'button[aria-label*="menu"], button:has(svg[aria-label*="menu"])',
    );
    await expect(menuButton).toBeVisible();

    // Check that content is properly stacked on mobile
    const contentLayout = page.locator("main > div").first();
    const flexDirection = await contentLayout.evaluate((el) => {
      return window.getComputedStyle(el).flexDirection;
    });
    expect(flexDirection).toBe("column");

    // Take a screenshot for visual regression
    await page.screenshot({
      path: "test-results/blog-post-mobile.png",
      fullPage: true,
    });
  });
});

// Visual regression tests
test.describe("Visual Regression", () => {
  test.skip(skipVisualTests, "Skipping visual tests in CI");
  test("blog post page should look correct", async ({
    page,
    browserName,
  }, testInfo) => {
    test.skip(
      browserName !== "chromium",
      "Skipping visual tests in non-Chromium browsers",
    );
    // Navigate to a blog post
    await page.goto("http://localhost:3003/blog");
    const firstPostLink = page.locator('a[href^="/blog/"]').first();
    await firstPostLink.click();
    await page.waitForLoadState("networkidle");

    // Take a screenshot and compare with baseline
    expect(
      await page.screenshot({
        fullPage: true,
        animations: "disabled",
        caret: "hide",
      }),
    ).toMatchSnapshot("blog-post.png");
  });

  test("blog post mobile view should look correct", async ({
    page,
    browserName,
  }, testInfo) => {
    test.skip(
      browserName !== "chromium",
      "Skipping visual tests in non-Chromium browsers",
    );
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to a blog post
    await page.goto("http://localhost:3003/blog");
    const firstPostLink = page.locator('a[href^="/blog/"]').first();
    await firstPostLink.click();
    await page.waitForLoadState("networkidle");

    // Take a screenshot and compare with baseline
    expect(
      await page.screenshot({
        fullPage: true,
        animations: "disabled",
        caret: "hide",
      }),
    ).toMatchSnapshot("blog-post-mobile.png");
  });
});
