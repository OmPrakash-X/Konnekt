// src/api/session.api.ts
import axiosInstance from './axios.config';

export const getMySessions = (params?: {
  status?: 'upcoming' | 'completed' | 'cancelled';
  role?: 'learner' | 'expert';
}) => {
  return axiosInstance.get('/sessions/my-sessions', { params });
};

export const getSessionById = (sessionId: string) => {
  return axiosInstance.get(`/sessions/${sessionId}`);
};

export const bookSession = (data: {
  expertId: string;
  skillId: string;
  date: string;
  startTime: string;
  duration: number;
  mode: 'online' | 'offline';
  notes?: string;
}) => {
  return axiosInstance.post('/sessions/create', data);
};

export const cancelSession = (sessionId: string, reason?: string) => {
  return axiosInstance.put(`/sessions/${sessionId}/cancel`, { reason });
};

export const rescheduleSession = (
  sessionId: string,
  data: { date: string; startTime: string }
) => {
  return axiosInstance.put(`/sessions/${sessionId}/update`, data);
};

export const completeSession = (sessionId: string) => {
  return axiosInstance.put(`/sessions/${sessionId}/complete`);
};

export const confirmSession = (sessionId: string) => {
  return axiosInstance.put(`/sessions/${sessionId}/confirm`);
};

export const getUpcomingSessions = () => {
  return axiosInstance.get('/sessions/my-sessions', { 
    params: { status: 'upcoming' }
  });
};

export const getSessionHistory = (params?: { page?: number; limit?: number }) => {
  return axiosInstance.get('/sessions/my-sessions', { 
    params: { ...params, status: 'completed' }
  });
};
