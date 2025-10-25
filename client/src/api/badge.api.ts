import axiosInstance from './axios.config';

export const getAllBadges = () => {
  return axiosInstance.get('/badge');
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

// Admin only
export const createBadge = (data: {
  name: string;
  description: string;
  icon: string;
  criteria: string;
}) => {
  return axiosInstance.post('/badge', data);
};

export const updateBadge = (badgeId: string, data: any) => {
  return axiosInstance.put(`/badge/${badgeId}`, data);
};

export const deleteBadge = (badgeId: string) => {
  return axiosInstance.delete(`/badge/${badgeId}`);
};

export const awardBadge = (data: { userId: string; badgeId: string }) => {
  return axiosInstance.post('/badge/award', data);
};
