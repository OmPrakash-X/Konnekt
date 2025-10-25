import axiosInstance from './axios.config';

// User Management
export const getAllUsers = (params?: {
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  return axiosInstance.get('/admin/users', { params });
};

export const updateUserStatus = (userId: string, status: 'active' | 'suspended') => {
  return axiosInstance.put(`/admin/users/${userId}/status`, { status });
};

export const deleteUser = (userId: string) => {
  return axiosInstance.delete(`/admin/users/${userId}`);
};

// Skill Verification
export const getPendingSkills = () => {
  return axiosInstance.get('/admin/skills/pending');
};

export const approveSkill = (skillId: string) => {
  return axiosInstance.post(`/admin/skills/${skillId}/approve`);
};

export const rejectSkill = (skillId: string, reason: string) => {
  return axiosInstance.post(`/admin/skills/${skillId}/reject`, { reason });
};

// Platform Stats
export const getPlatformStats = () => {
  return axiosInstance.get('/admin/stats');
};

export const getRevenueStats = (params?: { startDate?: string; endDate?: string }) => {
  return axiosInstance.get('/admin/revenue-stats', { params });
};

export const getUserGrowthStats = () => {
  return axiosInstance.get('/admin/user-growth');
};
