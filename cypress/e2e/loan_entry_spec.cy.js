
describe('Entry: Loan test suites', () => {
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

  it('Add Loan Entry', () => {
    cy.get('#loan-app-nav-dropdown-entry').click();
    cy.get('#loan-app-dropdown-item-loan').click();
    cy.url().should('include', `${baseUrl}/loan`);
    cy.get('#react-select-3-input').click().type(`${CUSTOMER_NAME}`);
    /*cy.get('#react-select-3-option-0', { timeout: 10000 }).contains(`${CUSTOMER_NAME}`);
     cy.get('#react-select-3-option-0', { timeout: 10000 }).click();
    cy.get('[data-cypress-loan-app-mobilenumber="mobilenumber"]').should("have.value", MOBILE_NUMBER);
    cy.get('[data-cypress-loan-app-work="work"]').should("have.value", WORK);
    cy.get('[data-cypress-loan-app-fathername="fathername"]').should("have.value", FATHER_NAME);
    cy.get('[data-cypress-loan-app-address="address"]').should("have.value", ADDRESS);
    cy.get('[data-cypress-loan-app-citynametext="citynametext"]').should("have.value", CITY_NAME);
 */
  })

})