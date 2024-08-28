import express from 'express';
import cors from 'cors';
import financialRoutes from './app/routes/financialRoute.js';
import cryptoRoutes from './app/routes/cryptocoinRoute.js'

const app = express();
app.use(cors());
app.use(express.json())
app.use('/oneInvest', financialRoutes);
app.use('/crypto', cryptoRoutes);

export default app;