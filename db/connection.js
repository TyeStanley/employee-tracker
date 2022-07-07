const mysql = require('mysql2');
const dotenv = require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: process.env.DB_USER,
    // Your MySQL password
    password: process.env.DB_PW,
    database: process.env.NAME
  },
  console.log('Connected to the employee_tracker database.')
);

module.exports = db;