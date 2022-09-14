import express from 'express';
import 'express-async-errors';
import globalError from './helpers/error/global.error';

const app = express();
app.use(globalError);

export default app;
