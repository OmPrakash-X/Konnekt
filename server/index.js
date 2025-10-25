import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ConnectDB } from "./config/db.js";

// Routes
import AuthRouter from "./routes/authRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

// Global Error Middleware


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", AuthRouter);



// Server 
const port = process.env.PORT || 5000;
app.listen(port, () => {
  ConnectDB();
  console.log(`🚀 Server running on http://localhost:${port}`);
});

// Error Handler
app.use(errorMiddleware);
