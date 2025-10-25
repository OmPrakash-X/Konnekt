import User from "../models/userModel.js";
import Badge from "../models/badgeModel.js";
import Skill from "../models/skillModel.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

// ===== GET ALL USERS (ADMIN) =====
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find()
    .select("-passwordHash -resetOtp -otpExpires")
    .populate("skills")
    .populate("badges")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

// ===== UPDATE USER ROLE =====
export const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  user.role = role;

  // If promoting to expert, set expert profile
  if (role === "expert") {
    user.expertProfile.isExpert = true;
    user.expertProfile.verifiedAt = Date.now();
    user.expertProfile.verifiedBy = req.user._id;
  }

  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    success: true,
    message: `User role updated to ${role}`,
    user,
  });
});

// ===== SUSPEND USER =====
export const suspendUser = catchAsyncErrors(async (req, res, next) => {
  const { reason } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  user.accountStatus = "suspended";
  user.suspensionReason = reason;
  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    success: true,
    message: "User suspended successfully",
  });
});

// ===== UNSUSPEND USER =====
export const unsuspendUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  user.accountStatus = "active";
  user.suspensionReason = undefined;
  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    success: true,
    message: "User unsuspended successfully",
  });
});

// ===== DELETE USER (ADMIN) =====
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

// ===== AWARD BADGE TO USER =====
export const awardBadge = catchAsyncErrors(async (req, res, next) => {
  const { userId, badgeId } = req.body;

  const user = await User.findById(userId);
  const badge = await Badge.findById(badgeId);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (!badge) {
    return next(new ErrorHandler("Badge not found", 404));
  }

  // Check if user already has this badge
  if (user.badges.includes(badgeId)) {
    return next(new ErrorHandler("User already has this badge", 400));
  }

  user.badges.push(badgeId);
  user.walletBalance += badge.rewards.credits;
  await user.save({ validateModifiedOnly: true });

  badge.totalAwarded += 1;
  await badge.save();

  res.status(200).json({
    success: true,
    message: `Badge "${badge.name}" awarded successfully`,
  });
});

// ===== VERIFY SKILL (ADMIN) =====
export const verifySkill = catchAsyncErrors(async (req, res, next) => {
  const skill = await Skill.findById(req.params.skillId);

  if (!skill) {
    return next(new ErrorHandler("Skill not found", 404));
  }

  skill.isVerified = true;
  skill.verifiedBy = req.user._id;
  skill.verifiedAt = Date.now();
  await skill.save();

  res.status(200).json({
    success: true,
    message: "Skill verified successfully",
    skill,
  });
});

// ===== PLATFORM STATS =====
export const getPlatformStats = catchAsyncErrors(async (req, res, next) => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ accountStatus: "active" });
  const totalExperts = await User.countDocuments({ role: "expert" });
  const totalSkills = await Skill.countDocuments();
  const verifiedSkills = await Skill.countDocuments({ isVerified: true });
  const totalBadges = await Badge.countDocuments();

  res.status(200).json({
    success: true,
    stats: {
      totalUsers,
      activeUsers,
      totalExperts,
      totalSkills,
      verifiedSkills,
      totalBadges,
    },
  });
});
