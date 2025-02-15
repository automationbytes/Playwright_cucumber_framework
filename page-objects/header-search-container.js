class HeaderSearchContainer {

  locators = {
    "input_search": "input#search_query_top",
    "button_search": "button[name='submit_search']",
    "image_logo": "img.logo"
  }

  async verifySearchContainerIsDisplayed() {
    await expect(page.locator(this.locators.button_search)).toBeVisible();
  }

  async searchForProduct(product) {
    await page.type(locators.input_search, product);
    await page.keyboard.press('Enter');
  }
}

module.exports = { HeaderSearchContainer };