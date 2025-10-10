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

  it('can click markers and see popups', () => {
    cy.get('.leaflet-container', { timeout: 30000 }).should('exist');
    cy.get('.leaflet-marker-icon', { timeout: 30000 }).should('have.length', 4);
    
    cy.get('.leaflet-popup').should('not.exist');
    
    cy.get('.leaflet-marker-icon').first().click({ force: true });
  
    cy.get('.leaflet-popup-content', { timeout: 15000 })
      .should('exist')
      .should('be.visible');
    
    cy.get('.leaflet-popup-close-button').click({ force: true });
    cy.get('.leaflet-popup').should('not.exist');
  });

  it('markers show correct country information', () => {
    cy.get('.leaflet-container', { timeout: 30000 }).should('exist');
    cy.get('.leaflet-marker-icon', { timeout: 30000 }).should('have.length', 4);
    
    for (let index = 0; index < positions.length; index++) {
      cy.get('.leaflet-popup').should('not.exist');
      
      cy.get('.leaflet-marker-icon').eq(index)
        .should('exist')
        .click({ force: true });
      
      cy.get('.leaflet-popup-content', { timeout: 15000 })
        .should('exist')
        .should('have.length', 1)
        .should('contain.text', markerCountries[index]);
      
      cy.get('.leaflet-popup-close-button')
        .should('have.length', 1)
        .click({ force: true });
      
      cy.get('.leaflet-popup', { timeout: 10000 }).should('not.exist');
    }
  });
});
