import axiosInstance from './axios.config';

export const createReview = (data: {
  sessionId: string;
  expertId: string;
  rating: number;
  comment: string;
}) => {
  return axiosInstance.post('/review', data);
};

export const getReviewsByExpert = (expertId: string, params?: {
  page?: number;
  limit?: number;
}) => {
  return axiosInstance.get(`/review/expert/${expertId}`, { params });
};

export const getReviewsByUser = (userId: string) => {
  return axiosInstance.get(`/review/user/${userId}`);
};

export const getMyReviews = () => {
  return axiosInstance.get('/review/my-reviews');
};

export const updateReview = (reviewId: string, data: {
  rating?: number;
  comment?: string;
}) => {
  return axiosInstance.put(`/review/${reviewId}`, data);
};

export const deleteReview = (reviewId: string) => {
  return axiosInstance.delete(`/review/${reviewId}`);
};

export const markReviewHelpful = (reviewId: string) => {
  return axiosInstance.post(`/review/${reviewId}/helpful`);
};
