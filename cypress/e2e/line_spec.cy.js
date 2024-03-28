
describe('Entry: Line test suites', () => {
    const APP_CUSTOMER_NAME = "DEMO_FINANCE";
    const LINE_NAME = "CYPRESS_LINE_1";
    const LINE_UPDATE="CYPRESS_LINE_1_CHANGED";
    const LINE_NUMBER = "100";
    const LINE_NUMBER_UPDATE= "101";
    let baseUrl = Cypress.env('CYPRESS_BASEURL');
    beforeEach(() => {
        cy.login();
    });

    it('Add Line Master', () => {
        cy.on('window:alert', (message) => {
            // Assert the content of the alert message
            expect(message).to.equal('Saved Successfully');
          });
        cy.get('#loan-app-nav-dropdown-master').click();
        cy.get('#loan-app-nav-dropdown-item-line').click();
        cy.url().should('include', `${baseUrl}/line`);
        cy.get('h2').contains("LINE MASTER");
        cy.get('[data-cypress-loan-app-id="app-customer-name"]').contains(APP_CUSTOMER_NAME);
        cy.get('[data-cypress-loan-app-linename="linename"]').type(LINE_NAME);
        cy.get('[data-cypress-loan-app-lineno="lineno"]').type(LINE_NUMBER);
        cy.get('[data-cypress-loan-app-save="save"]').click();
    })

    it('View the newly created line', () => {
         
        cy.on('window:alert', (message) => {
          // Assert the content of the alert message
          expect(message).to.equal('Saved Successfully');
        });
        cy.get('#loan-app-nav-dropdown-master').click();
        cy.get('#loan-app-nav-dropdown-item-line').click();
        cy.url().should('include', `${baseUrl}/line`);
        cy.get('h2').contains("LINE MASTER");
        cy.get('[data-cypress-loan-app-id="app-customer-name"]').contains(APP_CUSTOMER_NAME);
        cy.get(`[data-cypress-loan-app-edit="edit${LINE_NAME}"]`).click();
        cy.get('[data-cypress-loan-app-linename="linename"]').should("have.value", LINE_NAME);
        cy.get('[data-cypress-loan-app-lineno="lineno"]').should("have.value", LINE_NUMBER);
        cy.get('[data-cypress-loan-app-linename="linename"]').clear();
        cy.get('[data-cypress-loan-app-lineno="lineno"]').clear();
        cy.get('[data-cypress-loan-app-linename="linename"]').type(LINE_UPDATE);
        cy.get('[data-cypress-loan-app-lineno="lineno"]').type(LINE_NUMBER_UPDATE);
        cy.get('[data-cypress-loan-app-save="save"]').click();
    })
    
    
})