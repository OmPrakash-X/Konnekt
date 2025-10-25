import {
  generatePasswordResetOtpEmailTemplate,
  generateVerificationOtpEmailTemplate,
} from "./emailTemplate.js";
import { sendEmail } from "./sendEmail.js";

async function sendCodeEmail({
  email,
  code,
  res,
  subject,
  templateGenerator,
  purpose,
}) {
  try {
    const message = templateGenerator(code);

    await sendEmail({
      email,
      subject: `${subject} (Konnekt)`,
      message,
    });

    return res.status(200).json({
      success: true,
      message: `${purpose} code sent successfully to ${email}`,
    });
  } catch (error) {
    console.error(`❌ Failed to send ${purpose} email:`, error);
    return res.status(500).json({
      success: false,
      message: `Failed to send ${purpose} code. Please try again.`,
    });
  }
}

export function sendVerificationCode(code, email, res) {
  return sendCodeEmail({
    email,
    code,
    res,
    subject: "Email Verification Code",
    templateGenerator: generateVerificationOtpEmailTemplate,
    purpose: "Verification",
  });
}

export function sendResetPasswordCode(code, email, res) {
  return sendCodeEmail({
    email,
    code,
    res,
    subject: "Password Reset Code",
    templateGenerator: generatePasswordResetOtpEmailTemplate,
    purpose: "Reset Password",
  });
}
