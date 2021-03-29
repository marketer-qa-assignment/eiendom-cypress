Cypress.Commands.add("getBySel", (selector, ...args) => {
    return cy.get(`[data-testid=${selector}]`, ...args).filter(':visible');
});

Cypress.Commands.add("login", (username, password) => {
    cy.intercept("POST", "/brukere/logg_in").as("loggedIn")
    cy.intercept("https://maps.googleapis.com").as("googleApi")

    cy.getBySel("modal-login-button").click()

    cy.getBySel("user-email").type(username);
    cy.getBySel("user-password").type(password);
    cy.getBySel("modal-login-submit").click();

    //Verify if successfully logged in
    cy.wait('@loggedIn').its('response.statusCode').should('eq', 302)

    //Wait for Google API request to be sure that landing page is loaded.
    cy.wait("@googleApi")

});
