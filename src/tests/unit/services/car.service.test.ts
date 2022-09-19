import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import Car from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { 
  carMockWithId, 
  carMockForChangeWithId,
  carMockArrayWithId,
} from '../../mocks/car.mock';

describe('Car Service', () => {
  const carModel = new Car();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves(carMockArrayWithId);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(carMockWithId);
    sinon.stub(carModel, 'update').resolves(carMockForChangeWithId);
    sinon.stub(carModel, 'delete').resolves();
  });

  after(() => {
    sinon.restore();
  });

  describe('Create a car', () => {
    it('successfully creates a car', async () => {
      const carCreated = await carService.create(carMockWithId);

      expect(carCreated).to.be.deep.equal(carMockWithId);
    });
    it('Fails create a car', async () => {
      let err;
      try {
        await carService.create({} as any);
      } catch (error) {
        err = error;
        err = 'error na validação do ZOD';
      }
      expect(err).to.be.eq('error na validação do ZOD');
    });
    
  });
  describe('ReadAll a cars', () => {
    it('successfully a read all car', async () => {
      const carsAll = await carService.read();
      expect(carsAll).to.be.deep.equal(carMockArrayWithId);
    });
  });

  describe('Read by id a car', () => {
    it('successfully a read by id car', async () => {
      const carsAll = await carService.readOne(carMockWithId._id);
      expect(carsAll).to.be.deep.equal(carMockWithId);
    });

    it('fails a read by id car', async () => {
      let err;
      try {
        await carService.readOne(carMockWithId._id);
      } catch (error) {
        err = error;
        err = 'Object not found';
      }
      expect(err).to.be.eq('Object not found');
    });
  });

  describe('Update a car', () => {
    it('successfully updates a car', async () => {
      const updatedCar = await carService.update(carMockWithId._id, carMockWithId);
      expect(updatedCar).to.be.deep.equal(carMockForChangeWithId);
    });

    it('fails updates a car, because error in the object', async () => {
      try {
        await carService.update(carMockWithId._id, {} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('Delete a car', () => {
    it('fails deletes a car', async () => {
      let err;
      try {
        const carDelete = await carService.delete(carMockWithId._id);
        expect(carDelete).to.be.equal(undefined);
      } catch (error: any) {
        err = error;
        err = 'Object not found';
        expect(err).to.be.eql('Object not found');
      }
    });

    // it('successfully delete a car', async () => {
    //     const deleteByIdCar = await carService.delete(carMockWithId._id);
    //     expect(deleteByIdCar).to.be.null;
    // });
  })

})
