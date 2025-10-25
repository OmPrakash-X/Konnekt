// src/api/review.api.ts
import axiosInstance from './axios.config';

export const createReview = (data: {
  sessionId: string;
  expertId: string;
  rating: number;
  comment: string;
}) => {
  return axiosInstance.post('/reviews/create', data);
};

export const getReviewsByExpert = (expertId: string, params?: {
  page?: number;
  limit?: number;
}) => {
  return axiosInstance.get(`/reviews/expert/${expertId}`, { params });
};

export const getReviewsByUser = (userId: string) => {
  return axiosInstance.get(`/reviews/user/${userId}`);
};

export const getMyReviews = () => {
  return axiosInstance.get('/reviews/my-reviews');
};

export const updateReview = (reviewId: string, data: {
  rating?: number;
  comment?: string;
}) => {
  return axiosInstance.put(`/reviews/${reviewId}`, data);
};

export const deleteReview = (reviewId: string) => {
  return axiosInstance.delete(`/reviews/${reviewId}`);
};

export const markReviewHelpful = (reviewId: string) => {
  return axiosInstance.post(`/reviews/${reviewId}/helpful`);
};
