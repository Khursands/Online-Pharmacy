import { By, WebElement } from 'selenium-webdriver';
import { BasePage } from './BasePage';

/** Page Object for the medicines catalogue and add-to-cart actions. */
export class MedicinesPage extends BasePage {
  private readonly productCards = By.css('[data-testid="medicine-card"], .medicine-card, .product-card');
  private readonly addToCartBtn = By.xpath(".//button[contains(translate(., 'ADD', 'add'), 'add')]");
  private readonly searchInput = By.css('input[type="search"], input[placeholder*="earch"]');

  async openMedicines(): Promise<void> {
    await this.open('/medicines');
    await this.waitForVisible(this.productCards);
  }

  async productCount(): Promise<number> {
    const cards = await this.driver.findElements(this.productCards);
    return cards.length;
  }

  async firstCard(): Promise<WebElement> {
    return this.waitForVisible(this.productCards);
  }

  async addFirstToCart(): Promise<void> {
    const card = await this.firstCard();
    const button = await card.findElement(this.addToCartBtn);
    await button.click();
  }

  async search(term: string): Promise<void> {
    if (await this.exists(this.searchInput)) {
      const input = await this.waitForVisible(this.searchInput);
      await input.clear();
      await input.sendKeys(term);
    }
  }
}
