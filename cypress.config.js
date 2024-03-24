const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    CYPRESS_BASEURL: 'http://localhost:3000/loan-app-demo',
    CYPRESS_CLERK_ORIGIN: 'stirring-sheepdog-90.accounts.dev',
    CYPRESS_USERNAME: 'xxxxxxxxxxxxxx@gmail.com',
    CYPRESS_PASSWORD: 'yyyyyyyyyyyyyyyyyy',
    CYPRESS_CLERK_APP_NAME: 'demo-finance'
  },
});
