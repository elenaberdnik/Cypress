import RegistrationForm from './RegistrationForm';
describe('User flow', () => {
  const page = new RegistrationForm();
  const email = `auto+${Date.now()}@example.com`;
  const password = '$)DLmsdQ(X)V1';

  it('registers a user, adds a car and fuel expense', () => {
    page.visit();

    
    page
      .openRegistration()
      .fillRegistrationForm({
        name: 'Elena',
        lastName: 'Berdnik',
        email,
        password,
      })
      .submitRegistration();

    cy.url().should('include', '/panel/garage');

    page.addCarButton().click();
    page.brandDropdown().select('Audi');
    page.modelDropdown().select('TT');
    page.mileageInput().type('5000');
    page.addButton().click();


    page.fuelExpensesLink().click();
    page.addExpenseButton().click();
    page.fillAddAnExpenseForm({
      vehicle: 'Audi TT',
      date: '14.11.2025',
      mileage: '5000',
      liters: '50',
      totalCost: '300',
    });
  });
});
