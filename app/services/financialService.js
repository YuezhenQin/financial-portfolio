import connection from '../config/db.js';

const getAllStockInfo = async () => {
    const[rows] = await connection.query('SELECT * FROM stockinfo');
    return rows;
};

const getStockNames = async () => {
    const[rows] = await connection.query('SELECT stockName FROM stockinfo');
    return rows;
};

// const getStartDatePriceByName = async() => {
//     const[rows] = await connnection.query();
    
// }

export {getAllStockInfo, getStockNames}