import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import schoolRoutes from "./routes/school.routes.js";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120 // limit each IP to 120 requests per minute
});
app.use(limiter);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});


// Routes
app.use("/", schoolRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

export default app;
