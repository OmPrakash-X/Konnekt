import React, { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks';
import { loadUser } from './redux/features/authSlice';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <AppRoutes />
    </div>
  );
};

export default App;
