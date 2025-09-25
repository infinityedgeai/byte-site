describe('Slide Four - Map with Markers', () => {
  const markerCountries: Record<number, string> = {
    0: "United Kingdom",
    1: "Spain",
    2: "Algeria",
    3: "Mali",
  };

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.get('section').eq(3).scrollIntoView();
  });

  it('checks markers and their country popups', () => {
    cy.get('.leaflet-marker-icon').each(($marker, index) => {
      cy.wrap($marker).first().click({ force: true });

      const expectedCountry = markerCountries[index];

      cy.get('.leaflet-popup-content', { timeout: 10000 })
        .should('exist')
        .and('contain.text', expectedCountry);

      cy.get('.leaflet-popup-close-button').click({ force: true });
    });
  });
});
