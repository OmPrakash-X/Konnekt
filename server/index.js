import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ConnectDB } from "./config/db.js";

// Routes Import
import AuthRouter from "./routes/authRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import AdminRouter from "./routes/adminRoutes.js";
import SkillRouter from "./routes/skillRoutes.js";
import BadgeRouter from "./routes/badgeRoutes.js";
import SessionRouter from "./routes/sessionRoutes.js";
import ReviewRouter from "./routes/reviewRoutes.js";
import TransactionRouter from "./routes/transactionRoutes.js";

// Middleware Import
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

// Load Environment Variables
dotenv.config();

const app = express();

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ===== Health Check Route =====
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Konnekt API is running!",
    timestamp: new Date().toISOString(),
  });
});

// ===== API Routes =====
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/admin", AdminRouter);
app.use("/api/v1/skills", SkillRouter);
app.use("/api/v1/badges", BadgeRouter);
app.use("/api/v1/sessions", SessionRouter);
app.use("/api/v1/reviews", ReviewRouter);
app.use("/api/v1/transactions", TransactionRouter);

// ===== Server Startup =====
const port = process.env.PORT || 5000;

app.listen(port, () => {
  ConnectDB();
  console.log(`🚀 Server is running on port ${port}`);
});

app.use(errorMiddleware);
