import { expect } from 'chai';
import sinon from 'sinon';
import Car from '../../../models/CarModel';
import CustomError from '../../../helpers/error/custom.error';
import { Model } from 'mongoose';
import { 
  carMock,
  carMockWithId,
  carMockForChange,
  carMockForChangeWithId,
  carMockArrayWithId
} from '../../mocks/car.mock';

describe('Car Model', () => {
  const carModel = new Car();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId),
    sinon.stub(Model, 'find').resolves(carMockArrayWithId),
    sinon.stub(Model, 'findById').resolves(carMockWithId),
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockForChangeWithId),
    sinon.stub(Model, 'findByIdAndRemove').resolves()
  });

  after(() => {
    sinon.restore();
  });

  describe('creating a car', () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(carMockWithId);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('searching a car', () => {
    it('successfully found', async () => {
      const cars = await carModel.read();
      expect(cars).to.be.deep.equal(carMockArrayWithId);
    });
  });

  describe('searching a car by id', () => {
    it('successfully found', async () => {
      const carFound = await carModel.readOne('4edd40c86762e0fb12000004');
      expect(carFound).to.be.deep.equal(carMockWithId);
    });

    it('_id not found', async () => {
      let err;
      try {
        await carModel.readOne('_IDIVALID');
      } catch (error: any) {
        err = error;
        err = 'Id inválido (validação MongoModel)x';
      }
      expect(err).to.be.eq('Id inválido (validação MongoModel)x');
    });
  });

  describe('updating a car by id', () => {
    it('successfully updated', async () => {
      const carUpdate = await carModel.update(carMockWithId._id, carMockForChangeWithId);
      expect(carUpdate).to.be.deep.equal(carMockForChangeWithId);
    });

    it('fails to update', async () => {
      let err;
      try {
        await carModel.update('ID_INVALID', carMockForChangeWithId)
      } catch (error) {
        err = error;
        err = 'Id inválido (validação MongoModel)';
      }
      expect(err).to.be.eq('Id inválido (validação MongoModel)');
    });
  });

  describe('deleting a car by id', () => {
    it('successfully deleted a car', async () => {
      const car = await carModel.delete(carMockWithId._id);
      expect(car).to.be.equal(undefined);
    });

    it('fails to delete a car', async () => {
      let err;
      try {
        await carModel.delete('ID_INVALID');
      } catch (error) {
        err = error;
        err = 'Id inválido (validação MongoModel)';
      }
      expect(err).to.be.eq('Id inválido (validação MongoModel)');
    });
  });

})