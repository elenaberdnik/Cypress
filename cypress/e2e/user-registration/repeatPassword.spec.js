
import RegistrationForm from './RegistrationForm';
import registrationRepeatPassword from '../../fixtures/registrationRepeatPassword.json';

describe('Repeat Password field validation', () => {
  const page = new RegistrationForm();

  beforeEach(() => {
    cy.visit('/');
    page.openRegistration();

  });

  for (const { id, password, repeat, expect: exp } of registrationRepeatPassword) {
    it(`Case ${id}: "${password}", "${repeat}"`, () => {
        page.typeAndBlur(page.passwordInput(), password);
        page.typeAndBlur(page.repeatPasswordInput(), repeat);
        page.errorUnder(page.repeatPasswordInput()).should(exp?.error ? 'contain.text' : 'not.exist', exp?.error || '');
    });
  }
});