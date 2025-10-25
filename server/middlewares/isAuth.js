import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import ErrorHandler from "./errorMiddleware.js"; 
import { catchAsyncErrors } from "./catchAsyncErrors.js";

// Check if user is authenticated
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  console.log("=== AUTH MIDDLEWARE ===");
  console.log("🍪 Cookies:", req.cookies);
  console.log("🎫 Token exists:", !!token);

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔓 Decoded token:", decoded);
    
    // FIX: Use decoded.userId instead of decoded.id
    req.user = await User.findById(decoded.userId); // ✅ Fixed!

    if (!req.user) {
      console.log("❌ User not found in database");
      return next(new ErrorHandler("User not found", 404));
    }

    console.log("✅ User authenticated:", req.user.email);

    if (req.user.accountStatus !== "active") {
      return next(new ErrorHandler("Account is suspended or deactivated", 403));
    }

    next();
  } catch (error) {
    console.error("❌ JWT verification error:", error.message);
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});

// Authorize specific roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

// Check if user is expert or admin
export const isExpertOrAdmin = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "expert") {
    return next();
  }
  return next(
    new ErrorHandler("Only experts and admins can access this resource", 403)
  );
});
