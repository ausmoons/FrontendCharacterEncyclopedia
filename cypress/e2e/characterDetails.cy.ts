describe('CharacterDetail Component', () => {
  it('displays character details when data is fetched successfully', () => {
    cy.visit('/characters/cGVvcGxlOjEx');
    cy.get('[data-testid="character-name"]').should(
      'contain',
      'Anakin Skywalker'
    );
    cy.get('[data-testid="birth-year-info"]').contains('Birth Year:');
    cy.get('[data-testid="birth-year-value"]').should('contain', '41.9BBY');
    cy.get('[data-testid="species-info"]').contains('Species:');
    cy.get('[data-testid="species-value"]').should('contain', 'Unknown');
    cy.get('[data-testid="homeworld-info"]').contains('Homeworld:');
    cy.get('[data-testid="homeworld-value"]').should('contain', 'Tatooine');
    cy.get('[data-testid="films-list"]').should('be.visible');
    cy.get('[data-testid="films-list"]').contains('The Phantom Menace');
    cy.get('[data-testid="films-list"]').contains('Attack of the Clones');
  });

  it('displays error message when there is an error fetching character details', () => {
    cy.visit('/characters/1');
    cy.get('[data-testid="error-message"]').should('be.visible');
    cy.get('[data-testid="error-message"]').should('contain', 'not found');
  });

  it('navigates back to characters list when back button is clicked', () => {
    cy.visit('/characters/cGVvcGxlOjEx');
    cy.get('[data-testid="back-button"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
