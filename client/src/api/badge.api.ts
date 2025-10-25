// src/api/badge.api.ts
import axiosInstance from './axios.config';

export const getAllBadges = () => {
  return axiosInstance.get('/badges/all');
};

export const getBadgeById = (badgeId: string) => {
  return axiosInstance.get(`/badges/${badgeId}`);
};

export const getMyBadges = () => {
  return axiosInstance.get('/badges/my-badges');
};

export const getUserBadges = (userId: string) => {
  return axiosInstance.get(`/badges/user/${userId}`);
};

export const getBadgesByCategory = (category: string) => {
  return axiosInstance.get(`/badges/category/${category}`);
};

// Admin only
export const createBadge = (data: {
  name: string;
  description: string;
  icon: string;
  criteria: string;
}) => {
  return axiosInstance.post('/badges/create', data);
};

export const updateBadge = (data: { badgeId: string; data: any }) => {
  return axiosInstance.put(`/badges/${data.badgeId}`, data.data);
};

export const deleteBadge = (badgeId: string) => {
  return axiosInstance.delete(`/badges/${badgeId}`);
};

export const awardBadge = (data: { userId: string; badgeId: string }) => {
  return axiosInstance.post('/admin/badge/award', data);
};
