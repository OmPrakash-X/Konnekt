import Session from "../models/sessionModel.js";
import User from "../models/userModel.js";
import Skill from "../models/skillModel.js";
import Transaction from "../models/transactionModel.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

// ===== CREATE SESSION BOOKING =====
export const createSession = catchAsyncErrors(async (req, res, next) => {
  const {
    providerId,
    skillId,
    scheduledDate,
    startTime,
    duration,
    locationType,
    meetingLink,
    physicalAddress,
    learnerNotes,
  } = req.body;

  // Validate provider and skill
  const provider = await User.findById(providerId);
  const skill = await Skill.findById(skillId);

  if (!provider) {
    return next(new ErrorHandler("Provider not found", 404));
  }

  if (!skill) {
    return next(new ErrorHandler("Skill not found", 404));
  }

  // Can't book session with yourself
  if (providerId === req.user._id.toString()) {
    return next(new ErrorHandler("Cannot book a session with yourself", 400));
  }

  // Check learner has enough credits
  const creditsRequired = skill.pricing.creditsPerHour * (duration / 60);
  
  if (req.user.walletBalance < creditsRequired) {
    return next(
      new ErrorHandler(
        `Insufficient credits. Required: ${creditsRequired}, Available: ${req.user.walletBalance}`,
        400
      )
    );
  }

  // Create session
  const session = await Session.create({
    provider: providerId,
    learner: req.user._id,
    skill: skillId,
    scheduledDate,
    startTime,
    duration,
    creditsCharged: creditsRequired,
    locationType,
    meetingLink,
    physicalAddress,
    learnerNotes,
  });

  res.status(201).json({
    success: true,
    message: "Session booked successfully",
    session,
  });
});

// ===== GET MY SESSIONS (as learner or provider) =====
export const getMySessions = catchAsyncErrors(async (req, res, next) => {
  const { role, status } = req.query; // role: 'learner' or 'provider'

  const query = { status: status || { $ne: "cancelled" } };

  if (role === "learner") {
    query.learner = req.user._id;
  } else if (role === "provider") {
    query.provider = req.user._id;
  } else {
    // Both
    query.$or = [{ learner: req.user._id }, { provider: req.user._id }];
  }

  const sessions = await Session.find(query)
    .populate("provider", "name avatar averageRating")
    .populate("learner", "name avatar")
    .populate("skill", "name category")
    .sort({ scheduledDate: -1 });

  res.status(200).json({
    success: true,
    count: sessions.length,
    sessions,
  });
});

// ===== GET SESSION BY ID =====
export const getSessionById = catchAsyncErrors(async (req, res, next) => {
  const session = await Session.findById(req.params.id)
    .populate("provider", "name avatar bio averageRating location")
    .populate("learner", "name avatar bio")
    .populate("skill", "name category description pricing")
    .populate("review");

  if (!session) {
    return next(new ErrorHandler("Session not found", 404));
  }

  // Check authorization
  if (
    session.provider._id.toString() !== req.user._id.toString() &&
    session.learner._id.toString() !== req.user._id.toString()
  ) {
    return next(
      new ErrorHandler("Not authorized to view this session", 403)
    );
  }

  res.status(200).json({
    success: true,
    session,
  });
});

// ===== CONFIRM SESSION (Provider accepts) =====
export const confirmSession = catchAsyncErrors(async (req, res, next) => {
  const session = await Session.findById(req.params.id);

  if (!session) {
    return next(new ErrorHandler("Session not found", 404));
  }

  // Only provider can confirm
  if (session.provider.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Only provider can confirm session", 403));
  }

  if (session.status !== "pending") {
    return next(new ErrorHandler("Session is not in pending state", 400));
  }

  session.status = "confirmed";
  await session.save();

  res.status(200).json({
    success: true,
    message: "Session confirmed successfully",
    session,
  });
});

// ===== COMPLETE SESSION =====
export const completeSession = catchAsyncErrors(async (req, res, next) => {
  const session = await Session.findById(req.params.id);

  if (!session) {
    return next(new ErrorHandler("Session not found", 404));
  }

  // Only provider can mark as completed
  if (session.provider.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Only provider can complete session", 403));
  }

  if (session.status !== "confirmed") {
    return next(new ErrorHandler("Session must be confirmed first", 400));
  }

  // Transfer credits
  const learner = await User.findById(session.learner);
  const provider = await User.findById(session.provider);

  learner.walletBalance -= session.creditsCharged;
  learner.totalSpent += session.creditsCharged;
  learner.totalSessions += 1;

  provider.walletBalance += session.creditsCharged;
  provider.totalEarnings += session.creditsCharged;
  provider.totalSessions += 1;
  provider.completedSessions += 1;

  await learner.save({ validateModifiedOnly: true });
  await provider.save({ validateModifiedOnly: true });

  // Create transaction record
  await Transaction.create({
    from: session.learner,
    to: session.provider,
    amount: session.creditsCharged,
    type: "session_payment",
    session: session._id,
    description: `Payment for session: ${session.skill.name}`,
    fromBalance: learner.walletBalance,
    toBalance: provider.walletBalance,
  });

  session.status = "completed";
  session.isPaid = true;
  session.completedAt = Date.now();
  await session.save();

  res.status(200).json({
    success: true,
    message: "Session completed and payment transferred",
    session,
  });
});

// ===== CANCEL SESSION =====
export const cancelSession = catchAsyncErrors(async (req, res, next) => {
  const { reason } = req.body;
  const session = await Session.findById(req.params.id);

  if (!session) {
    return next(new ErrorHandler("Session not found", 404));
  }

  // Check authorization
  if (
    session.provider.toString() !== req.user._id.toString() &&
    session.learner.toString() !== req.user._id.toString()
  ) {
    return next(new ErrorHandler("Not authorized to cancel session", 403));
  }

  if (session.status === "completed") {
    return next(new ErrorHandler("Cannot cancel completed session", 400));
  }

  session.status = "cancelled";
  session.cancelledBy = req.user._id;
  session.cancellationReason = reason;
  session.cancelledAt = Date.now();
  await session.save();

  res.status(200).json({
    success: true,
    message: "Session cancelled successfully",
    session,
  });
});

// ===== UPDATE SESSION =====
export const updateSession = catchAsyncErrors(async (req, res, next) => {
  const session = await Session.findById(req.params.id);

  if (!session) {
    return next(new ErrorHandler("Session not found", 404));
  }

  // Only provider or learner can update
  if (
    session.provider.toString() !== req.user._id.toString() &&
    session.learner.toString() !== req.user._id.toString()
  ) {
    return next(new ErrorHandler("Not authorized to update session", 403));
  }

  const { scheduledDate, startTime, meetingLink, providerNotes } = req.body;

  if (scheduledDate) session.scheduledDate = scheduledDate;
  if (startTime) session.startTime = startTime;
  if (meetingLink) session.meetingLink = meetingLink;
  if (providerNotes) session.providerNotes = providerNotes;

  await session.save();

  res.status(200).json({
    success: true,
    message: "Session updated successfully",
    session,
  });
});
