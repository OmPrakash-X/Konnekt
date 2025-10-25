import React from 'react';
import { Calendar } from 'lucide-react';
import SessionCard from './SessionCard';
import Spinner from '../common/Spinner';

interface Session {
  id: string;
  title: string;
  expert: {
    name: string;
    avatar?: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  mode: 'online' | 'offline';
  location?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  credits: number;
}

interface SessionListProps {
  sessions: Session[];
  loading?: boolean;
  emptyMessage?: string;
  onJoin?: (sessionId: string) => void;
  onCancel?: (sessionId: string) => void;
  onReschedule?: (sessionId: string) => void;
}

const SessionList: React.FC<SessionListProps> = ({
  sessions,
  loading,
  emptyMessage = 'No sessions found',
  onJoin,
  onCancel,
  onReschedule,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <Calendar className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-600 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          onJoin={onJoin}
          onCancel={onCancel}
          onReschedule={onReschedule}
        />
      ))}
    </div>
  );
};

export default SessionList;
