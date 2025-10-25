import Review from "../models/reviewModel.js";
import Session from "../models/sessionModel.js";
import User from "../models/userModel.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

// ===== CREATE REVIEW =====
export const createReview = catchAsyncErrors(async (req, res, next) => {
  const {
    sessionId,
    rating,
    comment,
    communication,
    expertise,
    punctuality,
  } = req.body;

  // Get session
  const session = await Session.findById(sessionId);

  if (!session) {
    return next(new ErrorHandler("Session not found", 404));
  }

  // Check if session is completed
  if (session.status !== "completed") {
    return next(
      new ErrorHandler("Can only review completed sessions", 400)
    );
  }

  // Check if user is part of session
  if (
    session.learner.toString() !== req.user._id.toString() &&
    session.provider.toString() !== req.user._id.toString()
  ) {
    return next(new ErrorHandler("Not authorized to review this session", 403));
  }

  // Check if already reviewed
  const existingReview = await Review.findOne({ session: sessionId });
  if (existingReview) {
    return next(new ErrorHandler("Session already reviewed", 400));
  }

  // Determine who is being reviewed
  const revieweeId =
    session.learner.toString() === req.user._id.toString()
      ? session.provider
      : session.learner;

  // Create review
  const review = await Review.create({
    session: sessionId,
    reviewee: revieweeId,
    reviewer: req.user._id,
    rating,
    comment,
    communication,
    expertise,
    punctuality,
  });

  // Update session with review reference
  session.review = review._id;
  await session.save();

  // Update reviewee's average rating
  await updateUserRating(revieweeId);

  res.status(201).json({
    success: true,
    message: "Review submitted successfully",
    review,
  });
});

// ===== GET REVIEWS FOR USER =====
export const getUserReviews = catchAsyncErrors(async (req, res, next) => {
  const reviews = await Review.find({ reviewee: req.params.userId })
    .populate("reviewer", "name avatar")
    .populate({
      path: "session",
      populate: { path: "skill", select: "name category" },
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: reviews.length,
    reviews,
  });
});

// ===== GET MY REVIEWS (Given by me) =====
export const getMyReviews = catchAsyncErrors(async (req, res, next) => {
  const reviews = await Review.find({ reviewer: req.user._id })
    .populate("reviewee", "name avatar")
    .populate({
      path: "session",
      populate: { path: "skill", select: "name category" },
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: reviews.length,
    reviews,
  });
});

// ===== UPDATE REVIEW =====
export const updateReview = catchAsyncErrors(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  // Check ownership
  if (review.reviewer.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Not authorized to update this review", 403));
  }

  const { rating, comment, communication, expertise, punctuality } = req.body;

  if (rating) review.rating = rating;
  if (comment) review.comment = comment;
  if (communication) review.communication = communication;
  if (expertise) review.expertise = expertise;
  if (punctuality) review.punctuality = punctuality;

  await review.save();

  // Update reviewee's average rating
  await updateUserRating(review.reviewee);

  res.status(200).json({
    success: true,
    message: "Review updated successfully",
    review,
  });
});

// ===== DELETE REVIEW =====
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  // Check ownership or admin
  if (
    review.reviewer.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(new ErrorHandler("Not authorized to delete this review", 403));
  }

  const revieweeId = review.reviewee;
  await review.deleteOne();

  // Update reviewee's average rating
  await updateUserRating(revieweeId);

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

// ===== HELPER: Update User Average Rating =====
async function updateUserRating(userId) {
  const reviews = await Review.find({ reviewee: userId });

  if (reviews.length === 0) {
    await User.findByIdAndUpdate(userId, {
      averageRating: 0,
      totalReviews: 0,
    });
    return;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = (totalRating / reviews.length).toFixed(2);

  await User.findByIdAndUpdate(userId, {
    averageRating: parseFloat(averageRating),
    totalReviews: reviews.length,
  });
}
