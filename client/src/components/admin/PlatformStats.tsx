import React from 'react';
import {
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
} from 'lucide-react';
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
      value: stats.totalUsers?.toLocaleString() || '0',
      subtitle: `${stats.activeUsers || 0} active`,
      icon: Users,
      gradient: 'from-[#32b8c6] to-[#29a4b2]',
      change: `+${stats.userGrowth || 0}%`,
    },
    {
      title: 'Total Experts',
      value: stats.totalExperts?.toLocaleString() || '0',
      icon: Award,
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Total Skills',
      value: stats.totalSkills?.toLocaleString() || '0',
      icon: BookOpen,
      gradient: 'from-green-500 to-green-600',
    },
    {
      title: 'Total Sessions',
      value: stats.totalSessions?.toLocaleString() || '0',
      subtitle: `${stats.completedSessions || 0} completed`,
      icon: Calendar,
      gradient: 'from-orange-500 to-orange-600',
      change: `+${stats.sessionGrowth || 0}%`,
    },
    {
      title: 'Platform Revenue',
      value: `$${stats.totalRevenue?.toLocaleString() || '0'}`,
      icon: DollarSign,
      gradient: 'from-[#32b8c6] to-[#21748d]',
    },
    {
      title: 'Badges Issued',
      value: stats.totalBadges?.toLocaleString() || '0',
      icon: Award,
      gradient: 'from-yellow-500 to-yellow-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
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
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </p>
                )}
              </div>
              <div
                className={`p-4 bg-linear-to-br ${stat.gradient} rounded-xl shadow-lg`}
              >
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
