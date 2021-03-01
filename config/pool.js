require('dotenv').config();

const util = require('util');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.PG_DB,
  password: process.env.DB_PASS,
  port: process.env.PG_PORT,
});

// pool.query('SELECT NOW()', (err, res) => {
//   console.log("connected to PG")
//   pool.end()
// })

module.exports = pool;
