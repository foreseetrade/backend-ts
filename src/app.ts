
import express from 'express';
import { json } from 'body-parser';
import testRoutes from './routes/testRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(json());

app.use('/api', testRoutes);
app.use('/user', userRoutes);

export default app;
