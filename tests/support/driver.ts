import { Builder, ThenableWebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export const BASE_URL = process.env.BASE_URL ?? 'http://localhost:5173';

/**
 * Builds a Chrome WebDriver. Set HEADLESS=1 (default in CI) to run without a
 * visible browser window.
 */
export function buildDriver(): ThenableWebDriver {
  const options = new chrome.Options();
  if (process.env.HEADLESS === '1' || process.env.CI) {
    options.addArguments('--headless=new');
  }
  options.addArguments('--no-sandbox', '--disable-dev-shm-usage', '--window-size=1366,900');

  return new Builder().forBrowser('chrome').setChromeOptions(options).build();
}
