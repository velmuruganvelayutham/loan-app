// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
    const baseUrl = Cypress.env('CYPRESS_BASEURL');
    const clerkOrigin = Cypress.env('CYPRESS_CLERK_ORIGIN');
    cy.log('CYPRESS_BASEURL:', Cypress.env('CYPRESS_BASEURL'));
    cy.log('CYPRESS_CLERK_ORIGIN:', Cypress.env('CYPRESS_CLERK_ORIGIN'));
    cy.visit(baseUrl);
    cy.origin(clerkOrigin, () => {
        const cleakAppName = Cypress.env('CYPRESS_CLERK_APP_NAME');
        cy.contains(cleakAppName);
        cy.contains("continue");
        // Retrieve username and password from environment variables
        const username = Cypress.env('CYPRESS_USERNAME');
        const password = Cypress.env('CYPRESS_PASSWORD');
        cy.get("#identifier-field").type(username);
        cy.get('#identifier-field').should('have.value', username);
        cy.get('[data-localization-key="formButtonPrimary"]').click();
        // input the password
        cy.get("#password-field").type(password);
        cy.get('[data-localization-key="formButtonPrimary"]').click();
    })

});
