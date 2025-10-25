import axiosInstance from './axios.config';

export const getAllSkills = (params?: {
  category?: string;
  level?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return axiosInstance.get('/skill/all', { params });
};

export const getSkillById = (skillId: string) => {
  return axiosInstance.get(`/skill/${skillId}`);
};

export const createSkill = (data: {
  name: string;
  category: string;
  description: string;
  level: string;
  creditsPerHour: number;
}) => {
  return axiosInstance.post('/skill/create', data);
};

export const updateSkill = (skillId: string, data: any) => {
  return axiosInstance.put(`/skill/${skillId}`, data);
};

export const deleteSkill = (skillId: string) => {
  return axiosInstance.delete(`/skill/${skillId}`);
};

export const getMySkills = () => {
  return axiosInstance.get('/skill/my/skills');
};

export const endorseSkill = (skillId: string, data: { note?: string }) => {
  return axiosInstance.post(`/skill/${skillId}/endorse`, data);
};

export const getSkillsByCategory = (category: string) => {
  return axiosInstance.get(`/skill/category/${category}`);
};

export const searchSkills = (query: string) => {
  return axiosInstance.get(`/skill/all?search=${query}`);
};
