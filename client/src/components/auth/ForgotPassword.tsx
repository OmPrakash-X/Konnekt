import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, ShieldCheck, LucideEyeClosed, LucideEye } from 'lucide-react';
import Button from '../common/Button';
import { sendResetPasswordOtp, verifyResetPasswordOtp, resetPassword } from '../../api/auth.api';
import { toast } from 'sonner';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === 2) {
      inputRefs.current[0]?.focus();
    }
  }, [step]);

  // Step 1: Send OTP to email
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await sendResetPasswordOtp(email);
      toast.success(response.data.message || 'OTP sent to your email');
      setStep(2);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to send OTP';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await verifyResetPasswordOtp({ email, otp: otpString });
      toast.success(response.data.message || 'OTP verified successfully');
      setStep(3);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Invalid OTP';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await resetPassword({ 
        email, 
        password: newPassword 
      });
      toast.success(response.data.message || 'Password reset successfully');
      navigate('/login');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to reset password';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // OTP input handlers
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = [...otp];
    pastedData.forEach((char, i) => {
      if (!isNaN(Number(char)) && i < 6) {
        newOtp[i] = char;
      }
    });
    setOtp(newOtp);
  };

  const handleResendOtp = async () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    setIsLoading(true);
    try {
      const response = await sendResetPasswordOtp(email);
      toast.success(response.data.message || 'OTP resent to your email');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setOtp(['', '', '', '', '', '']);
    } else if (step === 3) {
      setStep(2);
    }
    setError('');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 backdrop-blur-xl rounded-full mb-4 border border-white/10">
          {step === 1 && <Mail className="w-8 h-8 text-[#32b8c6]" />}
          {step === 2 && <ShieldCheck className="w-8 h-8 text-[#32b8c6]" />}
          {step === 3 && <Lock className="w-8 h-8 text-[#32b8c6]" />}
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          {step === 1 && 'Forgot Password?'}
          {step === 2 && 'Verify OTP'}
          {step === 3 && 'Reset Password'}
        </h2>
        <p className="text-gray-400">
          {step === 1 && "Enter your email to receive a verification code"}
          {step === 2 && "Enter the 6-digit code sent to your email"}
          {step === 3 && "Create a new password for your account"}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Step 1: Email Input */}
      {step === 1 && (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder-gray-500 focus:border-[#32b8c6] focus:ring-2 focus:ring-[#32b8c6]/20 outline-none transition-all"
            />
          </div>

          <Button type="submit" fullWidth isLoading={isLoading}>
            Send Verification Code
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm text-[#32b8c6] hover:text-[#3dcad9] inline-flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </div>
        </form>
      )}

      {/* Step 2: OTP Verification */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="flex gap-3 justify-center" onPaste={handleOtpPaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl font-bold rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-white focus:border-[#32b8c6] focus:ring-2 focus:ring-[#32b8c6]/20 outline-none transition-all"
              />
            ))}
          </div>

          <Button onClick={handleVerifyOtp} fullWidth isLoading={isLoading}>
            Verify OTP
          </Button>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={handleBack}
              className="text-gray-400 hover:text-[#32b8c6] inline-flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Change Email
            </button>
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-[#32b8c6] hover:text-[#3dcad9] transition-colors"
            >
              Resend Code
            </button>
          </div>
        </div>
      )}

      {/* Step 3: New Password */}
      {step === 3 && (
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 characters)"
                className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder-gray-500 focus:border-[#32b8c6] focus:ring-2 focus:ring-[#32b8c6]/20 outline-none transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors text-xl"
              >
                {showPassword ? <LucideEye /> : <LucideEyeClosed />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder-gray-500 focus:border-[#32b8c6] focus:ring-2 focus:ring-[#32b8c6]/20 outline-none transition-all"
            />
          </div>

          <Button type="submit" fullWidth isLoading={isLoading}>
            Reset Password
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleBack}
              className="text-sm text-gray-400 hover:text-[#32b8c6] inline-flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        </form>
      )}

      {/* Progress Indicator */}
      <div className="mt-8 flex justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 w-12 rounded-full transition-all ${
              s <= step
                ? 'bg-[#32b8c6]'
                : 'bg-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ForgotPassword;
