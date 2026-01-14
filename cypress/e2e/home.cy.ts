describe('Home page animations', () => {
  const typingText =
    'Our development team guides and enables you in every step of the process towards making your product vision a reality.';
  const loopWords = ['Software Engineers', 'AI Specialists', 'Data Experts'];

  const sel = {
    bubbles: '.bubble',
    list: 'ul',
    headline: 'ul li:nth-child(1)',
    typing: 'ul li:nth-child(2)',
    loop: 'ul li:nth-child(3)',
  };

  it('shows the static headline', () => {
    cy.visit('/');
    cy.contains('li', 'Software Development Services.').should('be.visible');
  });

  it('pre-hides list items and then reveals them (staggered)', () => {
    cy.visit('/');

    cy.get('ul li').should('have.length.at.least', 3);

    cy.get(sel.headline).should('have.css', 'opacity', '0');
    cy.get(sel.typing).should('have.css', 'opacity', '0');
    cy.get(sel.loop).should('have.css', 'opacity', '0');

    cy.get(sel.headline, { timeout: 10000 }).should('be.visible');
    cy.get(sel.typing, { timeout: 10000 }).should('be.visible');
    cy.get(sel.loop, { timeout: 10000 }).should('be.visible');
  });

  it('animates the bubbles into view before starting the main timelines', () => {
    cy.visit('/');

    cy.get(sel.bubbles).should('have.length', 5);

    cy.get(sel.bubbles, { timeout: 10000 }).first().should('be.visible');

    cy.get(sel.typing).should('have.text', '');

    cy.get(sel.bubbles, { timeout: 10000 }).each(($el) => {
      cy.wrap($el).should('be.visible');
    });

    cy.get(sel.typing, { timeout: 15000 }).should(($el) => {
      const t = $el.text().replace(/\s+/g, ' ').trim();
      expect(t.length).to.be.greaterThan(0);
    });

    cy.get(sel.bubbles).each(($el) => cy.wrap($el).find('svg').should('exist'));
    [
      'Requirement Analysis',
      'Product Design',
      'Product Development',
      'Testing & Integration',
      'Deployment & Release',
    ].forEach((label) => {
      cy.contains(`${sel.bubbles} span`, label, { timeout: 10000 }).should(
        'be.visible'
      );
    });
  });

  it('types the long text with GSAP after bubbles intro', () => {
    cy.visit('/');

    cy.get(sel.typing).should('have.text', '');

    cy.get(sel.typing, { timeout: 20000 }).should(($el) => {
      const t = $el.text().replace(/\s+/g, ' ').trim();
      expect(t).to.contain('Our development team guides and enables you');
    });

    cy.get(sel.typing, { timeout: 30000 }).should(($el) => {
      const t = $el.text().replace(/\s+/g, ' ').trim();
      expect(t).to.contain(typingText);
    });
  });

  it('loops words in the third list item', () => {
    cy.visit('/');

    loopWords.forEach((w) => {
      cy.contains(sel.loop, w, { timeout: 40000 }).should('be.visible');
    });
  });

  it('respects prefers-reduced-motion (animations become instant)', () => {
    const typingText =
      'Our development team guides and enables you in every step of the process towards making your product vision a reality.';

    const visitWithReducedMotion = (reduced: boolean) => {
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.stub(win, 'matchMedia').callsFake((query: string) => {
            const isReduceQuery = /\(prefers-reduced-motion:\s*reduce\)/i.test(
              query ?? ''
            );
            return {
              matches: reduced && isReduceQuery,
              media: query,
              onchange: null,
              addListener: cy.stub(),
              removeListener: cy.stub(),
              addEventListener: cy.stub(),
              removeEventListener: cy.stub(),
              dispatchEvent: cy.stub(),
            } as unknown as MediaQueryList;
          });
        },
      });
    };

    visitWithReducedMotion(true);

    cy.get('.bubble', { timeout: 4000 }).should('have.length', 5);
    cy.get('.bubble', { timeout: 4000 }).each(($el) => {
      cy.wrap($el).should('be.visible');
    });

    cy.get('ul li:nth-child(1)', { timeout: 4000 }).should('be.visible');
    cy.get('ul li:nth-child(2)', { timeout: 4000 }).should('be.visible');
    cy.get('ul li:nth-child(3)', { timeout: 4000 }).should('be.visible');

    cy.get('ul li:nth-child(2)', { timeout: 4000 }).should(($el) => {
      const t = $el.text().replace(/\s+/g, ' ').trim();
      expect(t).to.contain(typingText);
    });

    cy.get('ul li:nth-child(3)', { timeout: 4000 }).should('be.visible');
  });

  it('works when reduced-motion is false (default animations)', () => {
    const visitWithReducedMotion = (reduced: boolean) => {
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.stub(win, 'matchMedia').callsFake((query: string) => {
            const isReduceQuery = /\(prefers-reduced-motion:\s*reduce\)/i.test(
              query ?? ''
            );
            return {
              matches: reduced && isReduceQuery,
              media: query,
              onchange: null,
              addListener: cy.stub(),
              removeListener: cy.stub(),
              addEventListener: cy.stub(),
              removeEventListener: cy.stub(),
              dispatchEvent: cy.stub(),
            } as unknown as MediaQueryList;
          });
        },
      });
    };

    visitWithReducedMotion(false);

    cy.get('ul li:nth-child(2)').should('have.text', '');

    cy.get('ul li:nth-child(2)', { timeout: 30000 }).should(($el) => {
      const t = $el.text().replace(/\s+/g, ' ').trim();
      expect(t).to.contain('Our development team guides and enables you');
    });
  });
})