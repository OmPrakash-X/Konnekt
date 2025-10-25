import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getSessionHistory } from '../../redux/features/sessionSlice';
import SessionList from '../../components/session/SessionList';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';

const SessionHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sessions, loading } = useAppSelector((state) => state.session);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    loadHistory();
  }, [page]);

  const loadHistory = () => {
    dispatch(getSessionHistory({ page, limit }));
  };

  const handleLoadMore = () => {
    setPage(page + 1);
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
            Session History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View all your past sessions
          </p>
        </div>

        <SessionList sessions={sessions} loading={loading} />

        {sessions.length >= page * limit && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-6 py-3 bg-[#32b8c6] text-white rounded-lg hover:bg-[#2a9fac] transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default SessionHistory;
