export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  WALLET: '/wallet',
} as const;

export const ROLES = {
  USER: 'user',
  EXPERT: 'expert',
  ADMIN: 'admin',
} as const;

export const SESSION_STATUS = {
  UPCOMING: 'upcoming',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export const SKILL_CATEGORIES = [
  'Programming',
  'Design',
  'Business',
  'Marketing',
  'Music',
  'Language',
] as const;
