import React from 'react';
import { Calendar, Clock, Video, MapPin } from 'lucide-react';
import Avatar from '../common/Avatar';

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
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Upcoming Sessions</h3>
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-400">No upcoming sessions</p>
          <p className="text-sm text-gray-500 mt-2">Book a session to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Upcoming Sessions</h3>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-300 group"
          >
            {/* Avatar */}
            <Avatar src={session.expert.avatar} fallback={session.expert.name} size="md" />

            {/* Session Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-white mb-1 truncate">{session.title}</h4>
              <p className="text-sm text-gray-400 mb-2">with {session.expert.name}</p>
              
              <div className="flex items-center gap-3 text-sm text-gray-500">
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

            {/* Join Button */}
            <button
              onClick={() => onJoin(session.id)}
              className="px-4 py-2 bg-linear-to-r from-[#32b8c6] to-[#2a9fac] text-white rounded-lg font-medium shadow-lg shadow-[#32b8c6]/25 hover:shadow-xl hover:shadow-[#32b8c6]/40 transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSessions;
