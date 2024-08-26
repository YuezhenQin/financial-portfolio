import express from 'express';
import * as financialController from '../controllers/financialController.js';

const router = express.Router();

router.get('/', financialController.getAllStockInfo);

export default router;