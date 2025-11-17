import RegistrationForm from './RegistrationForm';
const nameCases = require('../../fixtures/registrationName.json');

describe('User registration', () => {
  const page = new RegistrationForm();

  beforeEach(() => {
    page.visit();
  });

  it('registers a new user successfully', () => {
    const email = `auto+${Date.now()}@example.com`;
    const password = '$)DLmsdQ(X)V1';

    page
      .openRegistration()
      .fillRegistrationForm({ name: 'Elena', lastName: 'Berdnik', email, password })
      .submitRegistration();

    page.successMessage().should('be.visible');
    cy.url().should('include', '/panel/garage');
  });

});
