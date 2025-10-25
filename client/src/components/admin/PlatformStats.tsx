import React from 'react';
import {
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
} from 'lucide-react';

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
      linear: 'from-[#32b8c6] to-[#29a4b2]',
      change: `+${stats.userGrowth || 0}%`,
      iconBg: 'from-[#32b8c6] to-purple-500',
    },
    {
      title: 'Total Experts',
      value: stats.totalExperts?.toLocaleString() || '0',
      icon: Award,
      linear: 'from-purple-500 to-purple-600',
      iconBg: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Total Skills',
      value: stats.totalSkills?.toLocaleString() || '0',
      icon: BookOpen,
      linear: 'from-green-500 to-green-600',
      iconBg: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Total Sessions',
      value: stats.totalSessions?.toLocaleString() || '0',
      subtitle: `${stats.completedSessions || 0} completed`,
      icon: Calendar,
      linear: 'from-orange-500 to-orange-600',
      change: `+${stats.sessionGrowth || 0}%`,
      iconBg: 'from-orange-500 to-red-500',
    },
    {
      title: 'Platform Revenue',
      value: `$${stats.totalRevenue?.toLocaleString() || '0'}`,
      icon: DollarSign,
      linear: 'from-[#32b8c6] to-[#21748d]',
      iconBg: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Badges Issued',
      value: stats.totalBadges?.toLocaleString() || '0',
      icon: Award,
      linear: 'from-yellow-500 to-yellow-600',
      iconBg: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="group relative overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#32b8c6]/10"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-linear-to-br from-[#32b8c6]/0 to-purple-500/0 group-hover:from-[#32b8c6]/5 group-hover:to-purple-500/5 transition-all duration-300" />
            
            <div className="relative flex items-center justify-between">
              {/* Stats Content */}
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-2 font-medium uppercase tracking-wider">
                  {stat.title}
                </p>
                <p className="text-4xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </p>
                
                {stat.subtitle && (
                  <p className="text-sm text-gray-500 mt-2">
                    {stat.subtitle}
                  </p>
                )}
                
                {stat.change && (
                  <div className="flex items-center gap-1 mt-3 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-lg w-fit">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-sm font-medium text-green-400">
                      {stat.change}
                    </span>
                  </div>
                )}
              </div>

              {/* Icon with linear */}
              <div className="relative group/icon">
                {/* Glow background */}
                <div className={`absolute inset-0 bg-linear-to-br ${stat.iconBg} rounded-xl blur-xl opacity-20 group-hover/icon:opacity-40 transition-opacity duration-300`} />
                
                {/* Icon container */}
                <div className={`relative p-4 bg-linear-to-br ${stat.iconBg} rounded-xl shadow-lg group-hover/icon:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlatformStats;
