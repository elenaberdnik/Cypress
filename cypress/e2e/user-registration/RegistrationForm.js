export default 
class RegistrationForm {
  visit() { cy.visit('/'); return this; }

  signInBtn()       { return cy.get('button.btn.btn-outline-white.header_signin'); }
  registrationBtn() { return cy.get('app-signin-modal .modal-footer .btn.btn-link'); }

  form()            { return cy.get('app-signup-form'); }

  nameInput()             { return this.form().find('#signupName, [formcontrolname="name"], input[name="name"]'); }
  lastNameInput()         { return this.form().find('#signupLastName, [formcontrolname="lastName"], input[name="lastName"]'); }
  emailInput() {return this.form().find('[formcontrolname="email"], #signupEmail, input[type="email"]');}

  passwordInput()         { return this.form().find('#signupPassword, [formcontrolname="password"], input[name="password"]'); }
  repeatPasswordInput()   { return this.form().find('#signupRepeatPassword, [formcontrolname="repeatPassword"], input[name="repeatPassword"]'); }

 registerBtn() {
  return cy.get('app-signup-modal .modal-footer .btn.btn-primary');}
  successMessage()  { return cy.contains('app-alert .alert, .alert', 'Registration complete'); }

  openSignInModal()      { this.signInBtn().click(); return this; }
  openRegistrationForm() { this.registrationBtn().click(); this.form().should('be.visible'); return this; }
  openRegistration()     { return this.openSignInModal().openRegistrationForm(); }

  fillRegistrationForm({ name, lastName, email, password, repeatPassword = password }) {
    this.nameInput().clear().type(name);
    this.lastNameInput().clear().type(lastName);
    this.emailInput().clear().type(email);
    this.typePassword(password);
    this.typeRepeatPassword(repeatPassword);
    return this;
  }

  submitRegistration() {
  this.registerBtn()
    .should('exist')
    .and('not.be.disabled')
    .click();
  return this;
}
  expectRegisterDisabled(){ this.registerBtn().should('be.disabled'); return this; }
  expectRegisterEnabled() { this.registerBtn().should('not.be.disabled'); return this; }

  typePassword(v)        { this.passwordInput().clear().type(v, { sensitive:true }); return this; }
  typeRepeatPassword(v)  { this.repeatPasswordInput().clear().type(v, { sensitive:true }); return this; }

  typeAndBlur(field, value='') { field.clear(); value ? field.type(value) : field.focus(); field.blur(); return this; }

  errorUnder(field) { 
    return field.closest('.form-group, .mb-3, .input-group, .form-field')
                .find('.invalid-feedback, .text-danger');
  }
}
