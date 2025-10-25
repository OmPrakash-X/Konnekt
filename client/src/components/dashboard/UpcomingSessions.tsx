import React from 'react';
import { Calendar, Clock, Video, MapPin } from 'lucide-react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import Button from '../common/Button';

interface Session {
  id: string;
  title: string;
  expert: {
    name: string;
    avatar?: string;
  };
  date: string;
  time: string;
  mode: 'online' | 'offline';
  location?: string;
}

interface UpcomingSessionsProps {
  sessions: Session[];
  onJoin: (sessionId: string) => void;
}

const UpcomingSessions: React.FC<UpcomingSessionsProps> = ({ sessions, onJoin }) => {
  if (sessions.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upcoming Sessions
        </h3>
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">No upcoming sessions</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Upcoming Sessions
      </h3>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <Avatar src={session.expert.avatar} fallback={session.expert.name} size="md" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white">
                {session.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                with {session.expert.name}
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {session.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {session.time}
                </span>
                {session.mode === 'online' ? (
                  <Video className="w-3 h-3 text-[#32b8c6]" />
                ) : (
                  <MapPin className="w-3 h-3 text-[#32b8c6]" />
                )}
              </div>
            </div>
            <Button size="sm" onClick={() => onJoin(session.id)}>
              Join
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingSessions;
