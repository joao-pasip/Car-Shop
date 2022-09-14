import { Router, Request, Response } from 'express';
import CarController from '../controllers/CarController';
import Car from '../models/CarModel';
import CarService from '../services/CarService';

const carRoute = Router();

const car = new Car();
const carService = new CarService(car);
const carController = new CarController(carService);

carRoute.post('/cars', (req: Request, res: Response) => carController.create(req, res));
carRoute.get('/cars', (req: Request, res: Response) => carController.read(req, res));
carRoute.get('/cars/:id', (req: Request, res: Response) => carController.readOne(req, res));
carRoute.put('/cars/:id', (req: Request, res: Response) => carController.update(req, res));
carRoute.delete('/cars/:id', (req: Request, res: Response) => carController.delete(req, res));

export default carRoute;