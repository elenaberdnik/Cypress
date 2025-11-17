
import RegistrationForm from './RegistrationForm';
import registrationPassword from '../../fixtures/registrationPassword.json';

describe('Password field validation', () => {
  const page = new RegistrationForm();

  beforeEach(() => {
    cy.visit('/');
    page.openRegistration();

  });

  for (const { id, input, expect: exp } of registrationPassword) {
    it(`Case ${id}: "${input}"`, () => {
        page.typeAndBlur(page.passwordInput(), input);
        page.errorUnder(page.passwordInput()).should(exp?.error ? 'contain.text' : 'not.exist', exp?.error || '');
    });
  }
});