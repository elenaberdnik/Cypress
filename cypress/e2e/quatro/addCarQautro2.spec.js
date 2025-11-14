import RegistrationForm from './RegistrationForm';

const page = new RegistrationForm();

const email = `auto+${Date.now()}@example.com`;
const password = '$)DLmsdQ(X)V1';

describe('User flow', () => {

  beforeEach(() => {
    page.visit();
  });

  it('registers a new user successfully', () => {
    page
      .openRegistration()
      .fillRegistrationForm({ 
        name: 'Elena', 
        lastName: 'Berdnik', 
        email,          
        password        
      })
      .submitRegistration();

    page.successMessage().should('be.visible');
    cy.url().should('include', '/panel/garage');
  });

  it('signs in an existing user', () => {
    page
      .openSignInModal() 
      .fillLoginForm({ email, password })  
    

    cy.url().should('include', '/panel/garage');
  });

  it('adds a car after login', () => {
   
    page
      .openSignInModal()
      .fillLoginForm({ email, password })


    page.addCarButton().click();
    page.brandDropdown().select('Audi');
    page.modelDropdown().select('TT');
    page.mileageInput().type('5000');

    page.addButton()
      .should('exist')
      .and('not.be.disabled')
      .click();
  });
});
