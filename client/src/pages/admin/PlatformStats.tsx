import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getPlatformStats } from '../../redux/features/adminSlice';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';

const PlatformStatsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats, loading } = useAppSelector((state) => state.admin);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    dispatch(getPlatformStats());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-black">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const quickStats = [
    {
      title: 'User Growth',
      value: `+${stats?.userGrowth || 0}%`,
      icon: TrendingUp,
      linear: 'from-green-500 to-emerald-500',
      iconColor: 'text-green-400',
    },
    {
      title: 'Session Growth',
      value: `+${stats?.sessionGrowth || 0}%`,
      icon: BarChart3,
      linear: 'from-blue-500 to-cyan-500',
      iconColor: 'text-blue-400',
    },
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      linear: 'from-[#32b8c6] to-purple-500',
      iconColor: 'text-[#32b8c6]',
    },
    {
      title: 'Active Users',
      value: stats?.activeUsers?.toLocaleString() || 0,
      icon: Users,
      linear: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-400',
    },
  ];

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
              Platform Analytics
            </h1>
            <p className="text-gray-400">
              Detailed statistics and insights
            </p>
          </div>
          
          {/* Time Range Filter */}
          <div className="flex gap-2">
            {(['week', 'month', 'year'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  timeRange === range
                    ? 'bg-linear-to-r from-[#32b8c6] to-purple-500 text-white shadow-lg shadow-[#32b8c6]/25'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#32b8c6]/10"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-linear-to-br ${stat.linear} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                
                <div className="relative">
                  {/* Icon and Title */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                      {stat.title}
                    </span>
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>

                  {/* Value */}
                  <p className="text-3xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Analytics Section */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            Detailed Analytics
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* User Metrics */}
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">User Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Users</span>
                  <span className="text-white font-medium">{stats?.totalUsers?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Active Users</span>
                  <span className="text-white font-medium">{stats?.activeUsers?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Experts</span>
                  <span className="text-white font-medium">{stats?.totalExperts?.toLocaleString() || 0}</span>
                </div>
              </div>
            </div>

            {/* Session Metrics */}
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Session Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Sessions</span>
                  <span className="text-white font-medium">{stats?.totalSessions?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Completed</span>
                  <span className="text-white font-medium">{stats?.completedSessions?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Active Sessions</span>
                  <span className="text-white font-medium">{stats?.activeSessions?.toLocaleString() || 0}</span>
                </div>
              </div>
            </div>

            {/* Platform Metrics */}
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Platform Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Skills</span>
                  <span className="text-white font-medium">{stats?.totalSkills?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Badges</span>
                  <span className="text-white font-medium">{stats?.totalBadges?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Pending Verifications</span>
                  <span className="text-white font-medium">{stats?.pendingVerifications?.toLocaleString() || 0}</span>
                </div>
              </div>
            </div>

            {/* Revenue Metrics */}
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Revenue Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Revenue</span>
                  <span className="text-white font-medium">${stats?.totalRevenue?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">New Signups Today</span>
                  <span className="text-white font-medium">{stats?.newSignupsToday?.toLocaleString() || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background linear Effects */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#32b8c6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default PlatformStatsPage;
