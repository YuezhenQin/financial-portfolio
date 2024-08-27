import express from 'express'
import bodyParser from 'body-parser'
import mysql from 'mysql2/promise'
import financialRoutes from './app/routes/financialRoute.js'

const app = express();
app.use(bodyParser.json());

app.use('/oneInvest', financialRoutes);
app.listen(8081, () => {
    console.log(`Server is running on port 8081`);
});


