
import RegistrationForm from './RegistrationForm';
import registrationName from '../../fixtures/registrationName.json';

describe('Name field validation', () => {
  const page = new RegistrationForm();

  beforeEach(() => {
    cy.visit('/');
    page.openRegistration();

  });

  for (const { id, input, expect: exp } of registrationName) {
    it(`Case ${id}: "${input}"`, () => {
        page.typeAndBlur(page.nameInput(), input);
        page.errorUnder(page.nameInput()).should(exp?.error ? 'contain.text' : 'not.exist', exp?.error || '');
    });
  }
});


