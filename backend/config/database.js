const mysql2 = require("mysql2");
const { promisify } = require("util");

// Create connection options
const database = {
  host: `${process.env.MYSQL_HOST}`,
  user: `${process.env.MYSQL_USERNAME}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  database: `${process.env.MYSQL_DATABASE}`,
};

const pool = mysql2.createPool(database);

// Get MySQL connection
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST")
      console.error("DATABASE CONNECTION WAS CLOSED");

    if (err.code === "ER_CON_COUNT_ERROR")
      console.error("DATABASE HAS TO MANY CONNECTIONS");

    if (err.code === "ECONNREFUSED")
      console.error("DATABASE CONNECTION WAS REFUSED");
  }

  if (connection) connection.release();
  console.log("MySQL is connected!");
  return;
});

// Promisify Pool Queries
pool.query = promisify(pool.query);

module.exports = pool;
