
// SELECT TOP 1 row, PriceID, Country FROM prices
// WHERE Country='EG' AND row<10000
// ORDER BY row DESC

db.prices.find(
  {Country:'EG',
  row:{$lt:10000}},
  {row:1, PriceID:1, Country:1})
  .sort({row:-1})
  .limit(1)
  .pretty()