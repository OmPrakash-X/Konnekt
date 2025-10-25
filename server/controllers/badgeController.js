import Badge from "../models/badgeModel.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

// ===== CREATE BADGE (ADMIN) =====
export const createBadge = catchAsyncErrors(async (req, res, next) => {
  const badge = await Badge.create(req.body);

  res.status(201).json({
    success: true,
    message: "Badge created successfully",
    badge,
  });
});

// ===== GET ALL BADGES =====
export const getAllBadges = catchAsyncErrors(async (req, res, next) => {
  const badges = await Badge.find({ isActive: true }).sort({ rarity: 1 });

  res.status(200).json({
    success: true,
    count: badges.length,
    badges,
  });
});

// ===== GET BADGE BY ID =====
export const getBadgeById = catchAsyncErrors(async (req, res, next) => {
  const badge = await Badge.findById(req.params.id);

  if (!badge) {
    return next(new ErrorHandler("Badge not found", 404));
  }

  res.status(200).json({
    success: true,
    badge,
  });
});

// ===== UPDATE BADGE (ADMIN) =====
export const updateBadge = catchAsyncErrors(async (req, res, next) => {
  let badge = await Badge.findById(req.params.id);

  if (!badge) {
    return next(new ErrorHandler("Badge not found", 404));
  }

  badge = await Badge.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Badge updated successfully",
    badge,
  });
});

// ===== DELETE BADGE (ADMIN) =====
export const deleteBadge = catchAsyncErrors(async (req, res, next) => {
  const badge = await Badge.findById(req.params.id);

  if (!badge) {
    return next(new ErrorHandler("Badge not found", 404));
  }

  await badge.deleteOne();

  res.status(200).json({
    success: true,
    message: "Badge deleted successfully",
  });
});

// ===== GET BADGES BY CATEGORY =====
export const getBadgesByCategory = catchAsyncErrors(async (req, res, next) => {
  const { category } = req.params;

  const badges = await Badge.find({ category, isActive: true });

  res.status(200).json({
    success: true,
    count: badges.length,
    badges,
  });
});
