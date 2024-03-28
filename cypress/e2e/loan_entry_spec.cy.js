
describe('Entry: Loan test suites', () => {
  const APP_CUSTOMER_NAME = "DEMO_FINANCE";
  const CUSTOMER_NAME = "CYPRESS_CUSTOMER_1";
  const MOBILE_NUMBER = "9999999999";
  const CITY_NAME = "சிவராமபேட்டை";
  //const CITY_ID="65fbc93bd556a47bf30d6351";
  const FATHER_NAME = "CYPRESS_FATHER_NAME_1";
  const ADDRESS = "CYPRESS_ADDRESS_1";
  const WORK = "CYPRESS_WORK_1";
  const LINMAN_NAME = "CYPRESS_LINEMAN_CHANGED";
  const LINEMAN_ID = "66015bc652317b3451bcd9bf";
  const LINE_NAME = "CYPRESS_LINE_1";
  const WEEK_NO = "1";
  const BOOK_NO = "1";
  const WEEK_COUNT = "25";
  const START_DATE = "2023-03-26";
  const GIVEN_DATE = "";
  const DUE_DATE = "";
  const END_DATE = "";
  const GIVEN_AMOUNT = "10000";
  const DOCUMENT_CHARGE = "";
  const INTEREST = "";
  const TOTAL_AMOUNT = "";
  const DUE_AMOUNT = "";
  const PAID_AMOUNT = "";

  let baseUrl = Cypress.env('CYPRESS_BASEURL');
  beforeEach(() => {
    cy.login();
  });

  it('Add Loan Entry', () => {
    cy.on('window:alert', (message) => {
      // Assert the content of the alert message
      expect(message).to.equal('Saved Successfully');
    });
    cy.get('#loan-app-nav-dropdown-entry').click();
    cy.get('#loan-app-dropdown-item-loan').click();
    cy.url().should('include', `${baseUrl}/loan`);

    cy.get('#react-select-3-input').click();
    cy.get('#react-select-3-input').type(`${CUSTOMER_NAME}`)
    //cy.get('#react-select-3-input').focus()
    //cy.get('#react-select-3-input').type('{enter}');
    cy.get('#react-select-3-input').type('{enter}');
    //cy.get('#react-select-3-input').click();
    //cy.get('[data-cypress-loan-app-lineman="lineman"]').click();
    cy.get('[data-cypress-loan-app-lineman="lineman"]').select(`${LINEMAN_ID}`);
    //cy.get('[data-cypress-loan-app-lineman="lineman"]').type('{enter}');
    cy.get('[data-cypress-loan-app-lineno="lineno"]').type(`${LINE_NAME}`);
    cy.get('[data-cypress-loan-app-weekno="weekno"]').type(`${WEEK_NO}`);
    cy.get('[data-cypress-loan-app-bookno="bookno"]').type(`${BOOK_NO}`);
    cy.get('[data-cypress-loan-app-startdate="startdate"]').type(`${START_DATE}`).blur();
    cy.get('[data-cypress-loan-app-givenamount="givenamount"]').type(`${GIVEN_AMOUNT}`).blur();
    cy.get('[data-cypress-loan-app-dueamount="dueamount"]').invoke('val').then((value) => {
      // `value` will contain the current value of the input text box
      cy.log('The value is:', value);
      cy.get('[data-cypress-loan-app-paidamount="paidamount"]').type(value);
      cy.get('[data-cypress-loan-app-save="save"]').click();
    });
    /*cy.get('[data-cypress-loan-app-mobilenumber="mobilenumber"]').should("have.value", MOBILE_NUMBER);
    cy.get('[data-cypress-loan-app-work="work"]').should("have.value", WORK);
    cy.get('[data-cypress-loan-app-fathername="fathername"]').should("have.value", FATHER_NAME);
    cy.get('[data-cypress-loan-app-address="address"]').should("have.value", ADDRESS);
    cy.get('[data-cypress-loan-app-cityname="cityname"]').should("have.value", CITY_NAME);*/

    //cy.get('[data-cypress-loan-app-weekcount="weekcount"]').type(`${WEEK_COUNT}`);

    /*cy.get('[data-cypress-loan-app-givendate="givendate"]').type(`${GIVEN_DATE}`);
    cy.get('[data-cypress-loan-app-payingdate="payingdate"]').type(`${DUE_DATE}`);
    cy.get('[data-cypress-loan-app-enddate="enddate"]').type(`${END_DATE}`);
    cy.get('[data-cypress-loan-app-givenamount="givenamount"]').type(`${GIVEN_AMOUNT}`);
    cy.get('[data-cypress-loan-app-documentcharge="documentcharge"]').type(`${DOCUMENT_CHARGE}`);
    cy.get('[data-cypress-loan-app-interest="interest"]').type(`${INTEREST}`);
    cy.get('[data-cypress-loan-app-total="total"]').type(`${TOTAL_AMOUNT}`);
    cy.get('[data-cypress-loan-app-dueamount="dueamount"]').type(`${DUE_AMOUNT}`);
    cy.get('[data-cypress-loan-app-paidamount="paidamount"]').type(`${PAID_AMOUNT}`);
    cy.get('[data-cypress-loan-app-save="save"]').click();*/
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