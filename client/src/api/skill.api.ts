// src/api/skill.api.ts
import axiosInstance from './axios.config';

export const getAllSkills = (params?: {
  category?: string;
  level?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return axiosInstance.get('/skills/all', { params });
};

export const getSkillById = (skillId: string) => {
  return axiosInstance.get(`/skills/${skillId}`);
};

export const createSkill = (data: {
  name: string;
  category: string;
  description: string;
  level: string;
  creditsPerHour: number;
}) => {
  return axiosInstance.post('/skills/create', data);
};

export const updateSkill = (skillId: string, data: any) => {
  return axiosInstance.put(`/skills/${skillId}`, data);
};

export const deleteSkill = (skillId: string) => {
  return axiosInstance.delete(`/skills/${skillId}`);
};

export const getMySkills = () => {
  return axiosInstance.get('/skills/my/skills');
};

export const endorseSkill = (skillId: string, data?: { note?: string }) => {
  return axiosInstance.post(`/skills/${skillId}/endorse`, data || {});
};

export const getSkillsByCategory = (category: string) => {
  return axiosInstance.get(`/skills/category/${category}`);
};

export const searchSkills = (query: string) => {
  return axiosInstance.get('/skills/all', { params: { search: query } });
};
export const getSkillExperts = (skillId: string) => {
  return axiosInstance.get(`/skills/${skillId}/experts`);
};