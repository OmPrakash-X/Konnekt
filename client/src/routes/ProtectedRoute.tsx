// ProtectedRoute.tsx
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, user, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ WAIT for auth check to complete
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ✅ Only redirect AFTER loading is complete
  if (!isAuthenticated || !user) {
    console.log('❌ Not authenticated, redirecting to login');
    navigate('/login', { 
      replace: true, 
      state: { from: location.pathname } 
    });
    return null;
  }

  console.log('✅ Authenticated, rendering protected content');
  return <Outlet />;
};

export default ProtectedRoute;
