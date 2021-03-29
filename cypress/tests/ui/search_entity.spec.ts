describe("Search entity", function () {

    beforeEach(function () {
        cy.visit("https://eiendom.no/")
        cy.fixture("user").then((userInfo) => {
            cy.login(userInfo.username, userInfo.password)
        });
        cy.fixture("entity").as("entity")
    });

    it.only("should allow an user to search entity, add and remove it from favourites ", function () {
        const entity = this.entity[0]

        cy.get(".search-container #autocomplete").type(entity.searchText)
        cy.get(".search-section .section-result.active").should("be.visible")
        cy.get(".search-container button").click()

        Cypress.on('uncaught:exception', () => {
            // returning false here prevents Cypress from failing the test.
            // Issue raised: https://github.com/marketer-qa-assignment/eiendom-cypress/issues/1
            // TODO: Remove when issue fixed
            return false
        })

        cy.getBySel("project-favourite-button").should("not.have.class", "favourited")
        cy.get(".tools button.favourite").click()
        cy.getBySel("project-favourite-button").should("have.class", "favourited")

        cy.get(".listing-info-header h1").should("contain", entity.name)
        cy.get(".listing-info-header .listing-info-subtitle").should("contain", entity.subtitle)
        cy.url().should("eq", entity.url)

        cy.get("#my-profile").click()
        cy.getBySel("favourites-profile-link").click()

        cy.get("[data-testid=property-card-link][href*=" + entity.url.split("/").pop() + "]").within(() => {
            cy.get(".property-card-info .property-title").should("contain", entity.name)
            cy.get(".property-card-info .property-description").should("contain", entity.subtitle)
            cy.get(".property-card").click()
        })

        cy.getBySel("project-favourite-button").should("have.class", "favourited")
        cy.get(".listing-info-header h1").should("contain", entity.name)
        cy.get(".listing-info-header .listing-info-subtitle").should("contain", entity.subtitle)
        cy.url().should("eq", entity.url)

        cy.get(".tools button.favourite").click()
        cy.getBySel("project-favourite-button").should("not.have.class", "favourited")

        cy.get("#my-profile").click()
        cy.getBySel("favourites-profile-link").click()
        cy.get("[data-testid=property-card-link][href*=" + entity.url.split("/").pop() + "]").should("not.exist")
    });
});