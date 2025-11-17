
import RegistrationForm from './RegistrationForm';
import registrationLastName from '../../fixtures/registrationLastName.json';

describe('Last name field validation', () => {
  const page = new RegistrationForm();

  beforeEach(() => {
    cy.visit('/');
    page.openRegistration();

  });

  for (const { id, input, expect: exp } of registrationLastName) {
    it(`Case ${id}: "${input}"`, () => {
        page.typeAndBlur(page.lastNameInput(), input);
        page.errorUnder(page.lastNameInput()).should(exp?.error ? 'contain.text' : 'not.exist', exp?.error || '');
    });
  }
});


