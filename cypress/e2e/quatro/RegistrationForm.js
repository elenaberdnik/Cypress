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
  successMessage()  { return cy.contains('app-alert .alert, .alert', 'Registration complete'); 

  }
  emailInputLoginModal() {return cy.get('#signinEmail'); }
  passwordInputLoginModal() {return cy.get('#signinPassword'); }

   fillLoginForm({ email, password }) {
    this.emailInputLoginModal().type(email);
    this.passwordInputLoginModal().type(password);
    this.LoginBtn().should('not.be.disabled').click();
    return this;     
  }
  LoginBtn () { return cy.get('app-signin-modal .modal-footer .btn.btn-primary'); }

  addCarButton() {
  return cy.contains('button', 'Add car');
  }
  fuelExpensesLink() {
    return cy.get('a[routerlink="expenses"]');
}
addExpenseButton() {
  return cy.contains('app-fuel-expenses button.btn.btn-primary', 'Add an expense');
}
brandDropdown() { return cy.get('#addCarBrand'); }
modelDropdown() { return cy.get('#addCarModel'); }
mileageInput() { return cy.get('#addCarMileage'); }
addButton() { return cy.get('app-add-car-modal .modal-footer .btn.btn-primary'); }


VehicleDropdown() { return cy.get('#addExpenseCar'); }
ReportDateInput() { return cy.get('#addExpenseDate'); }
MileageInput() { return cy.get('#addExpenseMileage'); }
NumberOfLitersInput() { return cy.get('#addExpenseLiters'); }
TotalCostInput() { return cy.get('#addExpenseTotalCost'); }
addExpenseSubmitButton() {
  return cy.contains('app-add-expense-modal button.btn.btn-primary', 'Add');
}


fillAddAnExpenseForm ({ vehicle, date, mileage, liters, totalCost }) {
  this.VehicleDropdown().select(vehicle);
this.ReportDateInput().clear().type(date);  
 this.MileageInput().clear().type(mileage);   
this.NumberOfLitersInput().type(liters);
this.TotalCostInput().type(totalCost);
this.addExpenseSubmitButton().click();
return this;
}

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

  
}

