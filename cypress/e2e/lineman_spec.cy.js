
describe('Entry: LineMan test suites', () => {
    const APP_CUSTOMER_NAME = "DEMO_FINANCE";
    const LINEMAN_NAME = "CYPRESS_LINEMAN_1";
    const LINEMAN_UPDATE="CYPRESS_LINEMAN_CHANGED";
    const MOBILE_NUMBER = "9999999999";
    const MOBILE_NUMBER_UPDATE= "9999999991";
    let baseUrl = Cypress.env('CYPRESS_BASEURL');
    beforeEach(() => {
        cy.login();
    });

    it('Add Lineman Master', () => {
        cy.on('window:alert', (message) => {
            // Assert the content of the alert message
            expect(message).to.equal('Saved Successfully');
          });
        cy.get('#loan-app-nav-dropdown-master').click();
        cy.get('#loan-app-nav-dropdown-item-lineman').click();
        cy.url().should('include', `${baseUrl}/linemancreate`);
        cy.get('h2').contains("LINEMAN MASTER");
        cy.get('[data-cypress-loan-app-id="app-customer-name"]').contains(APP_CUSTOMER_NAME);
        cy.get('[data-cypress-loan-app-linemanname="linemanname"]').type(LINEMAN_NAME);
        cy.get('[data-cypress-loan-app-mobilenumber="mobilenumber"]').type(MOBILE_NUMBER);
        cy.get('[data-cypress-loan-app-save="save"]').click();
    })

    it('View the newly created lineman', () => {
         
        cy.on('window:alert', (message) => {
          // Assert the content of the alert message
          expect(message).to.equal('Saved Successfully');
        });
        cy.get('#loan-app-nav-dropdown-master').click();
        cy.get('#loan-app-nav-dropdown-item-lineman').click();
        cy.url().should('include', `${baseUrl}/linemancreate`);
        cy.get('h2').contains("LINEMAN MASTER");
        cy.get('[data-cypress-loan-app-id="app-customer-name"]').contains(APP_CUSTOMER_NAME);
        //cy.get('#react-select-3-input').click().type(`${LINEMAN_NAME}`);
        cy.get(`[data-cypress-loan-app-edit="edit${LINEMAN_NAME}"]`).click();
        cy.get('[data-cypress-loan-app-linemanname="linemanname"]').should("have.value", LINEMAN_NAME);
        cy.get('[data-cypress-loan-app-mobilenumber="mobilenumber"]').should("have.value", MOBILE_NUMBER);
        cy.get('[data-cypress-loan-app-linemanname="linemanname"]').clear();
        cy.get('[data-cypress-loan-app-mobilenumber="mobilenumber"]').clear();
        cy.get('[data-cypress-loan-app-linemanname="linemanname"]').type(LINEMAN_UPDATE);
        cy.get('[data-cypress-loan-app-mobilenumber="mobilenumber"]').type(MOBILE_NUMBER_UPDATE);
        cy.get('[data-cypress-loan-app-save="save"]').click();
    })
    
    
})