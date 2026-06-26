import { By } from 'selenium-webdriver';
import { BasePage } from './BasePage';

/** Page Object for the shopping cart. */
export class CartPage extends BasePage {
  private readonly items = By.css('[data-testid="cart-item"], .cart-item');
  private readonly emptyMessage = By.xpath("//*[contains(translate(., 'EMPTY', 'empty'), 'empty')]");
  private readonly checkoutBtn = By.xpath("//button[contains(translate(., 'CHECKOUT', 'checkout'), 'checkout')]");

  async openCart(): Promise<void> {
    await this.open('/cart');
  }

  async itemCount(): Promise<number> {
    const items = await this.driver.findElements(this.items);
    return items.length;
  }

  async isEmpty(): Promise<boolean> {
    return this.exists(this.emptyMessage);
  }

  async hasCheckout(): Promise<boolean> {
    return this.exists(this.checkoutBtn);
  }
}
