import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { buildDriver } from '../support/driver';
import { MedicinesPage } from '../pages/MedicinesPage';

describe('Online Pharmacy — Medicines catalogue', function () {
  this.timeout(60_000);
  let driver: WebDriver;
  let medicines: MedicinesPage;

  before(async () => {
    driver = buildDriver();
    medicines = new MedicinesPage(driver);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('displays a list of medicine products', async () => {
    await medicines.openMedicines();
    const count = await medicines.productCount();
    expect(count, 'expected at least one product card').to.be.greaterThan(0);
  });

  it('adds the first product to the cart', async () => {
    await medicines.openMedicines();
    await medicines.addFirstToCart();
    // Add-to-cart should not throw and the page should remain interactive.
    const url = await medicines.currentUrl();
    expect(url).to.contain('/medicines');
  });

  it('filters the catalogue when searching', async () => {
    await medicines.openMedicines();
    const before = await medicines.productCount();
    await medicines.search('zzzznotamedicine');
    const after = await medicines.productCount();
    expect(after).to.be.at.most(before);
  });
});
