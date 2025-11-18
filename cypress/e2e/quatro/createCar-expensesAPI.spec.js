import RegistrationForm from './RegistrationForm';

const page = new RegistrationForm();

const email = `auto+${Date.now()}@example.com`;
const password = '$)DLmsdQ(X)V1';

describe('Create car and expense via API', () => {
  it('registers new user, then creates car via API and expense via API', () => {
    cy.api({
        method: 'POST',
        url: '/api/auth/signup',
        body: {
            name: 'Olena',
            lastName: 'Berdnyk',
            email,
            password,
            repeatPassword: password,
        },
    }).then((resp) => {
        expect(resp.status).to.eq(201);          
        expect(resp.body.status).to.eq('ok');
    }
    );
    cy.api({
      method: 'POST',
      url: '/api/cars',
      body: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 500,
      },
    }).then((carResp) => {
      expect(carResp.status).to.eq(201);          
      expect(carResp.body.status).to.eq('ok');

      const car = carResp.body.data;
      expect(car.carBrandId).to.eq(1);
      expect(car.carModelId).to.eq(1);
      expect(car.initialMileage).to.eq(500);
      expect(car.mileage).to.eq(500);

      const carId = car.id;
       const carCreatedDate = car.carCreatedAt.slice(0, 10);

   
      cy.api({
        method: 'POST',
        url: '/api/expenses',
        body: {
          carId,
          reportedAt: carCreatedDate, 
          mileage: car.mileage + 100,
          liters: 11,
          totalCost: 11,
          forceMileage: false,
        },
      }).then((expResp) => {
        expect(expResp.status).to.eq(200);        
        expect(expResp.body.status).to.eq('ok');

        const exp = expResp.body.data;

        expect(exp.carId).to.eq(carId);
        expect(exp.reportedAt.slice(0, 10)).to.eq(carCreatedDate);
        expect(exp.mileage).to.eq(600);
        expect(exp.liters).to.eq(11);
        expect(exp.totalCost).to.eq(11);
        
      });
    });
  });
});
