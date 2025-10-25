import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

// ===== GET MY TRANSACTIONS =====
export const getMyTransactions = catchAsyncErrors(async (req, res, next) => {
  const { type, page = 1, limit = 20 } = req.query;

  const query = {
    $or: [{ from: req.user._id }, { to: req.user._id }],
  };

  if (type) {
    query.type = type;
  }

  const transactions = await Transaction.find(query)
    .populate("from", "name avatar")
    .populate("to", "name avatar")
    .populate("session", "scheduledDate skill")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Transaction.countDocuments(query);

  res.status(200).json({
    success: true,
    transactions,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total,
  });
});

// ===== GET TRANSACTION BY ID =====
export const getTransactionById = catchAsyncErrors(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id)
    .populate("from", "name avatar")
    .populate("to", "name avatar")
    .populate("session");

  if (!transaction) {
    return next(new ErrorHandler("Transaction not found", 404));
  }

  // Check authorization
  if (
    transaction.from.toString() !== req.user._id.toString() &&
    transaction.to?.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorHandler("Not authorized to view this transaction", 403)
    );
  }

  res.status(200).json({
    success: true,
    transaction,
  });
});

// ===== ADMIN: GET ALL TRANSACTIONS =====
export const getAllTransactions = catchAsyncErrors(async (req, res, next) => {
  const { type, status, page = 1, limit = 50 } = req.query;

  const query = {};
  if (type) query.type = type;
  if (status) query.status = status;

  const transactions = await Transaction.find(query)
    .populate("from", "name email")
    .populate("to", "name email")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Transaction.countDocuments(query);

  res.status(200).json({
    success: true,
    transactions,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total,
  });
});

// ===== ADMIN: ADD CREDITS TO USER =====
export const addCreditsToUser = catchAsyncErrors(async (req, res, next) => {
  const { userId, amount, description } = req.body;

  if (amount <= 0) {
    return next(new ErrorHandler("Amount must be positive", 400));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  user.walletBalance += amount;
  await user.save({ validateModifiedOnly: true });

  // Create transaction record
  const transaction = await Transaction.create({
    from: req.user._id, // Admin
    to: userId,
    amount,
    type: "admin_adjustment",
    description: description || "Credits added by admin",
    toBalance: user.walletBalance,
    status: "completed",
  });

  res.status(200).json({
    success: true,
    message: `${amount} credits added to user`,
    transaction,
  });
});
