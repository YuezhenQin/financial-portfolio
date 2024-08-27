import yfinance as yahooFinance
import pandas as pd
import datetime
import random
from sqlalchemy import create_engine

hostname="localhost"
dbname="finance_db"
uname="root"
pwd="c0nygre"

# get raw data
startDate = datetime.datetime(2024, 6, 28)
endDate = datetime.datetime(2024, 8, 26)
GetFacebookInformation = yahooFinance.Ticker("AXP")
stock_price = GetFacebookInformation.history(start=startDate, 
                                     end=endDate)

# Calcultaions
random.seed(8080)
currentPrice = []
dailyChange = []
for i in range(1, len(stock_price)):
    currentPrice.append(float("{:.2f}" .format(random.uniform(stock_price.iloc[i,1], stock_price.iloc[i,2]))))
    
for i in range(0, len(currentPrice)):
    dailyChange.append(float("{:.2f}".format(currentPrice[i]-stock_price.iloc[i,3])))
    
percentChange = []
for i in range(0, len(currentPrice)):
    percentChange.append(float("{:.2f}".format(dailyChange[i]/stock_price.iloc[i,3]*100)))

#Get high, low, open, close price lists
highPrice = stock_price["High"][1:].round(2).values.tolist()
lowPrice = stock_price["Low"][1:].round(2).values.tolist()
openPrice = stock_price["Open"][1:].round(2).values.tolist()
closePrice = stock_price["Close"][1:].round(2).values.tolist()

ind = stock_price.index

infoDate = []
for i in range(1,len(ind)):
    time = ind[i].date()
    infoDate.append(time.year*10000+time.month*100+time.day)

stockName = ["AXP"]*len(infoDate)
dict = {"stockName": stockName, "currentPrice": currentPrice,
       "dailyChange": dailyChange, "percentChange": percentChange,
       "highPrice": highPrice, "lowPrice": lowPrice,
       "openPrice": openPrice, "closePrice": closePrice,
       "infoDate": infoDate}
df = pd.DataFrame(dict)

engine = create_engine("mysql+pymysql://{user}:{pw}@{host}/{db}"
				.format(host=hostname, db=dbname, user=uname, pw=pwd))
df.to_sql('stockinfo', engine, index=False, if_exists = "append")
