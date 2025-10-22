/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const { defineConfig } = require('cypress');

const baseUrl = process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:9090';


module.exports = defineConfig({
  e2e: {
    baseUrl,
    video: false,
    supportFile: false,
    screenshotOnRunFailure: false,
  },
});
