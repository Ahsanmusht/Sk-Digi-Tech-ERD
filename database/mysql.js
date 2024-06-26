const mysql = require('mysql');

module.exports = class Mysql {
  static connect() {
    // Create a connection pool
    const pool = mysql.createPool({
      connectionLimit: 10, // Adjust the connection limit as needed
      host: '209.182.202.254',
      port: 3306,
      user: 'skahme5_skuser',
      password: 'skdigitech123321@',
      database: 'skahme5_skdigitech',
    });

    // Handle connection pool errors
    pool.on('error', (err) => {
      console.error('MySQL connection pool error:', err);
      // You can attempt to re-establish the connection pool here if needed
    });

    console.log('Mysql Connected');

    return pool;
  }
};
