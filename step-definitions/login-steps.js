const { Given, When, Then } = require('@cucumber/cucumber');
const { PagesInit } = require('../page-objects/pages-init');
const { page } = require('@playwright/test');
const pageObjs = new PagesInit(page);




Given('I am on the landing page', async function () {
 // console.log(ENV.username)
  await pageObjs.loginPage.launchTheApplication();
  await pageObjs.loginPage.verifyLoginPageIsDisplayed();
  //await pageObjs.loginPage.headerSearchContainer.verifySearchContainerIsDisplayed();
});



Given('I am on the amazon', async function () {
  // console.log(ENV.username)
  await pageObjs.loginPage.amazon();
  // await pageObjs.loginPage.verifyLoginPageIsDisplayed();
   //await pageObjs.loginPage.headerSearchContainer.verifySearchContainerIsDisplayed();
 });
 

 
Given('I am on the facebook', async function () {
  // console.log(ENV.username)
  await pageObjs.loginPage.flipkart();

   //await pageObjs.loginPage.verifyLoginPageIsDisplayed();
   //await pageObjs.loginPage.headerSearchContainer.verifySearchContainerIsDisplayed();
 });
 