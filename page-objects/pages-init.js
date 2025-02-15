const { page } = require('@playwright/test');
const { LoginPage } = require('./login-page');

class PagesInit{

    loginPage = new LoginPage(page);

}

module.exports = { PagesInit };