import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createHealthRoutes } from "./modules/health/routes/healthRoutes";

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use('/realtime', createHealthRoutes())

export default app;
