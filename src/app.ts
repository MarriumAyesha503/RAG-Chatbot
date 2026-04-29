import express from "express";
import ragRoutes from "./routes/ragRoutes";
import { errorHandler } from "./middlewares/errorMiddleware";

const app = express();

app.use(express.json());

app.use("/api/rag", ragRoutes);

app.use(errorHandler);

export default app;


