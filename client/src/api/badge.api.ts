import axiosInstance from './axios.config';

export const getAllBadges = () => {
  return axiosInstance.get('/badge/all');
};

export const getBadgeById = (badgeId: string) => {
  return axiosInstance.get(`/badge/${badgeId}`);
};

export const getMyBadges = () => {
  return axiosInstance.get('/badge/my-badges');
};

export const getUserBadges = (userId: string) => {
  return axiosInstance.get(`/badge/user/${userId}`);
};

export const getBadgesByCategory = (category: string) => {
  return axiosInstance.get(`/badge/category/${category}`);
};

// Admin only
export const createBadge = (data: {
  name: string;
  description: string;
  icon: string;
  criteria: string;
}) => {
  return axiosInstance.post('/badge/create', data);
};

export const updateBadge = (badgeId: string, data: any) => {
  return axiosInstance.put(`/badge/${badgeId}`, data);
};

export const deleteBadge = (badgeId: string) => {
  return axiosInstance.delete(`/badge/${badgeId}`);
};

export const awardBadge = (data: { userId: string; badgeId: string }) => {
  return axiosInstance.post('/admin/badge/award', data);
};
