describe('Home page animations', () => {
  it('shows the static headline', () => {
    cy.visit('/');
    cy.contains('li', 'Software Development Services.').should('be.visible');
  });

  it('type the long text with GSAP', () => {
    cy.visit('/');

    cy.get('ul li').eq(1).should('have.text', '');

    cy.get('ul li')
      .eq(1)
      .should('contain.text', 'Our development team guides and enables you');
  });

  it('loops words', () => {
    cy.visit('/');
    const words = ['Coders', 'Devs', 'AI'];

    words.forEach((w) => {
      cy.contains('ul li', w, { timeout: 15000 }).should('be.visible');
    });
  });
});