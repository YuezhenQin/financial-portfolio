import connection from '../config/db.js';

export const getAllStockInfo = async () => {
    const[rows] = await connection.query('SELECT * FROM stockinfo');
    return rows;
};

export const getStockNames = async () => {
    const[rows] = await connection.query('SELECT stockName FROM stockinfo GROUP BY stockname;');
    const res = rows.map((rows) => {
        return rows['stockName'];
    })
    const res1 = {'stockList': res};
    return res1;
};

export const getStartDatePriceByName = async (stockName) => {
    const[rows] = await connection.query('SELECT purchasePrice FROM userstock WHERE stockName = ?;', [stockName]);
    return rows[0];
};

export const getHistoryPriceByName = async (stockName) => {
    const [rows] = await connection.query('SELECT * FROM stockInfo WHERE stockName = ?;', [stockName]);
    return rows;
};

export const getStockPriceByNameAndDate = async (stockName, startDate, endDate) => {
    const[rows] = await connection.query(
        'SELECT DISTINCT stockName, ' +
        'MIN(CASE WHEN infoDate = ? THEN ROUND(closePrice, 2) END) AS startDate, ' +
        'MIN(CASE WHEN infoDate = ? THEN ROUND(closePrice, 2) END) AS endDate ' +
        'FROM stockinfo ' + 
        'WHERE stockName = ? ' +
        'GROUP BY stockName;',
        [startDate, endDate, stockName]);
        return rows[0];
};

export const getUserStockByUserName = async (userName) => {
    const[rows] = await connection.query(
        'SELECT * FROM userStock ' +
        'WHERE userName = ?;', 
        [userName]
    );
    return rows;
};

export const updateUserStockSharesByName = async (stockName, userName, shares) => {
    const[result] = await connection.query(
        'UPDATE userstock ' +
        'SET shares = shares + (?) ' +
        'WHERE stockName = ? AND userName = ?;',
        [shares, stockName, userName]
    );
    return result.affectedRows > 0 ? {shares} : null;
};

export const insertUserStock = async (userStockData) => {
    const {stockName, userName, shares, purchasePrice} = userStockData;
    const[result] = await connection.query(
        'INSERT INTO userStock (stockName, userName, shares, purchasePrice, purchaseDate) ' +
        'VALUES (?, ?, ?, ?, CURDATE());', 
        [stockName, userName, shares, purchasePrice]
    );
    return {id: result.insertId, ...userStockData, purchaseDate: new Date().toISOString().slice(0, 10), status: 1}
};

export const getStocksByUser = async (userName) => {
    const [rows] = await connection.query(
        'select '+
        'userstock.userName, '+
        'userstock.stockName, '+
        'userstock.shares, '+
        'stockinfo.currentPrice, '+
        'truncate(((stockinfo.currentPrice - userstock.purchaseprice)/userstock.purchaseprice)*100,4) as percentChange, '+
        'truncate((stockinfo.currentPrice * userstock.shares),4) as value, '+
        'userstock.purchasedate '+
        'from  userStock '+
        'join  stockInfo on userStock.purchaseDate = stockInfo.infoDate and userstock.stockName = stockinfo.stockName ' +
        'where userName = ?;', [userName]);
    return rows;
};


export const getUserPurchaseValue = async (userName) => {
    const [rows] = await connection.query('SELECT stockName, userName, purchasePrice, shares, truncate(shares*purchasePrice,2) as puechaseValue FROM finance_db.userstock where curStatus= 1 and userName = ? ', [userName]);
    return rows;
};