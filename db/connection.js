import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();  // Load .env file

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: process.env.DB_USER,
    // Your MySQL password
    password: process.env.DB_PW,
    database: process.env.NAME,
    rowsAsArray: true
  },
  console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

export default db;