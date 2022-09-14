import 'express-async-errors';
import express from 'express';
import globalError from './helpers/error/global.error';
import route from './routes/index.routes';

const app = express();
app.use(express.json());
app.use(route);

app.use(globalError);

export default app;
