describe('User can see footer buttons', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('footer has Facebook icon ', () => {
   cy.get('a.socials_link .icon-facebook').should('be.visible');

  });
   it('footer has Telegram icon', () => {
   cy.get('a.socials_link .icon-telegram').should('be.visible');
  
  });
  it('footer has YouTube icon', () => {
   cy.get('a.socials_link .icon-youtube').should('be.visible');
  
  });
    it('footer has Instagram icon', () => {
   cy.get('a.socials_link .icon-instagram').should('be.visible');
  
  });
     it('footer has Linkedin icon', () => {
   cy.get('a.socials_link .icon-linkedin').should('be.visible');
  
  });
   it('footer has ItHillel link', () => {
   cy.get('a.contacts_link.display-4[href="https://ithillel.ua').should('be.visible');
  
  });
it('footer has support link', () => {
   cy.get('a.contacts_link.h4[href="mailto:developer@ithillel.ua').should('be.visible');
  
  });
   });

