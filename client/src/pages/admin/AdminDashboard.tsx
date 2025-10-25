import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getPlatformStats } from '../../redux/features/adminSlice';
import PlatformStats from '../../components/admin/PlatformStats';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Link } from 'react-router-dom';
import { Shield, UserPlus, Activity, ArrowRight } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats, loading } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getPlatformStats());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const quickStats = [
    {
      title: 'Pending Verifications',
      value: stats?.pendingVerifications || 0,
      icon: Shield,
      linear: 'from-[#32b8c6] to-purple-500',
      link: '/admin/verify-skills',
      linkText: 'Review now',
    },
    {
      title: 'New Signups Today',
      value: stats?.newSignupsToday || 0,
      icon: UserPlus,
      linear: 'from-yellow-500 to-orange-500',
      link: '/admin/users',
      linkText: 'View users',
    },
    {
      title: 'Active Sessions',
      value: stats?.activeSessions || 0,
      icon: Activity,
      linear: 'from-green-500 to-emerald-500',
      link: '/admin/sessions',
      linkText: 'View sessions',
    },
  ];

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">
            Platform overview and management
          </p>
        </div>

        {/* Platform Stats */}
        {stats && (
          <div className="mb-8">
            <PlatformStats stats={stats} />
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Link
                  key={index}
                  to={stat.link}
                  className="group relative p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#32b8c6]/10"
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-linear-to-br ${stat.linear} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className="mb-4">
                      <div className={`inline-flex p-3 bg-linear-to-br ${stat.linear} rounded-xl shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {stat.title}
                    </h3>

                    {/* Value */}
                    <p className="text-4xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                      {stat.value}
                    </p>

                    {/* Link */}
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                      <span>{stat.linkText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Section (Optional) */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="text-center py-12">
            <p className="text-gray-400">Activity feed coming soon...</p>
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

export default AdminDashboard;
