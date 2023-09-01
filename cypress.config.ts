import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.expedia.com',
    specPattern: 'cypress/tests/**/*.spec.ts',
    supportFile: 'cypress/support/e2e.ts',
    defaultCommandTimeout: 8000,
    numTestsKeptInMemory: 0,
    watchForFileChanges: false,
    chromeWebSecurity: false,
    trashAssetsBeforeRuns: true,
    video: false,
    videosFolder: 'results/videos',
    screenshotsFolder: 'results/screenshots',
  },
});
