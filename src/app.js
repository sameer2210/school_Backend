import cors from 'cors';                                  //allow request from other domains
import express from 'express';
import helmet from 'helmet';                              //Adds security headers
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import schoolRoutes from './routes/school.routes.js';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 60_000, max: 120 }));           //request - limit max 120/min to protect from brute force

app.get('/', (req, res) => res.json({ success: true, message: 'API is running' }));
app.use('/', schoolRoutes);

export default app;
