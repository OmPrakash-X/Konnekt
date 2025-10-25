import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getPlatformStats } from '../../redux/features/adminSlice';
import PlatformStats from '../../components/admin/PlatformStats';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats, loading } = useAppSelector((state) => state.admin);

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
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Platform overview and management
            </p>
          </div>

          {stats && <PlatformStats stats={stats} />}

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-linear-to-br from-[#32b8c6]/10 to-[#32b8c6]/5 dark:from-[#32b8c6]/20 dark:to-[#32b8c6]/10 rounded-xl border border-[#32b8c6]/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Pending Verifications
              </h3>
              <p className="text-3xl font-bold text-[#32b8c6] mb-4">
                {stats?.pendingVerifications || 0}
              </p>
              <a
                href="/admin/verify-skills"
                className="text-[#32b8c6] hover:underline"
              >
                Review now →
              </a>
            </div>

            <div className="p-6 bg-linear-to-br from-yellow-500/10 to-yellow-500/5 dark:from-yellow-500/20 dark:to-yellow-500/10 rounded-xl border border-yellow-500/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                New Signups Today
              </h3>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
                {stats?.newSignupsToday || 0}
              </p>
              <a
                href="/admin/users"
                className="text-yellow-600 dark:text-yellow-400 hover:underline"
              >
                View users →
              </a>
            </div>

            <div className="p-6 bg-linear-to-br from-green-500/10 to-green-500/5 dark:from-green-500/20 dark:to-green-500/10 rounded-xl border border-green-500/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Active Sessions
              </h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
                {stats?.activeSessions || 0}
              </p>
              <a
                href="/admin/sessions"
                className="text-green-600 dark:text-green-400 hover:underline"
              >
                View sessions →
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminDashboard;
