const {Given, When, Then} = require("@cucumber/cucumber")
const{request, except, expect} = require("@playwright/test")



Given(/^I have endpoint "([^"]*)"$/, async function (endpoint) {
    this.endpoint = endpoint
});

When(/^I perform get call$/, async function() {

    const apiContext = await request.newContext({ignoreHTTPSErrors:true})
    console.log(this.endpoint)
    response = await apiContext.get(this.endpoint)
    this.responseData = await response.json()
    this.statusCode = await response.status()

    const formattedResponse = response ? JSON.stringify(this.responseData, null, 2): ""
    this.attach("Response: \n \n"+ formattedResponse,"text/x.cucumber.text+plain")

});

Then(/^I verify 200 status$/, async function() {
    console.log(this.statusCode)
	expect(this.statusCode).toBe(200)
    this.attach("Status Code: \n \n"+ this.statusCode,"text/x.cucumber.text+plain")
});
