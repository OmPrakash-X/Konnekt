import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    // Session reference
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      unique: true, // One review per session
    },

    // Who is being reviewed
    reviewee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Who wrote the review
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Rating
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // Review content
    comment: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },

    // Specific ratings
    communication: {
      type: Number,
      min: 1,
      max: 5,
    },
    expertise: {
      type: Number,
      min: 1,
      max: 5,
    },
    punctuality: {
      type: Number,
      min: 1,
      max: 5,
    },

    // Helpful votes
    helpfulVotes: {
      type: Number,
      default: 0,
    },

    // Status
    isVerified: {
      type: Boolean,
      default: true, // Auto-verify if session completed
    },

    // Moderation
    isReported: {
      type: Boolean,
      default: false,
    },
    reportReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
reviewSchema.index({ reviewee: 1, rating: 1 });
reviewSchema.index({ reviewer: 1 });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
