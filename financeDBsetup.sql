-- Create the database
CREATE DATABASE finance_db;

-- Use the created database
USE finance_db;


    
    
CREATE TABLE StockInfo(
    id INT AUTO_INCREMENT PRIMARY KEY,
    stockName VARCHAR(100) NOT NULL UNIQUE, 
	currentPrice FLOAT,
    dailyChange FLOAT,
    percentChange FLOAT,
    highPrice FLOAT,
    lowPrice FLOAT,
    openPrice FLOAT,
    closePrice FLOAT,
    infoDate Date
);
    



-- Create the 'User' table
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL unique,
    age INT,
    tradeAge INT,
    balance FLOAT
);
-- Insert sample data into the 'user-stock' table

CREATE TABLE userStock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stockName  VARCHAR(100) NOT NULL UNIQUE,
    userName VARCHAR(100) NOT NULL UNIQUE,
	shares FlOAT,
    purchasePrice FLOAT,
    purchaseDate DATE,
    curStatus INT DEFAULT 1,
    CONSTRAINT fk_stock_name FOREIGN KEY(stockName) REFERENCES StockInfo(stockName),
    CONSTRAINT fk_user_name FOREIGN KEY(userName) REFERENCES user(name)
);

-- INSERT INTO stockinfo 
INSERT INTO `finance_db`.`stockinfo` 
(`stockName`, `currentPrice`, `dailyChange`, `percentChange`, `highPrice`, `lowPrice`, `openPrice`, `closePrice`, `infoDate`)
VALUES 
('AAPL', '224.53', '-1.87', '-0.826', '228.34', '223.9', '227.6', '226.4', '20240826'),
('ABNB', '115.45', '-2.23', '-1.895', '118.395', '115.304', '117.68', '117.68', '20240826');

INSERT INTO `finance_db`.`user` 
(`name`, `age`, `tradeAge`, `balance`)
VALUES 
('David', '18', '3', '500000'),
('Jack', '18', '4', '500000'),
('Q', '18', '5', '500000'),
('ZiHui', '18', '6', '500000');

INSERT INTO `finance_db`.`userStock` 
(`stockName`, `userName`, `shares`, 'purchasePrice', 'purchaseDate','curStatus')
VALUES 
('AAPL', 'David', '3', '100', '2024-08-27','1'),
('ABNB', 'Jack', '10', '100', '2024-08-27','1');

-- allow update without where statement
SET SQL_SAFE_UPDATES = 0;

-- update purchase date to random date between 2024-7-1 and 2024-8-23
update userstock
set purchaseDate = CURRENT_DATE - INTERVAL FLOOR(RAND() * 54) DAY;

-- update purchase price to the closing price of the purchase date
UPDATE userstock
JOIN stockinfo ON userstock.purchaseDate = stockinfo.infoDate
SET userstock.purchasePrice = stockinfo.closePrice;

-- test
select purchasePrice from userstock;
select purchaseDate from userstock;


