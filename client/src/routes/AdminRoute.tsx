import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const AdminRoute: React.FC = () => {
  const { isAuthenticated, user, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('👑 AdminRoute check:', { isAuthenticated, role: user?.role, loading });
    
    if (!loading) {
      if (!isAuthenticated || !user) {
        console.log('❌ Not authenticated, redirecting to login');
        navigate('/login', { replace: true, state: { from: location.pathname } });
      } else if (user.role !== 'admin') {
        console.log('❌ Not admin, redirecting to unauthorized');
        navigate('/unauthorized', { replace: true });
      }
    }
  }, [isAuthenticated, user, loading, navigate, location.pathname]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Check authorization
  if (!isAuthenticated || !user || user.role !== 'admin') {
    return null; // Return null while redirecting
  }

  console.log('✅ Admin authenticated, rendering admin content');
  return <Outlet />;
};

export default AdminRoute;
