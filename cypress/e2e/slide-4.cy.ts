describe('Slide Four - Map with Markers', () => {
  const positions = [
    [51.505, -0.09], // United Kingdom
    [40.505, -0.09], // Spain
    [30.505, -0.09], // Algeria
    [20.505, -0.09], // Mali
  ];
  const markerCountries = [
    "United Kingdom",
    "Spain", 
    "Algeria",
    "Mali",
  ];

  beforeEach(() => {
    cy.intercept('GET', 'https://nominatim.openstreetmap.org/reverse*', (req) => {
      const lat = Number(req.query.lat);
      let country = 'Unknown';
      if (lat === 51.505) country = 'United Kingdom';
      else if (lat === 40.505) country = 'Spain';
      else if (lat === 30.505) country = 'Algeria';
      else if (lat === 20.505) country = 'Mali';
      req.reply({
        statusCode: 200,
        body: { address: { country } }
      });
    }).as('getCountry');
    
    cy.visit('/');
    cy.get('section').eq(3).scrollIntoView();
  });

  it('renders the map and markers', () => {
    cy.get('.leaflet-container', { timeout: 20000 }).should('exist');
    
    cy.get('.leaflet-marker-icon', { timeout: 20000 }).should('have.length', 4);
  });

  it('can hover markers and see tooltips', () => {
    cy.get('.leaflet-container', { timeout: 30000 }).should('exist');
    cy.get('.leaflet-marker-icon', { timeout: 30000 }).should('have.length', 4);
    
    // Hover over first marker
    cy.get('.leaflet-marker-icon').first().trigger('mouseover', { force: true });
    
    // Check tooltip appears (exists, don't check visibility due to clipping)
    cy.get('.leaflet-tooltip', { timeout: 15000 })
      .should('exist')
      .should('contain.text', 'Country:');
    
    // Move mouse away to hide tooltip
    cy.get('.leaflet-marker-icon').first().trigger('mouseout', { force: true });
  });

  it('markers show correct country information on hover', () => {
    cy.get('.leaflet-container', { timeout: 30000 }).should('exist');
    cy.get('.leaflet-marker-icon', { timeout: 30000 }).should('have.length', 4);
    
    for (let index = 0; index < positions.length; index++) {
      // Hover over marker
      cy.get('.leaflet-marker-icon').eq(index)
        .should('exist')
        .trigger('mouseover', { force: true });
      
      // Wait for tooltip and check content (don't check visibility due to clipping)
      cy.get('.leaflet-tooltip', { timeout: 15000 })
        .should('exist')
        .should('contain.text', 'Country:')
        .should('contain.text', markerCountries[index]);
      
      // Move mouse away to hide tooltip
      cy.get('.leaflet-marker-icon').eq(index)
        .trigger('mouseout', { force: true });
      
      // Wait a bit for tooltip to disappear
      cy.wait(500);
    }
  });
});
