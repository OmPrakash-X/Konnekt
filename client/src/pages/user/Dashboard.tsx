import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getMyProfile } from '../../redux/features/userSlice';
import { getUpcomingSessions } from '../../redux/features/sessionSlice';
import { getMyBadges } from '../../redux/features/badgeSlice';
import { joinSession } from '../../redux/features/sessionSlice';
import DashboardStats from '../../components/dashboard/DashboardStats';
import UpcomingSessions from '../../components/dashboard/UpcomingSessions';
import WalletCard from '../../components/dashboard/WalletCard';
import QuickActions from '../../components/dashboard/QuickActions';
import RecentActivity from '../../components/dashboard/RecentActivity';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { profile, loading: userLoading } = useAppSelector((state) => state.user);
  const { upcomingSessions } = useAppSelector((state) => state.session);

  useEffect(() => {
    dispatch(getMyProfile());
    dispatch(getUpcomingSessions());
    dispatch(getMyBadges());
  }, [dispatch]);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'book-session':
        navigate('/sessions/book');
        break;
      case 'add-skill':
        navigate('/skills/add');
        break;
      case 'view-profile':
        navigate('/profile');
        break;
      case 'add-credits':
        navigate('/wallet');
        break;
      default:
        break;
    }
  };

  const handleAddCredits = () => {
    navigate('/wallet');
  };

  const handleJoinSession = async (sessionId: string) => {
    await dispatch(joinSession(sessionId));
    navigate(`/sessions/${sessionId}`);
  };

  // Activities matching Activity interface
  const activities = [
    {
      id: '1',
      type: 'session' as const,
      title: 'Session Completed',
      description: 'React Development with John Doe',
      time: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'badge' as const,
      title: 'New Badge Earned',
      description: 'Quick Learner badge',
      time: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Container size="full">
      <div className="py-8 space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {profile?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your account today
          </p>
        </div>

        {/* Stats */}
        <DashboardStats
          stats={{
            totalSessions: profile?.stats?.totalSessions || 0,
            completedSessions: profile?.stats?.completedSessions || 0,
            upcomingSessions: upcomingSessions.length,
            totalHours: profile?.stats?.totalHours || 0,
            averageRating: profile?.rating || 0,
            totalReviews: profile?.totalReviews || 0,
            badgesEarned: profile?.badges?.length || 0,
            skillsLearned: profile?.stats?.skillsLearned || 0,
            creditsEarned: profile?.stats?.creditsEarned || 0,
            creditsSpent: profile?.stats?.creditsSpent || 0,
          }}
        />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <UpcomingSessions
              sessions={upcomingSessions.map((session) => ({
                ...session,
                time: session.startTime,
              }))}
              onJoin={handleJoinSession}
            />
            <RecentActivity activities={activities} />
          </div>

          <div className="space-y-8">
            <WalletCard
              balance={profile?.stats?.credits || 0}
              earned={profile?.stats?.creditsEarned || 0}
              spent={profile?.stats?.creditsSpent || 0}
              onAddCredits={handleAddCredits}
            />
            <QuickActions onAction={handleQuickAction} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
