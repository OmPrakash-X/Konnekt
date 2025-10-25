import axiosInstance from './axios.config';

export const login = (credentials: { email: string; password: string }) => {
  return axiosInstance.post('/auth/signin', credentials);
};

export const signup = (userData: { name: string; email: string; password: string }) => {
  return axiosInstance.post('/auth/signup', userData);
};

export const logout = () => {
  return axiosInstance.post('/auth/signout');
};

export const getProfile = () => {
  return axiosInstance.get('/user/me');
};

export const verifyEmailOtp = (data: { email: string; otp: string }) => {
  return axiosInstance.post('/auth/verify-email', data); 
};

export const resendVerificationOtp = (email: string) => {
  return axiosInstance.post('/auth/resend-verification', { email });
};

export const sendResetPasswordOtp = (email: string) => {
  return axiosInstance.post('/auth/password/forgot', { email });
};

export const verifyResetPasswordOtp = (data: { email: string; otp: string }) => {
  return axiosInstance.post('/auth/password/verify-otp', data);
};

export const resetPassword = (data: { email: string; otp: string; newPassword: string }) => {
  return axiosInstance.post('/auth/password/reset', data);
};
