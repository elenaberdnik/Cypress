import RegistrationForm from './RegistrationForm';

const page = new RegistrationForm();
const email = `auto+${Date.now()}@example.com`;
const password = '$)DLmsdQ(X)V1';

describe('Create car in new account via UI and validate API response', () => {
  it('registers new user, creates car and checks API response matches form data', () => {

    const carFormData = {                            
      brand: 'Audi',
      model: 'TT',
      mileage: 5000,
    };
   
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

    cy.intercept('POST', '/api/cars').as('addCarRequest');

    page.addCarButton().click();
    page.brandDropdown().select(carFormData.brand);
    page.modelDropdown().select(carFormData.model);
    page.mileageInput().type(String(carFormData.mileage));

    page.addButton()
      .should('exist')
      .and('not.be.disabled')
      .click();

    cy.wait('@addCarRequest').then(({ response }) => {
      expect(response.statusCode).to.eq(201);

      const data = response.body.data;
      expect(data.brand).to.eq(carFormData.brand);
      expect(data.model).to.eq(carFormData.model);
      expect(data.initialMileage).to.eq(carFormData.mileage);
      expect(data.mileage).to.eq(carFormData.mileage);

      cy.writeFile('cypress/fixtures/fakeCarCreation.json', {
        id: data.id,
        brand: data.brand,
        model: data.model,
        mileage: data.mileage,
      });
    });
  });
});
