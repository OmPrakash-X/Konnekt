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
  return axiosInstance.put('/user/update', data);
};

export const getMyProfile = () => {
  return axiosInstance.get('/user/me');
};

export const searchUsers = (query: string) => {
  return axiosInstance.get(`/user/search/users?query=${query}`);
};

export const getUserStats = (userId: string) => {
  return axiosInstance.get(`/user/${userId}/stats`);
};

export const getUserReviews = (userId: string) => {
  return axiosInstance.get(`/review/user/${userId}`);
};

export const getAllExperts = () => {
  return axiosInstance.get('/user/experts/all');
};

export const deleteMyAccount = () => {
  return axiosInstance.delete('/user/delete');
};

export const updateNotifications = (data: any) => {
  return axiosInstance.put('/user/notifications', data);
};
