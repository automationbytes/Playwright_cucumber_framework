const { HeaderSearchContainer } = require("./header-search-container");

class LoginPage {

  headerSearchContainer = new HeaderSearchContainer(this.page);

  locators = {
    "username_input": "#user-name",
    "password_input": "#password",
    "login_button": '//input[@value="Log In"]',
    "inventory_container": "#inventory_container"
  }

  async launchTheApplication() {
    return await page.goto(global.BASE_URL);
  }

  async amazon() {
    return await page.goto("https://www.amazon.in/");
  }

  async flipkart() {
    return await page.goto("https://www.flipkart.com/");
  }


  async verifyLoginPageIsDisplayed() {
    return expect(await page.title()).toBe('ParaBank | Welcome | Online Banking');
  }

  async submitLoginForm() {
    const element = await page.waitForSelector(this.locators.username_input);
    await page.fill(this.locators.username_input, 'test');
    await page.fill(this.locators.password_input, 'test');
    await page.click(this.locators.login_button);
  }

  async verifyAfterLoginPage() {
    await page.waitForSelector(locators.inventory_container);
    const visible = await page.isVisible(locators.inventory_container);
    return expect(visible).toBeTruthy();
  }
}

module.exports = { LoginPage };