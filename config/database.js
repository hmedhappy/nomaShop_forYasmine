require('dotenv').config();

const pool = require('./pool');
const util = require('util');
const { readFileSync } = require('fs');
const init_SQL_Database = readFileSync('config/nomaShopSchema.sql').toString();

/**
 * Create users Table
 */
/* const createUserTable = () => {
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  code VARCHAR(100) UNIQUE NOT NULL, 
  username VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  image VARCHAR(100),
  created_at DATE NOT NULL)`;

  pool
    .query(userCreateQuery)
    .then((res) => {
      console.log("Table created");
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}; */

const initDatabase = () => {
  pool
    .query(init_SQL_Database)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
  initDatabase();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = { createAllTables };

require('make-runnable');
