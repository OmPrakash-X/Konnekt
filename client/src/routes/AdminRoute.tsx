import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const AdminRoute: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  console.log('AdminRoute:', { 
    isAuthenticated, 
    hasUser: !!user, 
    role: user?.role 
  });

  if (!isAuthenticated || !user) {
    console.log('❌ Not authenticated - redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    console.log('❌ Not admin - role is:', user.role);
    return <Navigate to="/unauthorized" replace />;
  }

  console.log('✅ Admin access granted');
  return <Outlet />;
};

export default AdminRoute;
