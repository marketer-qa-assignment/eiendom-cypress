/// <reference types="cypress" />

declare namespace Cypress {

    interface Chainable {

        /**
         * Logs-in user by using UI
         */

        login(username: string, password: string): void;

        /**
         * Get element using data-testid attribute
         */
        getBySel(dataTestAttribute: string, args?: any): Chainable<Element>;

    }
}
