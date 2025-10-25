import express from "express";
import {
  signUp,
  verifyEmailOtp,
  resendVerificationOtp,
  signIn,
  signOut,
  sendResetPasswordOtp,
  verifyResetPasswordOtp,
  resetPassword,
} from "../controllers/authController.js";

const AuthRouter = express.Router();

//  Signup & Email Verification Routes
AuthRouter.post("/signup", signUp); // Create account → OTP sent to email
AuthRouter.post("/verify-email", verifyEmailOtp); // Verify signup OTP
AuthRouter.post("/resend-verification", resendVerificationOtp); // Resend verification OTP

//  Login & Logout Routes
AuthRouter.post("/signin", signIn); // Login after email verification
AuthRouter.post("/signout", signOut); // Logout (clears cookie)

//  Password Reset Routes
AuthRouter.post("/password/forgot", sendResetPasswordOtp); // Send reset OTP to email
AuthRouter.post("/password/verify-otp", verifyResetPasswordOtp); // Verify reset OTP
AuthRouter.post("/password/reset", resetPassword); // Set new password after OTP verification

export default AuthRouter;
