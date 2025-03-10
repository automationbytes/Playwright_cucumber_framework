module.exports = {
  default: {
    parallel: 3,
    format: [
      "html:./reports/cucumber_report.html",
      "json:./reports/cucumber_report.json"
    ],
    outputDir: "./reports",
    require: [
      "setup/hooks.js",
      "step-definitions/**/*steps.js"
    ],
    paths: [
      "features/restapi.feature"
    ],
    playwright: {
      headless: process.env.HEADLESS === "true" || false,
      viewport: {
        "width": 1280,
        "height": 720
      },
      network: true,
      video: 'on',
      console: true,
      trace:'on',
      screenshot:'on',

      baseURL: process.env.baseURL || "https://parabank.parasoft.com",
      browserName: process.env.BROWSER,
      ignoreHTTPSErrors: true,
      timeout: 60000
    }
  }
}
