
describe('master: customer test suites', () => {
  const APP_CUSTOMER_NAME = "DEMO_FINANCE";
  const CUSTOMER_NAME = "CYPRESS_CUSTOMER_1";
  const MOBILE_NUMBER = "9999999999";
  const CITY_NAME = "சிவராமபேட்டை";
  const FATHER_NAME = "CYPRESS_FATHER_NAME_1";
  const ADDRESS = "CYPRESS_ADDRESS_1";
  const WORK = "CYPRESS_WORK_1";
  let baseUrl = Cypress.env('CYPRESS_BASEURL');
  beforeEach(() => {
    cy.login();
  });

  it('Add new customer', () => {
    // Ensure the URL is navigated to the loan-app UI 
    cy.on('window:alert', (message) => {
      // Assert the content of the alert message
      expect(message).to.equal('Saved Successfully');
    });
    cy.url().should('include', `${baseUrl}/create`);
    cy.get('h2').contains("CUSTOMER MASTER");
    cy.get('[data-cypress-loan-app-id="app-customer-name"]').contains(APP_CUSTOMER_NAME);
    cy.get('[data-cypress-loan-app-customername="customername"]').type(CUSTOMER_NAME);
    cy.get('[data-cypress-loan-app-mobilenumber="mobilenumber"]').type(MOBILE_NUMBER);
    cy.get('[data-cypress-loan-app-cityname="cityname"]').select(CITY_NAME);
    cy.get('[data-cypress-loan-app-citynametext="citynametext"]').type(CITY_NAME);
    cy.get('[data-cypress-loan-app-fathername="fathername"]').type(FATHER_NAME);
    cy.get('[data-cypress-loan-app-address="address"]').type(ADDRESS);
    cy.get('[data-cypress-loan-app-work="work"]').type(WORK);
    cy.get('[data-cypress-loan-app-save="save"]').click();

  })

  it('View the newly created customer', () => {
    // Ensure the URL is navigated to the loan-app UI 
    cy.on('window:alert', (message) => {
      // Assert the content of the alert message
      expect(message).to.equal('Saved Successfully');
    });
    cy.url().should('include', `${baseUrl}/create`);
    cy.get('h2').contains("CUSTOMER MASTER");
    cy.get('[data-cypress-loan-app-id="app-customer-name"]').contains(APP_CUSTOMER_NAME);
    cy.get('#react-select-3-input').click().type(`${CUSTOMER_NAME}`);
    cy.get('#react-select-3-option-1').click();
    cy.get('[data-cypress-loan-app-work="work"]').should("have.value", WORK);
    cy.get('[data-cypress-loan-app-fathername="fathername"]').should("have.value", FATHER_NAME);
    cy.get('[data-cypress-loan-app-address="address"]').should("have.value", ADDRESS);
    cy.get('[data-cypress-loan-app-citynametext="citynametext"]').should("have.value", CITY_NAME);
    cy.get('[data-cypress-loan-app-mobilenumber="mobilenumber"]').should("have.value", MOBILE_NUMBER);
    cy.get('[data-cypress-loan-app-customername="customername"]').should("have.value", CUSTOMER_NAME);
  })



})