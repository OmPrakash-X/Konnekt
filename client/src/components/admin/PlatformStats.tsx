// PlatformStats.tsx
import React from 'react';
import { Users, BookOpen, Calendar, DollarSign, TrendingUp, Award } from 'lucide-react';
import Card from '../common/Card';

interface PlatformStatsProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    totalExperts: number;
    totalSkills: number;
    totalSessions: number;
    completedSessions: number;
    totalRevenue: number;
    totalBadges: number;
    userGrowth: number;
    sessionGrowth: number;
  };
}

const PlatformStats: React.FC<PlatformStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      subtitle: `${stats.activeUsers} active`,
      icon: Users,
      color: 'bg-blue-500',
      change: `+${stats.userGrowth}%`,
    },
    {
      title: 'Total Experts',
      value: stats.totalExperts.toLocaleString(),
      icon: Award,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Skills',
      value: stats.totalSkills.toLocaleString(),
      icon: BookOpen,
      color: 'bg-green-500',
    },
    {
      title: 'Total Sessions',
      value: stats.totalSessions.toLocaleString(),
      subtitle: `${stats.completedSessions} completed`,
      icon: Calendar,
      color: 'bg-orange-500',
      change: `+${stats.sessionGrowth}%`,
    },
    {
      title: 'Platform Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-[#32b8c6]',
    },
    {
      title: 'Badges Issued',
      value: stats.totalBadges.toLocaleString(),
      icon: Award,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {stat.subtitle && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {stat.subtitle}
                  </p>
                )}
                {stat.change && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                    <TrendingUp className="w-3 h-3 inline" /> {stat.change}
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

export default PlatformStats;
