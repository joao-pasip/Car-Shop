import { Router } from 'express';
import carRoute from './car.routes';
import motorcyclesRoute from './motorcycles.routes';

const route = Router();
route.use(carRoute);
route.use(motorcyclesRoute);

export default route;