import axiosInstance from './axios.config';

export const getMyTransactions = (params?: {
  type?: 'credit' | 'debit';
  page?: number;
  limit?: number;
}) => {
  return axiosInstance.get('/transaction/my-transactions', { params });
};

export const getWalletBalance = () => {
  return axiosInstance.get('/transaction/wallet-balance');
};

export const addCredits = (data: { amount: number; paymentMethod: string }) => {
  return axiosInstance.post('/transaction/add-credits', data);
};

export const withdrawCredits = (data: { amount: number; bankDetails: any }) => {
  return axiosInstance.post('/transaction/withdraw', data);
};

export const getTransactionById = (transactionId: string) => {
  return axiosInstance.get(`/transaction/${transactionId}`);
};

export const getEarningsStats = () => {
  return axiosInstance.get('/transaction/earnings-stats');
};
