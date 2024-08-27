import connection from '../config/db.js';

const getAllStockInfo = async () => {
    const[rows] = await connection.query('SELECT * FROM stockinfo');
    return rows;
};

const getStockNames = async () => {
    const[rows] = await connection.query('SELECT stockName FROM stockinfo');
    return rows;
};

const getStartDatePriceByName = async (stockName) => {
    const[rows] = await connection.query('SELECT purchasePrice FROM userstock WHERE stockName = ?;', [stockName]);
    return rows[0];
}

export {getAllStockInfo, getStockNames, getStartDatePriceByName}