import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { buildDriver } from '../support/driver';
import { MedicinesPage } from '../pages/MedicinesPage';
import { CartPage } from '../pages/CartPage';

describe('Online Pharmacy — Cart flow', function () {
  this.timeout(60_000);
  let driver: WebDriver;
  let medicines: MedicinesPage;
  let cart: CartPage;

  before(async () => {
    driver = buildDriver();
    medicines = new MedicinesPage(driver);
    cart = new CartPage(driver);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('starts with an empty cart', async () => {
    await cart.openCart();
    const empty = await cart.isEmpty();
    const count = await cart.itemCount();
    expect(empty || count === 0).to.equal(true);
  });

  it('reflects an added product in the cart', async () => {
    await medicines.openMedicines();
    await medicines.addFirstToCart();
    await cart.openCart();
    const count = await cart.itemCount();
    expect(count).to.be.greaterThan(0);
  });

  it('shows a checkout affordance when items are present', async () => {
    await medicines.openMedicines();
    await medicines.addFirstToCart();
    await cart.openCart();
    expect(await cart.hasCheckout()).to.equal(true);
  });
});
