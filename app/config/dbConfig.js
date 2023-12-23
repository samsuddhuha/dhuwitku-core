const env = require('./env.js');
const mySql = require('mysql');
const Pool = require('pg').Pool

const pool = mySql.createConnection({
  host: env.host,
  user: env.username,
  password: env.password,
  database: env.database,
})

// const pool = new Pool({
//   user: env.username,
//   host: env.host,
//   password: env.password,
//   database: env.database,
//   port: env.port,
//   ssl: {
//     rejectUnauthorized: false
//   }
// })

module.exports = {
  pool,
}