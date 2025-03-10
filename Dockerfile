# Use the official Playwright image which includes Node.js and all browsers
# This image is based on Node.js, so no need for separate FROM node:20
FROM mcr.microsoft.com/playwright:v1.50.1-noble

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Copy the Reporter directory to /app/reporter
COPY Reporter /app/reporter

# Set permissions for node_modules and executable files
RUN chmod -R 755 node_modules && \
    chmod 755 /app/node_modules/.bin/cucumber-js

# Set environment variables
ENV BROWSER=chrome
ENV HEADLESS="true"
ENV baseURL=https://parabank.parasoft.com
ENV REPORT_PATH=/report

# Command to run tests and generate report
CMD ["sh", "-c", "npm run test && node Reporter.js"]

# Define a volume for report storage
VOLUME ["/app/report"]
