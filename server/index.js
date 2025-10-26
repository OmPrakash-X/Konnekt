import express from "express";
import 'dotenv/config';  
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

console.log("=== Environment Check ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
console.log("JWT_SECRET length:", process.env.JWT_SECRET?.length);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL || "http://localhost:5173");
console.log("========================");

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
);

// ✅ Add request logger for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ===== Health Check Route =====
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Konnekt API is running!",
    timestamp: new Date().toISOString(),
    routes: [
      "/api/v1/auth",
      "/api/v1/users", 
      "/api/v1/admin",
      "/api/v1/skills",
      "/api/v1/badges",
      "/api/v1/sessions",
      "/api/v1/reviews",
      "/api/v1/transactions"
    ]
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

// ✅ 404 Handler - Must be BEFORE error middleware
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
    availableRoutes: [
      "/api/v1/auth",
      "/api/v1/users",
      "/api/v1/admin",
      "/api/v1/skills",
      "/api/v1/badges",
      "/api/v1/sessions",
      "/api/v1/reviews",
      "/api/v1/transactions"
    ]
  });
});

// ✅ Error Middleware - Must be LAST
app.use(errorMiddleware);

// ===== Server Startup =====
const port = process.env.PORT || 5000;

app.listen(port, () => {
  ConnectDB();
  console.log("\n=========================");
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log("=========================");
  console.log("📋 Available Routes:");
  console.log("  - POST   /api/v1/auth/signup");
  console.log("  - POST   /api/v1/auth/login");
  console.log("  - GET    /api/v1/users/nearby");
  console.log("  - POST   /api/v1/sessions/book");
  console.log("  - GET    /api/v1/sessions/available");
  console.log("  - GET    /api/v1/sessions/my-sessions");
  console.log("=========================\n");
});
