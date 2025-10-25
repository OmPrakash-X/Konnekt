export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  icon?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  creditsPerHour: number;
  totalExperts: number;
  totalLearners: number;
  averageRating: number;
  topExperts?: Array<{ name: string; avatar?: string }>;
}

export interface CreateSkillData {
  name: string;
  category: string;
  description: string;
  level: string;
  creditsPerHour: number;
}
