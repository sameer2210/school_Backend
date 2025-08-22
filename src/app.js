import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import schoolRoutes from './routes/school.routes.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 60_000, max: 120 }));

app.get('/', (req, res) => res.json({ success: true, message: 'API is running' }));
app.use('/', schoolRoutes);

export default app;
