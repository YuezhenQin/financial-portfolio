import express from 'express';
import * as financialController from '../controllers/financialController.js';

const router = express.Router();

router.get('/', financialController.getAllStockInfo);
router.get('/stockList', financialController.getStockNames);
router.get('/stockName', financialController.getStartDatePriceByName);
router.get('/stockHistory', financialController.getHistoryPriceByName);
router.get('/stock', financialController.getStockPriceByNameAndDate);
router.get('/userStock', financialController.getUserStockByUserName);
router.put('/userStock', financialController.updateUserStockSharesByName);
router.post('/userStock', financialController.insertUserStock);
router.get('/userStockGain', financialController.getStocksByUser);
router.get('/userGain', financialController.getUserTotalGain);




export default router;