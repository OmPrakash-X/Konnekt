export function generateVerificationOtpEmailTemplate(otpCode) {
  return `
  <div style="font-family: 'Segoe UI', Roboto, 'Geist', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 12px; background: linear-gradient(135deg, #1f2121, #262828); color: #f5f5f5; border: 1px solid rgba(119, 124, 124, 0.2);">
    <h1 style="text-align: center; color: #32b8c6; margin-bottom: 20px; font-weight: 600; letter-spacing: -0.01em;">Verify Your Email</h1>
    
    <p style="font-size: 16px; color: #e8e8e8;">Hey there,</p>
    
    <p style="font-size: 16px; color: #cccccc; line-height: 1.6;">
      You're just one step away from joining the <strong style="color: #32b8c6;">Konnekt</strong> community! Use the code below to verify your email and activate your account.
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <span style="display: inline-block; font-size: 32px; font-weight: 600; color: #1f2121; padding: 16px 32px; background-color: #32b8c6; border-radius: 10px; letter-spacing: 4px; box-shadow: 0 4px 12px rgba(50, 184, 198, 0.3);">
        ${otpCode}
      </span>
    </div>
    
    <p style="font-size: 15px; color: #a7a9a9; line-height: 1.5;">⚠️ This code is valid for 15 minutes. Please keep it confidential and do not share it with anyone.</p>
    <p style="font-size: 15px; color: #a7a9a9; line-height: 1.5;">If you didn't request this verification, feel free to ignore this message.</p>
    
    <hr style="margin: 30px 0; border: none; border-top: 1px solid rgba(119, 124, 124, 0.3);" />
    
    <footer style="text-align: center; font-size: 13px; color: #777c7c;">
      <p style="margin: 8px 0;">Welcome to <strong style="color: #32b8c6;">Konnekt</strong> — where connections matter ✨</p>
      <p style="margin: 8px 0;">This is an automated message — please do not reply.</p>
    </footer>
  </div>
  `;
}

export function generatePasswordResetOtpEmailTemplate(otpCode) {
  return `
<div style="font-family: 'Segoe UI', Roboto, 'Geist', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 12px; background: linear-gradient(135deg, #1f2121, #262828); color: #f5f5f5; border: 1px solid rgba(119, 124, 124, 0.2);">
  <h1 style="text-align: center; color: #32b8c6; margin-bottom: 20px; font-weight: 600; letter-spacing: -0.01em;">Reset Your Password</h1>

  <p style="font-size: 16px; color: #e8e8e8;">Hey there,</p>

  <p style="font-size: 16px; color: #cccccc; line-height: 1.6;">
    We received a request to reset your <strong style="color: #32b8c6;">Konnekt</strong> password. Use the code below to proceed:
  </p>

  <div style="text-align: center; margin: 30px 0;">
    <span style="display: inline-block; font-size: 32px; font-weight: 600; color: #1f2121; padding: 16px 32px; background-color: #32b8c6; border-radius: 10px; letter-spacing: 4px; box-shadow: 0 4px 12px rgba(50, 184, 198, 0.3);">
      ${otpCode}
    </span>
  </div>

  <p style="font-size: 15px; color: #a7a9a9; text-align: center; line-height: 1.5;">⚠️ This code is valid for 15 minutes. Don't share it with anyone.</p>
  <p style="font-size: 15px; color: #a7a9a9; text-align: center; line-height: 1.5;">Didn't request a password reset? You can ignore this email.</p>

  <hr style="margin: 30px 0; border: none; border-top: 1px solid rgba(119, 124, 124, 0.3);" />

  <footer style="text-align: center; font-size: 13px; color: #777c7c; padding: 12px 0; background-color: rgba(38, 40, 40, 0.5); border-radius: 8px;">
    <p style="margin: 8px 0;"><strong style="color: #32b8c6;">Konnekt</strong> — securing your connections 🔐</p>
    <p style="margin: 8px 0;">This is an automated message — please do not reply.</p>
  </footer>
</div>
  `;
}
