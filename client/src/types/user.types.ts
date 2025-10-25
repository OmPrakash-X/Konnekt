export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  role: string;
  joinedDate: string;
  rating?: number;
  totalReviews?: number;
  totalSessions?: number;
  expertIn?: string[];
  badges?: Array<{ id: string; name: string; icon: string }>;
  stats?: {
    totalSessions: number;
    completedSessions: number;
    totalHours: number;
    credits: number;
    creditsEarned: number;
    creditsSpent: number;
    skillsLearned: number;
  };
}
