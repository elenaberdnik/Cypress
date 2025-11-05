describe('User can see header elements', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the logo in the header', () => {
    cy.get('header a.header_logo')
      .should('be.visible')
     
  });

  it('clicking logo navigates to home', () => {
    cy.get('header a.header_logo').click();
    cy.location('pathname').should('eq', '/');
  });
  it ('should display the home button in the header' , ()  => {
    cy.get('a.header-link').contains('Home').should('be.visible');
  });
  it ('should display the about button in the header' , ()  => {
    cy.get('button.header-link').contains('About').should('be.visible');
  });
   it ('should display the contacts button in the header' , ()  => {
    cy.get('button.header-link').contains('Contacts').should('be.visible');
  });
    it ('should display the Guest log in button in the header' , ()  => {
    cy.get('button.header-link').contains('Guest log in').should('be.visible');
  });
   it ('should display the Sign in button in the header' , ()  => {
    cy.get('button.header_signin').contains('Sign In').should('be.visible');
  });
});

