import React from 'react';
import { Calendar, TrendingUp, Award, DollarSign,  BookOpen, Clock } from 'lucide-react';

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
      linear: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Completed',
      value: stats.completedSessions,
      icon: TrendingUp,
      linear: 'from-green-500 to-green-600',
    },
    {
      title: 'Upcoming',
      value: stats.upcomingSessions,
      icon: Clock,
      linear: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Total Hours',
      value: stats.totalHours,
      icon: BookOpen,
      linear: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Average Rating',
      value: stats.averageRating.toFixed(1),
      icon: Award,
      linear: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Badges Earned',
      value: stats.badgesEarned,
      icon: Award,
      linear: 'from-pink-500 to-pink-600',
    },
    {
      title: 'Skills Learned',
      value: stats.skillsLearned,
      icon: BookOpen,
      linear: 'from-[#32b8c6] to-[#2a9fac]',
    },
    {
      title: 'Credits Balance',
      value: (stats.creditsEarned || 0) - (stats.creditsSpent || 0),
      icon: DollarSign,
      linear: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="relative bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group"
          >
            {/* linear overlay on hover */}
            <div className={`absolute inset-0 bg-linear-to-br ${stat.linear} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`} />
            
            <div className="relative flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              
              <div className={`p-4 bg-linear-to-br ${stat.linear} rounded-xl shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
