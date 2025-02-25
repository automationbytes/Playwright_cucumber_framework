# Playwright Cucumber Quickstart

## Overview
This framework combines Playwright and Cucumber to provide a powerful solution for end-to-end testing of web applications. It allows you to write tests in a behavior-driven development (BDD) style, making it easier to understand and maintain.

### Key Features
- **Cross-Browser Testing**: Leverage Playwright's capabilities to run tests across multiple browsers (Chromium, Firefox, and WebKit).
- **BDD Style**: Write tests in a natural language format using Cucumber, making it accessible for non-technical stakeholders.
- **Rich Reporting**: Generate detailed reports in various formats (JSON, HTML, Excel) to analyze test results effectively.
- **Easy Setup**: Quickly set up the testing environment with Docker or Podman, ensuring consistency across different machines.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Playwright_Framework-master
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Building the Podman Image

Before running the application, you need to build the Podman image. Use the following command:

```bash
podman build -t playwright-cucumber-quickstart .
```

This command builds the image using the Dockerfile in the current directory and tags it as `playwright-cucumber-quickstart`.

## Running the Application

To run the application and generate reports using Podman, use the following command:

```bash
podman run --rm -v $(pwd)/report:/app/report playwright-cucumber-quickstart
```

This command mounts the `report` directory from your current working directory to the `/app/report` directory in the container, allowing you to access the generated reports.

## Running the Application Locally

If you prefer to run the application locally without using Podman, you can do so by following these steps:

1. Ensure you have Node.js installed on your machine.
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the tests and generate reports:
   ```bash
   npm run test
   ```

4. To generate the report manually, you can run:
   ```bash
   node Reporter.js
   ```

## Checking Reports

After running the application, check the `report` directory in your current working directory for the generated reports:
- JSON report: `report/report.json`
- HTML report: `report/index.html`
- Excel report: `report/report.xlsx`

Open the HTML report in your web browser to view the test results visually.
