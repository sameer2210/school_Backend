import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { pool } from './db.js';

// Use the port provided by Render (or 3000 locally)
// const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

(async function start() {
  try {
    // Check DB connection
    await pool.query('SELECT 1');
    console.log('Database connected successfully');

    // Start Express server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
  }
})();
