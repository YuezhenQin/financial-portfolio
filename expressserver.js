import express from 'express'
import bodyParser from 'body-parser'
import mysql from 'mysql2/promise'

const app = express();
app.use(bodyParser.json());

//open listening port
app.listen(8081, () => {
    console.log("Server is running")
})

//connect with MySQL, you should run the SQL Script first
 const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "c0nygre",
    database: "finance_db"
})

//Test conncetion between Mysql & JS-backend 
app.get("/stockInfo", async (req, res) => {
    try {
        const [raws] = await connection.query("SELECT * FROM stockInfo")
        res.json(raws)
    } catch (error) {
        res.status(500).send(error.message)
    }

})