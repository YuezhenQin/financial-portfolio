import { response } from 'express';
import connection from '../config/db.js';

const getCryptocoinInfo = async () => {
    const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';
    let queryResult = {} ;
    await fetch(url)
        .then(response=>response.json())
        .then(data=>{
            queryResult = data;
        })
        .catch(error=>console.log(error))
    //console.log('returndata:::'+queryResult)
     return queryResult;

};



const getPriceByName = async (cryptoName) => {
const url = 'https://api.binance.com/api/v3/ticker/price?symbol='+cryptoName;
console.log(url)
    let queryResult = {} ;
    await fetch(url)
        .then(response=>response.json())
        .then(data=>{
            queryResult = data;
        })
        .catch(error=>console.log(error))
    //console.log('returndata:::'+queryResult)
     return queryResult;
}


export {getCryptocoinInfo,getPriceByName}