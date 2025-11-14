import RegistrationForm from './RegistrationForm';

describe('User registration', () => {
  const page = new RegistrationForm();

  beforeEach(() => {
    page.visit();
  });

  it('registers a new user successfully', () => {
    const email = `abc+${Date.now()}@example.com`;
    const password = '$)DLmsdQ(X)V1';

    page
      .openRegistration()
      .fillRegistrationForm({ name: 'Ivan', lastName: 'Hello', email, password })
      .submitRegistration();

    page.successMessage().should('be.visible');
    cy.url().should('include', '/panel/garage');
  });
  

});
