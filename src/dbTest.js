import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function testDB() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('DB Connected:', rows);
  } catch (err) {
    console.error('DB Connection Error:', err);
  }
}

testDB();
