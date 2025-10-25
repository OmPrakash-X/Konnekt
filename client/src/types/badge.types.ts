export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  createdAt: string;
}

export interface UserBadge extends Badge {
  earnedAt: string;
}
