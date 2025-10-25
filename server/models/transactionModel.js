import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    // Transaction parties
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Amount
    amount: {
      type: Number,
      required: true,
    },

    // Type
    type: {
      type: String,
      enum: [
        "session_payment",
        "badge_reward",
        "signup_bonus",
        "referral_bonus",
        "refund",
        "admin_adjustment",
      ],
      required: true,
    },

    // Reference
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    },
    badge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Badge",
    },

    // Status
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "reversed"],
      default: "completed",
    },

    // Description
    description: {
      type: String,
      required: true,
    },

    // Balances after transaction
    fromBalance: {
      type: Number,
    },
    toBalance: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
transactionSchema.index({ from: 1, createdAt: -1 });
transactionSchema.index({ to: 1, createdAt: -1 });

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
