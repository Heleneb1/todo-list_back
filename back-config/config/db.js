require('dotenv').config()
const mysql = require('mysql2/promise')
console.log(process.env.DB_PORT)
const database = mysql.createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

database
  .getConnection()
  .then(() => console.log('Can reach database, ready to query. Ok!'))
  .catch((err) => {
    console.error(err)
  })
module.exports = database
