import axiosInstance from './axios.config';

export const getMySessions = (params?: {
  status?: 'upcoming' | 'completed' | 'cancelled';
  role?: 'learner' | 'expert';
}) => {
  return axiosInstance.get('/session/my-sessions', { params });
};

export const getSessionById = (sessionId: string) => {
  return axiosInstance.get(`/session/${sessionId}`);
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
  return axiosInstance.post('/session/book', data);
};

export const cancelSession = (sessionId: string, reason?: string) => {
  return axiosInstance.post(`/session/${sessionId}/cancel`, { reason });
};

export const rescheduleSession = (
  sessionId: string,
  data: { date: string; startTime: string }
) => {
  return axiosInstance.put(`/session/${sessionId}/reschedule`, data);
};

export const completeSession = (sessionId: string) => {
  return axiosInstance.post(`/session/${sessionId}/complete`);
};

export const getUpcomingSessions = () => {
  return axiosInstance.get('/session/upcoming');
};

export const getSessionHistory = (params?: { page?: number; limit?: number }) => {
  return axiosInstance.get('/session/history', { params });
};

export const joinSession = (sessionId: string) => {
  return axiosInstance.post(`/session/${sessionId}/join`);
};
