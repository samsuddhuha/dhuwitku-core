const env = require('./env.js');
const Pool = require('pg').Pool

const pool = new Pool({
  user: env.username,
  host: env.host,
  password: env.password,
  database: env.database,
  port: env.port,
  ssl: {
    rejectUnauthorized: false
  }
})

module.exports = {
  pool,
}