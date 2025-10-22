# Cypress Test Setup

This is a simple Cypress test project with passing tests for basic functionality.

## Project Structure

```
cypress/
├── e2e/
│   ├── basic.cy.js        # Basic arithmetic, string, array, and boolean tests
│   └── advanced.cy.js     # Object, comparison, and type tests
cypress.config.js           # Cypress configuration
package.json               # Project dependencies and scripts
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Tests

To run all tests in headless mode:

```bash
npm test
```

Or to run tests with the Cypress UI:

```bash
npm run cypress:open
```

## Test Files

### `basic.cy.js`
Contains 12 passing tests covering:
- Arithmetic operations (add, subtract, multiply, divide)
- String operations (concatenation, length, includes)
- Array operations (length, includes, equality)
- Boolean operations (true, false, truthy, falsy)

### `advanced.cy.js`
Contains 11 passing tests covering:
- Object property verification
- Object equality
- Object key validation
- Comparison operators (equal, not equal, greater than, less than)
- Null and undefined checks
- Type verification (number, string, boolean, array, object, function)

## Total Tests

**23 passing tests** - all tests are designed to pass immediately without any setup.

## Technology

- **Cypress**: Modern end-to-end testing framework
- **Node.js**: JavaScript runtime environment

## Notes

- Tests use Cypress's built-in assertion library (Chai)
- All tests are unit-style tests that don't require a running web server
- The `baseUrl` in the config is set but not used by these basic tests
