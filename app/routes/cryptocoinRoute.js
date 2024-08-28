import express from 'express';
import * as cryptocoinController from '../controllers/cryptocoinController.js';

const router = express.Router();

router.get('/', cryptocoinController.getCryptocoinInfo);
router.get('/cryptoName', cryptocoinController.getPriceByName);
export default router;