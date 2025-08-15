// cypress/e2e/themeToggle.cy.ts

describe('Theme Toggle', () => {
  beforeEach(() => {
    cy.visit('/'); // Visit your homepage
  });

  it('should toggle between light and dark themes', () => {
    // Check initial theme (assume light by default)
    cy.get('html').should('not.have.class', 'dark');
    cy.get('header').should('have.css', 'background-color', 'rgb(255, 255, 255)'); // white header

    // Click the toggle button
    cy.get('button[aria-label="Toggle theme"]').click();

    // HTML should now have dark class
    cy.get('html').should('have.class', 'dark');

    // Menu bar background should be dark (Tailwind gray-900)
    cy.get('header').should('have.css', 'background-color', 'rgb(17, 24, 39)'); // Tailwind gray-900

    // Click again to go back to light
    cy.get('button[aria-label="Toggle theme"]').click();

    cy.get('html').should('not.have.class', 'dark');
    cy.get('header').should('have.css', 'background-color', 'rgb(255, 255, 255)'); // back to white
  });
});
