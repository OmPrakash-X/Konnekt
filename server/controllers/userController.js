import User from "../models/userModel.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

// ===== GET USER PROFILE =====
export const getMyProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate("skills")
    .populate("learningNeeds")
    .populate("badges");

  res.status(200).json({
    success: true,
    user,
  });
});

// ===== GET USER BY ID (PUBLIC) =====
export const getUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .select("-passwordHash -resetOtp -otpExpires -isOtpVerified")
    .populate("skills")
    .populate("learningNeeds")
    .populate("badges");

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Increment profile views
  user.profileViews += 1;
  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    success: true,
    user,
  });
});

// ===== UPDATE PROFILE =====
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    bio,
    phone,
    avatar,
    location,
    availability,
    preferences,
    socialLinks,
    accessibility,
  } = req.body;

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (bio) user.bio = bio;
  if (phone) user.phone = phone;
  if (avatar) user.avatar = avatar;
  if (location) user.location = { ...user.location, ...location };
  if (availability) user.availability = { ...user.availability, ...availability };
  if (preferences) user.preferences = { ...user.preferences, ...preferences };
  if (socialLinks) user.socialLinks = { ...user.socialLinks, ...socialLinks };
  if (accessibility) user.accessibility = { ...user.accessibility, ...accessibility };

  // Calculate profile completeness
  const completeness = calculateProfileCompleteness(user);
  user.profileCompleteness = completeness;
  user.isProfileComplete = completeness >= 80;

  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

// ===== UPDATE NOTIFICATION PREFERENCES =====
export const updateNotifications = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  user.notifications = { ...user.notifications, ...req.body };
  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    success: true,
    message: "Notification preferences updated",
    notifications: user.notifications,
  });
});

// ===== SEARCH USERS =====
export const searchUsers = catchAsyncErrors(async (req, res, next) => {
  const { query, city, category, role, page = 1, limit = 20 } = req.query;

  const searchCriteria = {
    isVerified: true,
    accountStatus: "active",
  };

  if (query) {
    searchCriteria.$text = { $search: query };
  }

  if (city) {
    searchCriteria["location.city"] = new RegExp(city, "i");
  }

  if (role) {
    searchCriteria.role = role;
  }

  const users = await User.find(searchCriteria)
    .select("-passwordHash -resetOtp -otpExpires")
    .populate("skills")
    .populate("badges")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ averageRating: -1, completedSessions: -1 });

  const total = await User.countDocuments(searchCriteria);

  res.status(200).json({
    success: true,
    users,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total,
  });
});

// ===== GET ALL EXPERTS =====
export const getAllExperts = catchAsyncErrors(async (req, res, next) => {
  const experts = await User.find({
    role: "expert",
    "expertProfile.isExpert": true,
    accountStatus: "active",
  })
    .select("-passwordHash -resetOtp -otpExpires")
    .populate("skills")
    .populate("badges")
    .sort({ averageRating: -1 });

  res.status(200).json({
    success: true,
    count: experts.length,
    experts,
  });
});

// ===== DELETE ACCOUNT (SELF) =====
export const deleteMyAccount = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  user.accountStatus = "deactivated";
  await user.save({ validateModifiedOnly: true });

  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Account deactivated successfully",
  });
});

// ===== HELPER: Calculate Profile Completeness =====
function calculateProfileCompleteness(user) {
  let score = 0;
  const fields = [
    user.name,
    user.email,
    user.bio,
    user.avatar,
    user.phone,
    user.location?.city,
    user.skills?.length > 0,
    user.availability?.days?.length > 0,
  ];

  fields.forEach((field) => {
    if (field) score += 12.5;
  });

  return Math.round(score);
}
