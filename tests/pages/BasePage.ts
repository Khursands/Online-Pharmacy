import { WebDriver, By, until, WebElement } from 'selenium-webdriver';
import { BASE_URL } from '../support/driver';

/** Base Page Object with common navigation and wait helpers. */
export abstract class BasePage {
  protected readonly timeout = 10_000;

  constructor(protected readonly driver: WebDriver) {}

  async open(path = '/'): Promise<void> {
    await this.driver.get(new URL(path, BASE_URL).toString());
  }

  async currentUrl(): Promise<string> {
    return this.driver.getCurrentUrl();
  }

  protected async waitForVisible(locator: By): Promise<WebElement> {
    const el = await this.driver.wait(until.elementLocated(locator), this.timeout);
    await this.driver.wait(until.elementIsVisible(el), this.timeout);
    return el;
  }

  protected async exists(locator: By): Promise<boolean> {
    const found = await this.driver.findElements(locator);
    return found.length > 0;
  }
}
