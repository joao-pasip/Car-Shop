import { Router } from 'express';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';
import MotorcycleController from '../controllers/MotorcycleController';

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

const motorcyclesRoute = Router();

const MOTORCYCLE_URL_ID = '/motorcycles/:id';

motorcyclesRoute.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
motorcyclesRoute.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
motorcyclesRoute.get(MOTORCYCLE_URL_ID, (req, res) => motorcycleController.readOne(req, res));
motorcyclesRoute.put(MOTORCYCLE_URL_ID, (req, res) => motorcycleController.update(req, res));
motorcyclesRoute.delete(MOTORCYCLE_URL_ID, (req, res) => motorcycleController.delete(req, res));

export default motorcyclesRoute;