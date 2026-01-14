// cypress/e2e/themeToggle.cy.ts

describe('Theme Toggle', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should toggle between light and dark themes', () => {
    // Start in light mode
    cy.get('html').should('not.have.class', 'dark');

    // Get the background color from CSS variable
    cy.get('header').then(($header) => {
      const lightBg = getComputedStyle($header[0]).backgroundColor;

      // Toggle to dark mode
      cy.get('button[aria-label="Toggle theme"]').click();
      cy.get('html').should('have.class', 'dark');

      // Background should change
      cy.get('header').should(($el) => {
        const darkBg = getComputedStyle($el[0]).backgroundColor;
        expect(darkBg).not.to.equal(lightBg);
      });

      // Toggle back to light mode
      cy.get('button[aria-label="Toggle theme"]').click();
      cy.get('html').should('not.have.class', 'dark');

      // Background should match original
      cy.get('header').should('have.css', 'background-color', lightBg);
    });
  });
});
