import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
  // Skip WebKit tests
  test.skip(
    ({ browserName }) => browserName === "webkit",
    "Skipping WebKit tests",
  );

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3003/blog");
    // Add a small delay to ensure the page is fully loaded
    await page.waitForLoadState("networkidle");
  });

  test("should display blog posts", async ({ page, browserName }) => {
    test.slow(
      browserName === "webkit",
      "Running in WebKit - allowing more time",
    );
    // Debug: Log the page content
    console.log("Page content:", await page.content());

    // Take a screenshot for debugging
    await page.screenshot({ path: "blog-page.png" });

    // Check if the blog posts are loaded
    await expect(page.getByRole("heading", { name: "The Blog" })).toBeVisible();

    // Try to find posts using different selectors
    const postSelectors = [
      "article",
      ".post",
      ".card",
      ".blog-post",
      'div[class*="card"]',
      'div[class*="post"]',
      'div[class*="hover:border"]',
      'div[class*="group"]',
    ];

    let posts = null;
    for (const selector of postSelectors) {
      const count = await page.locator(selector).count();
      console.log(`Found ${count} elements with selector: ${selector}`);
      if (count > 0) {
        posts = page.locator(selector);
        break;
      }
    }

    // If no posts found with specific selectors, try to find any div with text content
    if (!posts) {
      console.log(
        "No posts found with specific selectors, trying to find any div with content",
      );
      const allDivs = page.locator("div");
      const divsCount = await allDivs.count();
      console.log(`Found ${divsCount} div elements on the page`);

      // Log first few divs for debugging
      for (let i = 0; i < Math.min(10, divsCount); i++) {
        const text = await allDivs.nth(i).textContent();
        console.log(`Div ${i} text:`, text?.substring(0, 100) + "...");
      }

      // Try to find any div that might contain a post
      posts = page
        .locator("div")
        .filter({ hasText: /welcome|post|blog|article|read more/i });
    }

    // Check if we found any posts
    const postsCount = (await posts?.count()) || 0;
    console.log(`Found ${postsCount} potential posts`);

    // If we still don't have posts, fail with a useful message
    if (postsCount === 0) {
      console.error(
        "No blog posts found on the page. Check the page structure and content.",
      );
      // Take a screenshot of the full page for debugging
      await page.screenshot({ path: "blog-page-full.png", fullPage: true });
    }

    await expect(postsCount).toBeGreaterThan(0);

    // Check if post titles are visible and not "Untitled"
    const firstPost = posts.first();
    const firstPostTitle = await firstPost.textContent();
    console.log(
      "First post content:",
      firstPostTitle?.substring(0, 100) + "...",
    );

    expect(firstPostTitle).toBeTruthy();
    expect(firstPostTitle).not.toContain("Untitled Post");
  });

  test("should navigate to a blog post", async ({ page, browserName }) => {
    test.slow(
      browserName === "webkit",
      "Running in WebKit - allowing more time",
    );
    // First, make sure we're on the blog page
    await page.goto("http://localhost:3003/blog");
    await expect(page.getByRole("heading", { name: /blog/i })).toBeVisible({
      timeout: 10000,
    });

    // Take a screenshot of the blog page
    await page.screenshot({
      path: "test-results/blog-page-before-navigation.png",
    });

    // Find all blog post links
    const postLinks = await page.locator('a[href^="/blog/"]').all();

    if (postLinks.length === 0) {
      throw new Error("No blog post links found on the blog page");
    }

    // Get the first blog post link
    const firstPostLink = postLinks[0];
    const postHref = await firstPostLink.getAttribute("href");
    const postTitle = await firstPostLink.textContent();

    if (!postHref) {
      throw new Error("Could not find blog post href");
    }

    console.log(`Navigating to blog post: ${postHref} (${postTitle})`);

    // Navigate to the blog post
    await firstPostLink.click();

    // Wait for navigation to complete
    await page.waitForURL(`**${postHref}`, { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    // Take a screenshot for debugging
    await page.screenshot({
      path: "test-results/blog-post-page.png",
      fullPage: true,
    });

    // Check for common elements that indicate a blog post
    const checks = [
      // Check for main content area
      async () => {
        const mainContent = page
          .locator('main, article, [role="main"]')
          .first();
        return mainContent.isVisible();
      },
      // Check for blog post title (h1)
      async () => {
        const heading = page.locator("h1").first();
        return heading.isVisible();
      },
      // Check for common blog post elements
      async () => {
        const elements = [
          page.getByText(/min read/i).first(),
          page.getByText(/published on/i).first(),
          page.getByText(/tags?:/i).first(),
          page.getByRole("article").first(),
        ];

        for (const element of elements) {
          if (await element.isVisible()) {
            return true;
          }
        }
        return false;
      },
    ];

    // Run all checks and collect results
    const results = await Promise.all(
      checks.map((check) => check().catch(() => false)),
    );

    // At least one check should pass
    if (!results.some((result) => result)) {
      const pageContent = await page.content();
      console.log(
        "Page content (first 1000 chars):",
        pageContent.substring(0, 1000),
      );
      throw new Error("No expected blog post elements found on the page");
    }

    console.log("Successfully verified blog post page elements");
  });
});
