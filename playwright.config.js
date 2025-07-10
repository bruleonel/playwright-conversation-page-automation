// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 60 * 1000,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    headless: 
    false, 
    slowMo: 10000,                // rodar com UI por padrão
    viewport: { width: 1280, height: 720 },
    video: 'on-first-retry',       // grava vídeo se houver falha
    screenshot: 'only-on-failure',  // captura apenas falhas
    actionTimeout: 15 * 1000,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox',  use: { browserName: 'firefox'  } },
    { name: 'webkit',   use: { browserName: 'webkit'   } },
  ],
});
