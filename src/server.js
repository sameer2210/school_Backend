import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { pool } from './db.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

(async function start() {
  try {
    await pool.query('SELECT 1');
    app.listen(PORT, () => console.log(` Server listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
  }
})();
