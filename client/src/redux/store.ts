import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import themeReducer from './features/themeSlice';
import userReducer from './features/userSlice';
import skillReducer from './features/skillSlice';
import sessionReducer from './features/sessionSlice';
import reviewReducer from './features/reviewSlice';
import badgeReducer from './features/badgeSlice';
import transactionReducer from './features/transactionSlice';
import adminReducer from './features/adminSlice'; // ADD THIS

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    user: userReducer,
    skill: skillReducer,
    session: sessionReducer,
    review: reviewReducer,
    badge: badgeReducer,
    transaction: transactionReducer,
    admin: adminReducer, // ADD THIS
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
