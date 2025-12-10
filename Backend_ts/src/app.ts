import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
