import express from 'express';
import * as financialController from '../controllers/financialController.js';

const router = express.Router();

router.get('/', financialController.getAllStockInfo);
router.get('/stockNames', financialController.getStockNames);
router.get('/:stockName', financialController.getStartDatePriceByName);
// startDatePriceByStockName/

export default router;