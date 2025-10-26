import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, user, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('🔒 ProtectedRoute check:', { isAuthenticated, hasUser: !!user, loading });
    
    // Only redirect if auth check is complete and user is not authenticated
    if (!loading && (!isAuthenticated || !user)) {
      console.log('❌ Not authenticated, redirecting to login');
      navigate('/login', { 
        replace: true, 
        state: { from: location.pathname } 
      });
    }
  }, [isAuthenticated, user, loading, navigate, location.pathname]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Only render outlet if authenticated
  if (!isAuthenticated || !user) {
    return null; // Return null while redirecting
  }

  console.log('✅ Authenticated, rendering protected content');
  return <Outlet />;
};

export default ProtectedRoute;
