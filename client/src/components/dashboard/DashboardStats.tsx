import React from 'react';
import { Calendar, TrendingUp, Award, DollarSign, Users, BookOpen } from 'lucide-react';
import Card from '../common/Card';

interface DashboardStatsProps {
  stats: {
    totalSessions: number;
    completedSessions: number;
    upcomingSessions: number;
    totalHours: number;
    averageRating: number;
    totalReviews: number;
    badgesEarned: number;
    skillsLearned: number;
    creditsEarned?: number;
    creditsSpent?: number;
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Sessions',
      value: stats.totalSessions,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Completed',
      value: stats.completedSessions,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Upcoming',
      value: stats.upcomingSessions,
      icon: Calendar,
      color: 'bg-orange-500',
    },
    {
      title: 'Total Hours',
      value: stats.totalHours,
      icon: BookOpen,
      color: 'bg-purple-500',
    },
    {
      title: 'Average Rating',
      value: stats.averageRating.toFixed(1),
      icon: Award,
      color: 'bg-yellow-500',
    },
    {
      title: 'Badges Earned',
      value: stats.badgesEarned,
      icon: Award,
      color: 'bg-pink-500',
    },
    {
      title: 'Skills Learned',
      value: stats.skillsLearned,
      icon: BookOpen,
      color: 'bg-[#32b8c6]',
    },
    {
      title: 'Credits Balance',
      value: (stats.creditsEarned || 0) - (stats.creditsSpent || 0),
      icon: DollarSign,
      color: 'bg-indigo-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                {stat.change && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                    {stat.change} from last month
                  </p>
                )}
              </div>
              <div className={`p-4 ${stat.color} rounded-xl`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
