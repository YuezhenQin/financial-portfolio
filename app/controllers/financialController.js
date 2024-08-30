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

export const getStartDatePriceByName = async (req, res) => {
    try{
        const startDatePrice = await financialService.getStartDatePriceByName(req.query.stockName, req.query.userName);
        if(startDatePrice){
            res.json(startDatePrice);
        } else{
            res.status(404).send('Stock not found');
        }
    } catch(error){
        res.status(500).send(error.message);
    }
};


export const getHistoryPriceByName = async (req, res) => {
    try{
        const historyPrice = await financialService.getHistoryPriceByName(req.query.stockName);
        if(historyPrice){
            res.json(historyPrice);
        } else{
            res.status(404).send('Stock not found');
        }
    } catch(error){
        res.status(500).send(error.message);
    }
};

export const getStockPriceByNameAndDate = async (req, res) => {
    try{
        console.log(req.params.stockName, req.params.startDate, req.params.endDate);
        const stockStartEndPrice = await financialService.getStockPriceByNameAndDate(req.query.stockName, req.query.startDate, req.query.endDate);
        if(stockStartEndPrice){
            res.json(stockStartEndPrice);
        } else{
            res.status(404).send('Stock not found');
        }
    } catch(error){
        res.status(500).send(error.message);
    }
};

export const getUserStockByUserName = async (req, res) => {
    try{
        const userStock = await financialService.getUserStockByUserName(req.query.userName);
        if(userStock){
            res.json(userStock);
        } else{
            res.status(404).send('Stock not found');
        }
    } catch(error){
        res.status(500).send(error.message);
    }  
};

export const updateUserStockSharesByName = async (req, res) => {
    try{
        const updateSharesRes = await financialService.updateUserStockSharesByName(req.query.stockName, req.query.userName, req.query.shares);
        if(updateSharesRes){
            res.status(201).send('Shares updated Successfully')
        } else{
            res.status(404).send('Stock not found or user not found. Please check your input!');
        }
    } catch(error){
        res.status(500).send(error.message);
    }
};

export const insertUserStock = async (req, res) => {
    try{
        const userStock = await financialService.insertUserStock(req.body);
        res.status(201).json(userStock);
    } catch(error){
        res.status(500).send(error.message);
    }  
};



export const getStocksByUser = async (req, res) => {
    try{
        const userStockList = await financialService.getStocksByUser(req.query.userName);
        if(userStockList){
            res.json(userStockList);
        } else{
            res.status(404).send('User not found');
        }
    } catch(error){
        res.status(500).send(error.message);
    }  
};



export const getUserTotalGain = async (req, res) => {
    try{
        let gain=0;
        const userStockList = await financialService.getStocksByUser(req.query.userName);
        // console.log(userStockList)
        for(let i =0; i<userStockList.length;i++){
            gain += userStockList[i].value
            // console.log('value of gain: '+i)
            // console.log(gain)
        }
        const purchaseList = await financialService.getUserPurchaseValue(req.query.userName);
        let purchaseValue =0;
        console.log(purchaseList)
        for(let j =0; j<purchaseList.length; j++){
            purchaseValue +=  purchaseList[j].purchaseValue 
            console.log('value of purchaseValue: '+j)
            console.log(purchaseValue)
        }
        let totalGain ={
            userName: req.query.userName,
            totalGain: (gain-purchaseValue).toFixed(2)
        } 
       res.json(totalGain);

    } catch(error){
        res.status(500).send(error.message);
    }  
};


export const getUserTotalValue = async (req, res) => {
    try{
        let gain=0;
        const userStockList = await financialService.getStocksByUser(req.query.userName);
        //console.log(userStockList)
        for(let i =0; i<userStockList.length;i++){
            gain += userStockList[i].value
            // console.log('value of gain: '+i)
            // console.log(gain)
        }
        let totalValue ={
            userName: req.query.userName,
            totalValue: gain.toFixed(2)
        } 
       res.json(totalValue);

    } catch(error){
        res.status(500).send(error.message);
    }  
};