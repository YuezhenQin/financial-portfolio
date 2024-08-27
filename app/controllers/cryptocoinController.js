import * as cryptocoinService from '../services/cryptocoinService.js'

export const getCryptocoinInfo = async (req, res) => {
    try{
        const cryptos = await  cryptocoinService.getCryptocoinInfo();
        res.json(cryptos);

    } catch(error){
        res.status(500).send(error.message)
    }
};




export const getPriceByName = async (req, res) => {
    try{
        const price = await cryptocoinService.getPriceByName(req.query.cryptoName);
        // if(price){
        //     res.json(price);
        // } else{
        //     res.status(404).send('Crypto not found');
        // }
        res.json(price);
    } catch(error){
        res.status(500).send(error.message);
    }
};