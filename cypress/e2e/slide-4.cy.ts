describe('Slide Four - Map with Markers', () => {
   const markerCountries: Record<string, string> = {
      "51.505,-0.09": "United Kingdom",
      "40.505,-0.09": "Spain",
      "30.505,-0.09": "Algeria",
      "20.505,-0.09": "Mali",
    };

  beforeEach(() => {
    cy.visit('/');
    cy.get('section').eq(3).scrollIntoView();
  });

  it('checks markers and their country popups', () => {
    cy.get('.leaflet-marker-icon').each(($marker, index) => {
      
      cy.wrap($marker).click({ force: true });
      const coords = $marker.attr('src'); 
      const key = Object.keys(markerCountries)[index]; 
      const expectedCountry = markerCountries[key];

      cy.get('.leaflet-popup-content', { timeout: 10000 })
        .should('exist')
        .and('contain.text', expectedCountry);

      cy.get('.leaflet-popup-close-button').click({ force: true });
    });
  });
});

