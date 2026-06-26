import { By } from 'selenium-webdriver';
import { BasePage } from './BasePage';

/** Page Object for the pharmacy landing page and primary navigation. */
export class HomePage extends BasePage {
  private readonly navMedicines = By.xpath("//a[contains(translate(., 'MEDICINES', 'medicines'), 'medicines')]");
  private readonly navCart = By.xpath("//a[contains(@href, '/cart')]");
  private readonly heading = By.css('h1, h2');

  async openHome(): Promise<void> {
    await this.open('/');
    await this.waitForVisible(this.heading);
  }

  async headingText(): Promise<string> {
    const el = await this.waitForVisible(this.heading);
    return el.getText();
  }

  async goToMedicines(): Promise<void> {
    const link = await this.waitForVisible(this.navMedicines);
    await link.click();
  }

  async goToCart(): Promise<void> {
    const link = await this.waitForVisible(this.navCart);
    await link.click();
  }
}
