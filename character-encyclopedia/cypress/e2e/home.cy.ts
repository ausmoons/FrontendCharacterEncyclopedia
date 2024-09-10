describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads and displays the character list', () => {
    cy.visit('/');
    cy.getByData('home-page').should('be.visible');
    cy.getByData('character-list-container').should('be.visible');
    cy.getByData('search-input').should('be.visible');
    cy.getByData('sort-button').should('be.visible');
    cy.getByData('load-more-button').should('be.visible');
  });

  it('should filter characters based on search input', () => {
    cy.get('[data-testid="search-input"]')
      .type('Anakin Skywalker')
      .should('have.value', 'Anakin Skywalker');

    cy.wait(400);
    cy.get('[data-testid="character-list-container"]').should('have.length', 1);
    cy.get('[data-testid="character-list-container"]').contains('Anakin Skywalker');
  });

  it('should show no results for non-matching search term', () => {
    cy.get('[data-testid="search-input"]')
      .type('Non-existent Character')
      .should('have.value', 'Non-existent');
    cy.wait(400);
    cy.get('[data-testid="character-card"]').should('have.length', 0);
  });
});
