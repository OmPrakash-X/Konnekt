import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import ErrorHandler from "./errorMiddleware.js"; 
import { catchAsyncErrors } from "./catchAsyncErrors.js";

// Check if user is authenticated
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  if (!req.user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (req.user.accountStatus !== "active") {
    return next(new ErrorHandler("Account is suspended or deactivated", 403));
  }

  next();
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
