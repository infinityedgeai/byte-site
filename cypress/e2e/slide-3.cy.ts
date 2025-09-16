describe('Slide Three - Word Cloud', () => { 
    beforeEach(() => { cy.visit('/'); // Visit the homepage 
cy.get('section').eq(2).scrollIntoView(); // Scroll to Slide 3 
}); 
describe('Word Cloud Rendering',  () => { 
    it('should render the word cloud when Slide 3 is in view', 
        () => { 
            cy.get('[data-cy=wordcloud-canvas]', { timeout: 15000 }).should('exist'); }); 
    it('should have non-zero dimensions', () => { 
        cy.get('[data-cy=wordcloud-canvas]', { timeout: 15000 }).should(($canvas) => { 
            expect($canvas.width()).to.be.greaterThan(0); 
            expect($canvas.height()).to.be.greaterThan(0); 
        }); 
    }); 
}); 
describe('Responsive Layout', () => { 
    it('should adjust to different viewport sizes', () => { cy.viewport(800, 600); 
        cy.get('[data-cy=wordcloud-canvas]', { timeout: 15000 }).should(($canvas) => { 
            expect($canvas.width()).to.be.lessThan(800); }); 
        cy.viewport(1200, 800); 
        cy.get('[data-cy=wordcloud-canvas]', { timeout: 15000 }).should(($canvas) => { 
            expect($canvas.width()).to.be.lessThan(1200); 
        }); 
        }); 
        }); 
describe('Animation Behavior', () => { 
                it('should fade in the word cloud when Slide 3 enters viewport', () => { 
                    cy.get('[data-cy=wordcloud-canvas]', { timeout: 15000 }).
                    should('have.css', 'opacity', '1'); }); }); });