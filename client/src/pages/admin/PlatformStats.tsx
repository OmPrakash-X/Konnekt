import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getPlatformStats } from '../../redux/features/adminSlice';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import Card from '../../components/common/Card';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';

const PlatformStatsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats, loading } = useAppSelector((state) => state.admin);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    dispatch(getPlatformStats());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <Container size="full">
        <div className="py-8 space-y-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Platform Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Detailed statistics and insights
              </p>
            </div>
            <div className="flex gap-2">
              {(['week', 'month', 'year'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-[#32b8c6] text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card padding="md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  User Growth
                </span>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                +{stats?.userGrowth || 0}%
              </p>
            </Card>

            <Card padding="md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Session Growth
                </span>
                <BarChart3 className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                +{stats?.sessionGrowth || 0}%
              </p>
            </Card>

            <Card padding="md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total Revenue
                </span>
                <DollarSign className="w-5 h-5 text-[#32b8c6]" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ${stats?.totalRevenue?.toLocaleString() || 0}
              </p>
            </Card>

            <Card padding="md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Active Users
                </span>
                <Users className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.activeUsers?.toLocaleString() || 0}
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PlatformStatsPage;
