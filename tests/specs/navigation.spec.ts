import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { buildDriver } from '../support/driver';
import { HomePage } from '../pages/HomePage';

describe('Online Pharmacy — Navigation & routing', function () {
  this.timeout(60_000);
  let driver: WebDriver;
  let home: HomePage;

  before(async () => {
    driver = buildDriver();
    home = new HomePage(driver);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('loads the home page with a visible heading', async () => {
    await home.openHome();
    const heading = await home.headingText();
    expect(heading.trim().length).to.be.greaterThan(0);
  });

  const routes = ['/medicines', '/categories', '/prescription', '/about', '/contact', '/cart'];
  routes.forEach((route) => {
    it(`renders the ${route} route without crashing`, async () => {
      await home.open(route);
      const url = await home.currentUrl();
      expect(url).to.contain(route);
    });
  });

  it('navigates from home to the medicines catalogue', async () => {
    await home.openHome();
    await home.goToMedicines();
    const url = await home.currentUrl();
    expect(url).to.contain('/medicines');
  });
});
