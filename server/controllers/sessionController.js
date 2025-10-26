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

  // ✅ FIXED: Log received data
  console.log('📦 Received booking data:', {
    providerId,
    skillId,
    scheduledDate,
    startTime,
    duration,
    locationType
  });

  // ✅ FIXED: skillId is now optional
  if (!providerId || !scheduledDate || !startTime || !duration) {
    console.log('❌ Missing required fields');
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  // Validate provider
  const provider = await User.findById(providerId);
  if (!provider) {
    return next(new ErrorHandler("Provider not found", 404));
  }

  // ✅ FIXED: Handle optional skillId
  let skill = null;
  let skillName = 'General';
  let creditsRequired;

  if (skillId) {
    skill = await Skill.findById(skillId);
    if (skill) {
      skillName = skill.name;
      creditsRequired = skill.pricing?.creditsPerHour 
        ? skill.pricing.creditsPerHour * (duration / 60)
        : (duration / 60) * 10; // Fallback
    } else {
      console.log('⚠️ Skill not found, using fallback');
      creditsRequired = (duration / 60) * 10;
    }
  } else {
    // Use provider's first skill as fallback
    skillName = provider.skills?.[0]?.name || 'General';
    creditsRequired = (duration / 60) * 10; // Fallback: 10 credits per hour
  }

  console.log('✅ Using skill:', skillName);
  console.log('💰 Credits required:', creditsRequired);

  // Can't book session with yourself
  if (providerId === req.user._id.toString()) {
    return next(new ErrorHandler("Cannot book a session with yourself", 400));
  }

  // ✅ Check slot availability
  const isAvailable = await Session.isSlotAvailable(providerId, scheduledDate, startTime);
  if (!isAvailable) {
    return next(new ErrorHandler("This time slot is already booked", 400));
  }

  // Check learner has enough credits
  if ((req.user.walletBalance || 0) < creditsRequired) {
    return next(
      new ErrorHandler(
        `Insufficient credits. Required: ${creditsRequired}, Available: ${req.user.walletBalance || 0}`,
        400
      )
    );
  }

  // Calculate end time
  const [time, period] = startTime.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  const endMinutes = hours * 60 + minutes + duration;
  const endHours = Math.floor(endMinutes / 60) % 24;
  const endMins = endMinutes % 60;
  const endPeriod = endHours >= 12 ? 'PM' : 'AM';
  const displayHours = endHours > 12 ? endHours - 12 : endHours === 0 ? 12 : endHours;
  const endTime = `${displayHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')} ${endPeriod}`;

  // ✅ FIXED: Create session with optional skillId
  const session = await Session.create({
    provider: providerId,
    learner: req.user._id,
    skill: skillId || null, // ✅ Can be null
    scheduledDate: new Date(scheduledDate),
    startTime,
    endTime,
    duration,
    creditsCharged: creditsRequired,
    locationType: locationType || 'online',
    meetingLink,
    physicalAddress,
    learnerNotes,
    status: 'confirmed',
  });

  // ✅ Deduct credits from learner
  req.user.walletBalance = (req.user.walletBalance || 0) - creditsRequired;
  await req.user.save({ validateModifiedOnly: true });

  // Populate session details
  await session.populate('provider', 'name avatar email skills');
  await session.populate('learner', 'name avatar email');
  if (skillId) {
    await session.populate('skill', 'name category');
  }

  console.log('✅ Session created successfully:', session._id);

  res.status(201).json({
    success: true,
    message: "Session booked successfully",
    session,
  });
});

// ===== GET AVAILABLE SLOTS =====
export const getAvailableSlots = catchAsyncErrors(async (req, res, next) => {
  const { providerId, date } = req.query;

  if (!providerId || !date) {
    return next(new ErrorHandler("Please provide providerId and date", 400));
  }

  // All possible time slots
  const allSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  // Get booked slots
  const bookedSessions = await Session.find({
    provider: providerId,
    scheduledDate: new Date(date),
    status: { $in: ['pending', 'confirmed'] }
  }).select('startTime');

  const bookedSlots = bookedSessions.map(s => s.startTime);
  const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

  res.status(200).json({
    success: true,
    availableSlots,
    bookedSlots,
  });
});

// ===== GET MY SESSIONS =====
export const getMySessions = catchAsyncErrors(async (req, res, next) => {
  const { role, status } = req.query;

  const query = {};

  if (status) {
    query.status = status;
  } else {
    query.status = { $ne: "cancelled" };
  }

  if (role === "learner") {
    query.learner = req.user._id;
  } else if (role === "provider") {
    query.provider = req.user._id;
  } else {
    query.$or = [{ learner: req.user._id }, { provider: req.user._id }];
  }

  const sessions = await Session.find(query)
    .populate("provider", "name avatar averageRating skills")
    .populate("learner", "name avatar")
    .populate("skill", "name category")
    .sort({ scheduledDate: -1, startTime: -1 });

  res.status(200).json({
    success: true,
    count: sessions.length,
    sessions,
  });
});

