import teamData from '../../src/data/team.json';

describe('Slide Four - Map with Markers', () => {  beforeEach(() => {
    cy.visit('/');
    cy.get('section').eq(3).scrollIntoView();
  });

  it('renders the map and markers', () => {
    cy.get('.leaflet-container', { timeout: 20000 }).should('exist');
    
    cy.get('.leaflet-marker-icon', { timeout: 20000 }).should('have.length', teamData.length);
  });

  it('can hover markers and see team member tooltips', () => {
    cy.get('.leaflet-container', { timeout: 30000 }).should('exist');
    cy.get('.leaflet-marker-icon', { timeout: 30000 }).should('have.length', teamData.length);
    
    cy.get('.leaflet-marker-icon').first().trigger('mouseover', { force: true });
    
    cy.get('.leaflet-tooltip', { timeout: 15000 })
      .should('exist')
      .should('contain.text', teamData[0].name);
    
    cy.get('.leaflet-marker-icon').first().trigger('mouseout', { force: true });
  });

  it('markers show correct team member information on hover', () => {
    cy.get('.leaflet-container', { timeout: 30000 }).should('exist');
    cy.get('.leaflet-marker-icon', { timeout: 30000 }).should('have.length', teamData.length);
    
    for (let index = 0; index < teamData.length; index++) {
      cy.get('.leaflet-marker-icon').eq(index)
        .should('exist')
        .trigger('mouseover', { force: true });
      
      cy.get('.leaflet-tooltip', { timeout: 15000 })
        .should('exist')
        .should('contain.text', teamData[index].name)
        .should('contain.text', teamData[index].role)
        .should('contain.text', teamData[index].location);
      
      cy.get('.leaflet-marker-icon').eq(index)
        .trigger('mouseout', { force: true });
      
      cy.wait(500);
    }
  });
});
