import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { verifyEmail } from '../../redux/features/authSlice';
import { ShieldCheck } from 'lucide-react';
import Button from '../common/Button';
import { toast } from 'sonner';

const OtpVerification: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Get email from Redux store
  const tempEmail = useAppSelector((state) => state.auth.tempEmail);
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // If no email stored, redirect to signup
    if (!tempEmail) {
      navigate('/signup');
      return;
    }
    inputRefs.current[0]?.focus();
  }, [tempEmail, navigate]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
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

  const handleSubmit = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(verifyEmail({ email: tempEmail!, otp: otpString })).unwrap();
      toast.success('Email verified successfully! You can now log in.');
      navigate('/login');
    } catch (err: any) {
      setError(err || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!tempEmail) return null;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#32b8c6]/10 dark:bg-[#32b8c6]/20 rounded-full mb-4">
          <ShieldCheck className="w-8 h-8 text-[#32b8c6]" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Verify Your Email
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Enter the 6-digit code sent to
        </p>
        <p className="text-[#32b8c6] font-semibold">{tempEmail}</p>
      </div>

      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="flex gap-3 justify-center" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-2xl font-bold rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-[#32b8c6] focus:ring-2 focus:ring-[#32b8c6]/20 outline-none transition-all"
            />
          ))}
        </div>

        <Button onClick={handleSubmit} fullWidth isLoading={isLoading}>
          Verify Email
        </Button>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Didn't receive code?{' '}
          <button className="text-[#32b8c6] hover:underline">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
