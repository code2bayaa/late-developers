import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.DB_HOST,       // e.g., localhost
  user: process.env.DB_USER,       // e.g., root
  password: process.env.DB_PASS,   // your password
  database: process.env.DB_NAME,   // your database name
});

export default db;