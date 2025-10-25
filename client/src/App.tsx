import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { loadUser } from './redux/features/authSlice';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isChecking, setIsChecking] = useState(true);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      console.log('🔍 App: Checking authentication...');
      console.log('🍪 Cookie exists:', document.cookie.includes('token'));

      try {
        const result = await dispatch(loadUser()).unwrap();
        console.log('✅ App: User loaded:', result);
      } catch (error) {
        console.log('❌ App: Not authenticated:', error);
      } finally {
        setIsChecking(false);
        console.log('✅ App: Auth check complete');
      }
    };

    checkAuth();
  }, [dispatch]);

  if (isChecking) {
    console.log('⏳ App: Showing loading screen');
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  console.log('📱 App: Rendering routes', { isAuthenticated, hasUser: !!user });

  return (
    <>
      <Toaster
        position="top-right"
        richColors
        expand={true}
        theme="dark"
      />
      <div className="min-h-screen flex flex-col">
        <AppRoutes />
      </div>
    </>
  );
};

export default App;
