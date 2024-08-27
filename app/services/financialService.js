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

const getStockPriceByNameAndDate = async (stockName, startDate, endDate) => {
    const[rows] = await connection.query(
        'SELECT stockName, (SELECT closePrice FROM stockinfo WHERE stockName = ? AND infoDate = ?) startDatePrice, ' +
        '(SELECT closePrice FROM stockinfo WHERE stockName = ? AND infoDate = ?) endDatePrice ' +
        'FROM stockinfo ' +
        'WHERE stockName = ?;',
        [stockName, startDate, stockName, endDate, stockName]);
        return rows[0];
}

export {getAllStockInfo, getStockNames, getStartDatePriceByName, getStockPriceByNameAndDate}