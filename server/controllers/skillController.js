import Skill from "../models/skillModel.js";
import User from "../models/userModel.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

// ===== CREATE SKILL =====
export const createSkill = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    category,
    description,
    level,
    yearsOfExperience,
    certifications,
    pricing,
    tags,
  } = req.body;

  const skill = await Skill.create({
    name,
    category,
    description,
    level,
    userId: req.user._id,
    yearsOfExperience,
    certifications,
    pricing,
    tags,
  });

  // Add skill to user's skills array
  await User.findByIdAndUpdate(req.user._id, {
    $push: { skills: skill._id },
  });

  res.status(201).json({
    success: true,
    message: "Skill added successfully",
    skill,
  });
});

// ===== GET ALL SKILLS (PUBLIC) =====
export const getAllSkills = catchAsyncErrors(async (req, res, next) => {
  const { category, level, search, page = 1, limit = 20 } = req.query;

  const query = { isActive: true };

  if (category) query.category = category;
  if (level) query.level = level;
  if (search) query.$text = { $search: search };

  const skills = await Skill.find(query)
    .populate("userId", "name avatar averageRating")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ endorsementCount: -1, createdAt: -1 });

  const total = await Skill.countDocuments(query);

  res.status(200).json({
    success: true,
    skills,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total,
  });
});

// ===== GET SKILL BY ID =====
export const getSkillById = catchAsyncErrors(async (req, res, next) => {
  const skill = await Skill.findById(req.params.id)
    .populate("userId", "name avatar bio averageRating location")
    .populate("endorsements.userId", "name avatar");

  if (!skill) {
    return next(new ErrorHandler("Skill not found", 404));
  }

  res.status(200).json({
    success: true,
    skill,
  });
});

// ===== GET MY SKILLS =====
export const getMySkills = catchAsyncErrors(async (req, res, next) => {
  const skills = await Skill.find({ userId: req.user._id });

  res.status(200).json({
    success: true,
    count: skills.length,
    skills,
  });
});

// ===== UPDATE SKILL =====
export const updateSkill = catchAsyncErrors(async (req, res, next) => {
  let skill = await Skill.findById(req.params.id);

  if (!skill) {
    return next(new ErrorHandler("Skill not found", 404));
  }

  // Check ownership
  if (skill.userId.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Not authorized to update this skill", 403));
  }

  skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Skill updated successfully",
    skill,
  });
});

// ===== DELETE SKILL =====
export const deleteSkill = catchAsyncErrors(async (req, res, next) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return next(new ErrorHandler("Skill not found", 404));
  }

  // Check ownership
  if (skill.userId.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Not authorized to delete this skill", 403));
  }

  // Remove skill from user's skills array
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { skills: skill._id },
  });

  await skill.deleteOne();

  res.status(200).json({
    success: true,
    message: "Skill deleted successfully",
  });
});

// ===== ENDORSE SKILL =====
export const endorseSkill = catchAsyncErrors(async (req, res, next) => {
  const { comment } = req.body;
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return next(new ErrorHandler("Skill not found", 404));
  }

  // Check if already endorsed
  const alreadyEndorsed = skill.endorsements.find(
    (endorsement) => endorsement.userId.toString() === req.user._id.toString()
  );

  if (alreadyEndorsed) {
    return next(new ErrorHandler("You already endorsed this skill", 400));
  }

  skill.endorsements.push({
    userId: req.user._id,
    comment,
  });

  skill.endorsementCount += 1;
  await skill.save();

  res.status(200).json({
    success: true,
    message: "Skill endorsed successfully",
    skill,
  });
});

// ===== GET SKILLS BY CATEGORY =====
export const getSkillsByCategory = catchAsyncErrors(async (req, res, next) => {
  const { category } = req.params;

  const skills = await Skill.find({ category, isActive: true })
    .populate("userId", "name avatar averageRating")
    .sort({ endorsementCount: -1 });

  res.status(200).json({
    success: true,
    count: skills.length,
    skills,
  });
});
