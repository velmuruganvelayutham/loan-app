
describe('Entry: City test suites', () => {
    const APP_CUSTOMER_NAME = "DEMO_FINANCE";
    const CITY_NAME = "CYPRESS_CITY_1";
    const CITY_UPDATE="CYPRESS_CITY_1_CHANGED";
    const LINE_NUMBER = "லைன்1";
    const LINE_NUMBER_VIEW="1";
    const LINE_NUMBER_UPDATE= "லைன்2";
    let baseUrl = Cypress.env('CYPRESS_BASEURL');
    beforeEach(() => {
        cy.login();
    });

    it('Add city Master', () => {
        cy.on('window:alert', (message) => {
            // Assert the content of the alert message
            expect(message).to.equal('Saved Successfully');
          });
        cy.get('#loan-app-nav-dropdown-master').click();
        cy.get('#loan-app-nav-dropdown-item-city').click();
        cy.url().should('include', `${baseUrl}/citycreate`);
        cy.get('h2').contains("CITY MASTER");
        cy.get('[data-cypress-loan-app-id="app-customer-name"]').contains(APP_CUSTOMER_NAME);
        cy.get('[data-cypress-loan-app-cityname="cityname"]').type(CITY_NAME);
        cy.get('[data-cypress-loan-app-linenumber="linenumber"]').select(LINE_NUMBER);
        cy.get('[data-cypress-loan-app-save="save"]').click();
    })

    it('View the newly created city', () => {
         
        cy.on('window:alert', (message) => {
          // Assert the content of the alert message
          expect(message).to.equal('Saved Successfully');
        });
        cy.get('#loan-app-nav-dropdown-master').click();
        cy.get('#loan-app-nav-dropdown-item-city').click();
        cy.url().should('include', `${baseUrl}/citycreate`);
        cy.get('h2').contains("CITY MASTER");
        cy.get('[data-cypress-loan-app-id="app-customer-name"]').contains(APP_CUSTOMER_NAME);
        
        const stringvalue=cy.get('#data-cypress-loan-app-records')
        Cypress.Commands.add('calculatePageNumber', (totalRecords, recordsPerPage) => {
            return Math.ceil(totalRecords / recordsPerPage);
        });
        const pageno=cy.calculatePageNumber(stringvalue, 5)

        cy.get(`[data-cypress-loan-app-edit="edit${CITY_NAME}"]`).click();
        cy.get('[data-cypress-loan-app-cityname="cityname"]').should("have.value", CITY_NAME);
        cy.get('[data-cypress-loan-app-linenumber="linenumber"]').should("have.value", LINE_NUMBER_VIEW);
        cy.get('[data-cypress-loan-app-cityname="cityname"]').clear();
        cy.get('[data-cypress-loan-app-linenumber="linenumber"]').select('');
        cy.get('[data-cypress-loan-app-cityname="cityname"]').type(CITY_UPDATE);
        cy.get('[data-cypress-loan-app-linenumber="linenumber"]').select(LINE_NUMBER_UPDATE);
        cy.get('[data-cypress-loan-app-save="save"]').click();
    })
    
    
})