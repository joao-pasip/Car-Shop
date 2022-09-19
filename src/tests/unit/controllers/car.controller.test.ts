import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import { carMockWithId, carMockArrayWithId, carMockForChangeWithId } from '../../mocks/car.mock';
import Car from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';

describe('Car Controller', () => {
  const carModel = new Car();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMockWithId);
    sinon.stub(carService, 'read').resolves(carMockArrayWithId);
    sinon.stub(carService, 'readOne').resolves(carMockWithId);
    sinon.stub(carService, 'update').resolves(carMockForChangeWithId);
    sinon.stub(carService, 'delete').resolves();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  describe('Create Car', () => {
    it('successfully created a car', async () => {
      req.body = carMockWithId;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('ReadAll a car', () => {
    it('successfully reads all car', async () => {
      req.body = carMockArrayWithId;
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockArrayWithId)).to.be.true;
    });
  });

  describe('ReadOne by Id car', () => {
    it('successfully read by id car', async () => {
      req.params = { id: carMockWithId._id };
      req.body = carMockWithId;
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('Update by Id car', () => {
    it('successfully update by id car', async () => {
      req.params = { id: carMockWithId._id };
      req.body = carMockForChangeWithId;
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockForChangeWithId)).to.be.true;
    });
  });

  describe('Delete by Id car', () => {
    it('successfully delete by id car', async () => {
      req.params = { id: carMockWithId._id };
      // req.body = carMockWithId;
      await carController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.true;
    });
  });

});