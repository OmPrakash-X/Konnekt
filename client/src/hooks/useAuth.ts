import { useAppSelector } from '../redux/hooks';

export const useAuth = () => {
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);

  return {
    user,
    isAuthenticated,
    loading,
    isAdmin: user?.role === 'admin',
    isExpert: user?.role === 'expert',
    isUser: user?.role === 'user',
    isLearner: user?.role === 'user', 
  };
};
