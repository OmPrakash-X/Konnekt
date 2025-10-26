import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { loadUser } from './redux/features/authSlice';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isChecking, setIsChecking] = useState(true);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const hasCheckedAuth = useRef(false); // ✅ Prevent multiple calls

  useEffect(() => {
    // ✅ Only check auth ONCE on mount
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;

    const checkAuth = async () => {
      console.log('🔍 App: Checking authentication...');
      
      // ✅ Check if token exists before calling API
      const hasToken = document.cookie.includes('token');
      console.log('🍪 Has token:', hasToken);

      if (!hasToken) {
        console.log('❌ No token found, skipping loadUser');
        setIsChecking(false);
        return;
      }

      try {
        const result = await dispatch(loadUser()).unwrap();
        console.log('✅ App: User loaded:', result);
      } catch (error) {
        console.log('❌ App: Failed to load user (token invalid/expired)');
        // Don't throw error - just continue as unauthenticated
      } finally {
        setIsChecking(false);
        console.log('✅ App: Auth check complete');
      }
    };

    checkAuth();
  }, []); // ✅ Empty dependency array - only runs once

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