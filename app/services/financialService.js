import connection from '../config/db.js';

const getAllStockInfo = async () => {
    const[rows] = await connection.query('SELECT * FROM stockinfo');
    return rows;
};

export {getAllStockInfo}