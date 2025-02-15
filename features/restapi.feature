Feature: API

Scenario: API Scenario

Given I have endpoint "https://webservice.toscacloud.com/api/v1/Coffees"
When I perform get call
Then I verify 200 status