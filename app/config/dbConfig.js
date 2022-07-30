const env = require('./env.js');
 
import { Pool } from 'pg'

export const pool = new Pool({
  user: env.username,
  host: env.host,
  password: env.password,
  database: env.database,
  port: env.port
})