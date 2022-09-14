import { Router } from 'express';
import carRoute from './car.routes';

const route = Router();
route.use(carRoute);

export default route;