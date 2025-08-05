describe('Logo Home Link', () => {
  it('clicking the logo keeps you on the homepage', () => {
    cy.visit('/');
    cy.get('a[aria-label="Home"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});