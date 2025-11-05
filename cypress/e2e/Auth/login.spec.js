describe ("Authentication - Login", () => {
    test.beforeEach(() => {
        cy.visit("auth/login");
        
        });

    it ("should successfully log in with valid credentials", () => {
        cy.visit("/");
    })

});
