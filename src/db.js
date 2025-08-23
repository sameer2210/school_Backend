import mysql from 'mysql2/promise';             //work with MySQL using modern async/await instead of callback hell.
import dotenv from 'dotenv';
dotenv.config();


//single connection handle one request at a time and  Pooling improves performance by reusing a fixed number of DB connections

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});



// Test the connection at startup (optional, but recommended with this)
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("Database connected successfully");
    conn.release();
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
})();

// Keep connection alive with periodic pings
setInterval(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Keep-alive ping success");
  } catch (err) {
    console.error("Keep-alive ping failed:", err.message);
  }
}, 1000 * 60 * 5); // every 5 min