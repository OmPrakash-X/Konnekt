import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getMySessions, cancelSession, joinSession } from '../../redux/features/sessionSlice';
import SessionList from '../../components/session/SessionList';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';

const MySessions: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sessions, loading } = useAppSelector((state) => state.session);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  useEffect(() => {
    loadSessions();
  }, [activeTab]);

  const loadSessions = () => {
    dispatch(getMySessions({ status: activeTab }));
  };

  const handleJoin = async (sessionId: string) => {
    await dispatch(joinSession(sessionId));
  };

  const handleCancel = async (sessionId: string) => {
    if (confirm('Are you sure you want to cancel this session?')) {
      await dispatch(cancelSession({ sessionId }));
      loadSessions();
    }
  };

  const handleReschedule = (sessionId: string) => {
    window.location.href = `/sessions/${sessionId}/reschedule`;
  };

  if (loading && sessions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Container>
      <div className="py-12 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Sessions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your upcoming and past sessions
          </p>
        </div>

        {/* Simple Tab Buttons */}
        <div className="flex gap-2">
          {(['upcoming', 'completed', 'cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-[#32b8c6] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <SessionList
          sessions={sessions}
          loading={loading}
          onJoin={handleJoin}
          onCancel={activeTab === 'upcoming' ? handleCancel : undefined}
          onReschedule={activeTab === 'upcoming' ? handleReschedule : undefined}
        />
      </div>
    </Container>
  );
};

export default MySessions;
