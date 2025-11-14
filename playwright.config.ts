import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 2,
  reporter: 'html',
  
  use: {
    baseURL: 'https://meal-dashboard-fb882.web.app/', // or 'https://meal-dashboard-fb882.web.app/' for deployed app but it may result in a timeout exceeding error
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'ng serve',
    url: 'http://localhost:4200',
    reuseExistingServer: true,
     timeout: 120_000,
  },
});