// cypress/e2e/themeToggle.cy.ts

describe('Theme Toggle', () => {
  beforeEach(() => {
    cy.visit('/'); // Visit your homepage
  });

  it('should toggle between light and dark themes', () => {
    cy.get('html').should('not.have.class', 'dark');
    cy.get('header').should('have.css', 'background-color', 'rgb(255, 255, 255)'); 

    cy.get('button[aria-label="Toggle theme"]').click();

    cy.get('html').should('have.class', 'dark');

    cy.get('header').should('have.css', 'background-color', 'rgb(0, 0, 0)'); 

    cy.get('button[aria-label="Toggle theme"]').click();

    cy.get('html').should('not.have.class', 'dark');
    cy.get('header').should('have.css', 'background-color', 'rgb(255, 255, 255)'); 
  });
});
