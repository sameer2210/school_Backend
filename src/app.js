import cors from 'cors'; //allow request from other domains
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet'; //Adds security headers
import morgan from 'morgan';
import schoolRoutes from './routes/school.routes.js';
dotenv.config();

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:3000',
  'https://school-frontend-ashy.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not alllow by cors'));
      }
    },
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 60_000, max: 120 })); //request - limit max 120/min to protect from brute force

app.get('/', (req, res) => res.json({ success: true, message: 'API is running' }));
app.use('/', schoolRoutes);

export default app;
