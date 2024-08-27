import * as financialService from '../services/financialService.js'

export const getAllStockInfo = async (req, res) => {
    try{
        const stocks = await financialService.getAllStockInfo();
        res.json(stocks);
    } catch(error){
        res.status(500).send(error.message)
    }
};

export const getStockNames = async (req, res) => {
    try{
        const stockNames = await financialService.getStockNames();
        res.json(stockNames);
    } catch(error){
        res.status(500).send(error.message)
    }
};
