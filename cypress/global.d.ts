/// <reference types="cypress" />

declare namespace Cypress {

    interface Chainable {

        /**
         * Logs-in user by using UI
         */

        getBySel(dataTestAttribute: string, args?: any): Chainable<Element>;

        login(username: string, password: string): void;

        // waitForLoading(): void;

    }
}
