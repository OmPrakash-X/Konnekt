import axiosInstance from './axios.config';

export const getUserProfile = (userId: string) => {
  return axiosInstance.get(`/user/${userId}`);
};

export const updateProfile = (data: {
  name?: string;
  bio?: string;
  location?: string;
  avatar?: string;
}) => {
  return axiosInstance.put('/user/profile', data);
};

export const getMyProfile = () => {
  return axiosInstance.get('/user/me');
};

export const searchUsers = (query: string) => {
  return axiosInstance.get(`/user/search?query=${query}`);
};

export const getUserStats = (userId: string) => {
  return axiosInstance.get(`/user/${userId}/stats`);
};

export const getUserReviews = (userId: string) => {
  return axiosInstance.get(`/user/${userId}/reviews`);
};

export const becomeExpert = (data: { skills: string[]; bio: string }) => {
  return axiosInstance.post('/user/become-expert', data);
};

export const updateExpertProfile = (data: any) => {
  return axiosInstance.put('/user/expert-profile', data);
};
