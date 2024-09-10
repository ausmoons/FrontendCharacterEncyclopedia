// cypress/support/commands.ts

// Import Cypress types
/// <reference types="cypress" />

declare global {
    namespace Cypress {
      interface Chainable {
        getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
      }
    }
  }
  
  // Custom command to get elements by data-testid attribute
  Cypress.Commands.add("getByData", (selector) => {
    return cy.get(`[data-testid=${selector}]`);
  });
  