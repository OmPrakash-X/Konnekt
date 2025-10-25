import { sendToken } from "../config/sendToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import {
  sendResetPasswordCode,
  sendVerificationCode,
} from "../config/sendVerificationEmail.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

//  SIGNUP → Generate OTP → Email Verification Required
export const signUp = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please provide name, email & password", 400));
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new ErrorHandler("Please provide a valid email address", 400));
  }

  const existing = await User.findOne({ email });

  if (existing && existing.isVerified) {
    return next(new ErrorHandler("User already exists with this email!", 400));
  }

  // Delete old unverified accounts to avoid duplicates
  await User.deleteMany({ email, isVerified: false });

  if (password.length < 6) {
    return next(new ErrorHandler("Password must be 6+ characters long", 400));
  }

  const passwordHash = await bcrypt.hash(password, 10);

  // Generate Signup OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 15 * 60 * 1000; // 15 mins

  const user = await User.create({
    name,
    email,
    passwordHash,
    isVerified: false,
    resetOtp: otp,
    otpExpires: otpExpires,
  });

  // Send verification email
  try {
    await sendVerificationCode(otp, email, res);
  } catch (emailError) {
    // If email fails, delete the user and return error
    await User.deleteOne({ _id: user._id });
    return next(
      new ErrorHandler(
        "Failed to send verification email. Please try again.",
        500
      )
    );
  }

  res.status(201).json({
    success: true,
    message: "Account created! OTP sent to email for verification.",
  });
});

//  VERIFY EMAIL OTP
export const verifyEmailOtp = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new ErrorHandler("Email and OTP are required", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (user.isVerified) {
    return next(new ErrorHandler("Email already verified", 400));
  }

  if (!user.resetOtp || !user.otpExpires) {
    return next(
      new ErrorHandler("No OTP found. Please request a new one.", 400)
    );
  }

  if (user.otpExpires < Date.now()) {
    return next(
      new ErrorHandler("OTP has expired. Please request a new one.", 400)
    );
  }

  if (user.resetOtp !== otp) {
    return next(new ErrorHandler("Invalid OTP", 400));
  }

  user.isVerified = true;
  user.resetOtp = undefined;
  user.otpExpires = undefined;
  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    success: true,
    message: "Email verified successfully ✅ You can now log in.",
  });
});

// RESEND VERIFICATION OTP
export const resendVerificationOtp = catchAsyncErrors(
  async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
      return next(new ErrorHandler("Email is required", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (user.isVerified) {
      return next(new ErrorHandler("Email already verified", 400));
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 15 * 60 * 1000; // 15 mins
    await user.save({ validateModifiedOnly: true });

    try {
      await sendVerificationCode(otp, email);
    } catch (emailError) {
      return next(
        new ErrorHandler(
          "Failed to send verification email. Please try again.",
          500
        )
      );
    }

    res.status(200).json({
      success: true,
      message: "Verification OTP resent successfully",
    });
  }
);

// LOGIN Controller (Only Verified Users)
export const signIn = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email & password required", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  if (!user.isVerified) {
    return next(new ErrorHandler("Please verify your email before login", 403));
  }

  const validPass = await bcrypt.compare(password, user.passwordHash);
  if (!validPass) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  sendToken(user, 200, "Login successful ✅", res);
});

// LOGOUT
export const signOut = catchAsyncErrors(async (req, res, next) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

//  SEND OTP FOR RESET PASSWORD
export const sendResetPasswordOtp = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Email is required", 400));
  }

  const user = await User.findOne({ email, isVerified: true });

  if (!user) {
    return next(
      new ErrorHandler("No verified account found for this email", 404)
    );
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetOtp = otp;
  user.otpExpires = Date.now() + 15 * 60 * 1000; // 15 mins
  user.isOtpVerified = false;

  await user.save({ validateModifiedOnly: true });

  try {
    await sendResetPasswordCode(otp, email, res);
  } catch (emailError) {
    return next(
      new ErrorHandler("Failed to send reset email. Please try again.", 500)
    );
  }

  res.status(200).json({
    success: true,
    message: "Reset OTP sent to email",
  });
});

//  VERIFY OTP BEFORE RESET PASSWORD
export const verifyResetPasswordOtp = catchAsyncErrors(
  async (req, res, next) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return next(new ErrorHandler("Email and OTP are required", 400));
    }

    const user = await User.findOne({ email, isVerified: true });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (!user.resetOtp || !user.otpExpires) {
      return next(
        new ErrorHandler("No OTP found. Please request a new one.", 400)
      );
    }

    if (user.otpExpires < Date.now()) {
      return next(
        new ErrorHandler("OTP has expired. Please request a new one.", 400)
      );
    }

    if (user.resetOtp !== otp) {
      return next(new ErrorHandler("Invalid OTP", 400));
    }

    user.isOtpVerified = true;
    await user.save({ validateModifiedOnly: true });

    res.status(200).json({
      success: true,
      message: "OTP verified ✅ You can now set your new password",
    });
  }
);

//  RESET PASSWORD
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required", 400));
  }

  if (password.length < 6) {
    return next(new ErrorHandler("Password must be 6+ characters long", 400));
  }

  const user = await User.findOne({ email, isVerified: true });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (!user.isOtpVerified) {
    return next(
      new ErrorHandler(
        "OTP verification required before resetting password",
        400
      )
    );
  }

  const hashed = await bcrypt.hash(password, 10);
  user.passwordHash = hashed;
  user.isOtpVerified = false;
  user.resetOtp = undefined;
  user.otpExpires = undefined;

  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    success: true,
    message: "Password reset successfully ✅",
  });
});
