# Automated Test Project

This project contains automated tests for CIVI CRM verifying individual to individual relationships using WebdriverIO and TypeScript.

## Setup

1. Clone this repository:

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

   Replace `<repository-url>` and `<repository-directory>` with your actual repository URL and directory name.

2. Install the dependencies:
   ```sh
   npm install
   ```

## Running Tests

To execute the test suite, use the following command:

```sh
npm run test
```

## Generating and Viewing Allure Report

After running the tests, you can generate and view the Allure report with:

```sh
npm run allure-report
```

## Project Structure

- **pageobjects/**: Contains page object files for different pages.
- **specs/**: Contains test specification files.
- **wdio.conf.ts**: Configuration file for WebdriverIO.

## Scripts

- **test**: Runs the test suite using WebdriverIO.
  ```sh
  npm run test
  ```
- **allure-report**: Generates and opens the Allure report.
  ```sh
  npm run allure-report
  ```

## Dependencies

- WebdriverIO
- TypeScript
- Allure Reporter
