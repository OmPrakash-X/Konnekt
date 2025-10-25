import React from 'react';
import { TrendingUp, Calendar, Award, Star, Users, Clock } from 'lucide-react';
import Card from '../common/Card';

interface UserStatsProps {
  stats: {
    totalSessions: number;
    completedSessions: number;
    upcomingSessions: number;
    totalHours: number;
    averageRating: number;
    totalReviews: number;
    badgesEarned: number;
    skillsLearned: number;
  };
}

const UserStats: React.FC<UserStatsProps> = ({ stats }) => {
  const statItems = [
    {
      icon: Calendar,
      label: 'Total Sessions',
      value: stats.totalSessions,
      color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    },
    {
      icon: TrendingUp,
      label: 'Completed',
      value: stats.completedSessions,
      color: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    },
    {
      icon: Clock,
      label: 'Upcoming',
      value: stats.upcomingSessions,
      color: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: stats.averageRating.toFixed(1),
      color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    },
    {
      icon: Users,
      label: 'Total Reviews',
      value: stats.totalReviews,
      color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    },
    {
      icon: Award,
      label: 'Badges Earned',
      value: stats.badgesEarned,
      color: 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400',
    },
    {
      icon: TrendingUp,
      label: 'Skills Learned',
      value: stats.skillsLearned,
      color: 'bg-[#32b8c6]/10 text-[#32b8c6]',
    },
    {
      icon: Clock,
      label: 'Total Hours',
      value: stats.totalHours,
      color: 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} padding="md">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${item.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {item.value}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.label}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default UserStats;
