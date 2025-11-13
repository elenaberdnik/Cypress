
import RegistrationForm from './RegistrationForm';
import registrationEmail from '../../fixtures/registrationEmail.json';

describe('Email field validation', () => {
  const page = new RegistrationForm();

  beforeEach(() => {
    cy.visit('/');
    page.openRegistration();

  });

  for (const { id, input, expect: exp } of registrationEmail) {
    it(`Case ${id}: "${input}"`, () => {
        page.typeAndBlur(page.emailInput(), input);
        page.errorUnder(page.emailInput()).should(exp?.error ? 'contain.text' : 'not.exist', exp?.error || '');
    });
  }
});