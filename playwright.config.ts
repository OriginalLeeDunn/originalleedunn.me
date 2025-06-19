import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Configure visual comparison
        screenshot: "only-on-failure",
        video: "on-first-retry",
        trace: "on-first-retry",
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        // Skip visual tests in Firefox
        screenshot: "off",
        video: "off",
        trace: "off",
      },
    },
    // Skip WebKit tests by default due to dependency issues
    // Uncomment and configure this section if you want to run WebKit tests
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     screenshot: 'off',
    //     video: 'off',
    //     trace: 'off',
    //   },
    //   timeout: 30 * 1000,
    //   retries: 2,
    // },
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
        screenshot: "only-on-failure",
      },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3003",
    reuseExistingServer: false,
    timeout: 120 * 1000, // 2 minutes
    env: {
      PORT: "3003",
    },
  },
});
