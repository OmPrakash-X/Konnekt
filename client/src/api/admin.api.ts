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

export const updateUserRole = (userId: string, role: string) => {
  return axiosInstance.put(`/admin/user/${userId}/role`, { role });
};

export const suspendUser = (userId: string) => {
  return axiosInstance.put(`/admin/user/${userId}/suspend`);
};

export const unsuspendUser = (userId: string) => {
  return axiosInstance.put(`/admin/user/${userId}/unsuspend`);
};

export const deleteUser = (userId: string) => {
  return axiosInstance.delete(`/admin/user/${userId}`);
};

// Skill Verification
export const getPendingSkills = () => {
  return axiosInstance.get('/admin/skills/pending');
};

export const verifySkill = (skillId: string, verified: boolean) => {
  return axiosInstance.put(`/admin/skill/${skillId}/verify`, { verified });
};

// Badge Management
export const awardBadge = (data: { userId: string; badgeId: string }) => {
  return axiosInstance.post('/admin/badge/award', data);
};

// Platform Stats
export const getPlatformStats = () => {
  return axiosInstance.get('/admin/stats');
};
