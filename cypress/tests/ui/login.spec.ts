describe("User Sign-up and Login", function () {
    beforeEach(function () {
        cy.fixture('user').as('userInfo')
        cy.visit("https://eiendom.no/")
    });

    it("should allow a visitor to login, and logout", function () {
        const userInfo = this.userInfo

        // Login User
        cy.login(userInfo.username, userInfo.password);
        cy.get("#my-profile").should('have.attr', 'href', '/profil/dashbord')
        cy.get("#my-profile").click()
        cy.getBySel("logout-link").click()
        cy.getBySel("modal-login-button").should("be.visible")
    });
});