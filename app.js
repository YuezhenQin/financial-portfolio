import express from 'express';
import cors from 'cors';
import financialRoutes from './app/routes/financialRoute.js';

const app = express();
app.use(cors());
app.use(express.json())
app.use('/oneInvest', financialRoutes);

export default app;