// ===== GET SESSION BY ID =====
export const getSessionById = catchAsyncErrors(async (req, res, next) => {
  const session = await Session.findById(req.params.id)
    .populate("provider", "name avatar bio averageRating location skills")
    .populate("learner", "name avatar bio")
    .populate("skill", "name category description pricing")
    .populate("review");

  if (!session) {
    return next(new ErrorHandler("Session not found", 404));
  }

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

// ===== CONFIRM SESSION =====
export const confirmSession = catchAsyncErrors(async (req, res, next) => {
  const session = await Session.findById(req.params.id);

  if (!session) {
    return next(new ErrorHandler("Session not found", 404));
  }

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

  if (session.provider.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Only provider can complete session", 403));
  }

  if (session.status === "completed") {
    return next(new ErrorHandler("Session already completed", 400));
  }

  const learner = await User.findById(session.learner);
  const provider = await User.findById(session.provider);

  provider.walletBalance = (provider.walletBalance || 0) + session.creditsCharged;
  provider.totalEarnings = (provider.totalEarnings || 0) + session.creditsCharged;
  provider.totalSessions = (provider.totalSessions || 0) + 1;
  provider.completedSessions = (provider.completedSessions || 0) + 1;

  learner.totalSpent = (learner.totalSpent || 0) + session.creditsCharged;
  learner.totalSessions = (learner.totalSessions || 0) + 1;

  await learner.save({ validateModifiedOnly: true });
  await provider.save({ validateModifiedOnly: true });

  await Transaction.create({
    from: session.learner,
    to: session.provider,
    amount: session.creditsCharged,
    type: "session_payment",
    session: session._id,
    description: `Payment for session`,
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

  if (
    session.provider.toString() !== req.user._id.toString() &&
    session.learner.toString() !== req.user._id.toString()
  ) {
    return next(new ErrorHandler("Not authorized to cancel session", 403));
  }

  if (session.status === "completed") {
    return next(new ErrorHandler("Cannot cancel completed session", 400));
  }

  if (session.status === "cancelled") {
    return next(new ErrorHandler("Session already cancelled", 400));
  }

  const sessionDateTime = new Date(`${session.scheduledDate} ${session.startTime}`);
  const hoursUntilSession = (sessionDateTime - new Date()) / (1000 * 60 * 60);

  let creditsRefunded = false;

  if (hoursUntilSession >= 24 && session.learner.toString() === req.user._id.toString()) {
    const learner = await User.findById(session.learner);
    learner.walletBalance = (learner.walletBalance || 0) + session.creditsCharged;
    await learner.save({ validateModifiedOnly: true });
    creditsRefunded = true;
  }

  session.status = "cancelled";
  session.cancelledBy = req.user._id;
  session.cancellationReason = reason || "No reason provided";
  session.cancelledAt = Date.now();
  await session.save();

  res.status(200).json({
    success: true,
    message: creditsRefunded 
      ? "Session cancelled and credits refunded"
      : "Session cancelled (no refund - less than 24h notice)",
    session,
    creditsRefunded,
  });
});

// ===== UPDATE SESSION =====
export const updateSession = catchAsyncErrors(async (req, res, next) => {
  const session = await Session.findById(req.params.id);

  if (!session) {
    return next(new ErrorHandler("Session not found", 404));
  }

  if (
    session.provider.toString() !== req.user._id.toString() &&
    session.learner.toString() !== req.user._id.toString()
  ) {
    return next(new ErrorHandler("Not authorized to update session", 403));
  }

  if (session.status === "completed" || session.status === "cancelled") {
    return next(new ErrorHandler("Cannot update completed/cancelled session", 400));
  }

  const { scheduledDate, startTime, meetingLink, providerNotes, learnerNotes } = req.body;

  if (scheduledDate) session.scheduledDate = scheduledDate;
  if (startTime) session.startTime = startTime;
  if (meetingLink) session.meetingLink = meetingLink;
  
  if (providerNotes && session.provider.toString() === req.user._id.toString()) {
    session.providerNotes = providerNotes;
  }
  
  if (learnerNotes && session.learner.toString() === req.user._id.toString()) {
    session.learnerNotes = learnerNotes;
  }

  await session.save();

  res.status(200).json({
    success: true,
    message: "Session updated successfully",
    session,
  });
});
