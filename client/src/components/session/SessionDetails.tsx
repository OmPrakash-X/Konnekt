// SessionDetails.tsx
import React from 'react';
import { Calendar, Clock, Video, MapPin, User, DollarSign, MessageSquare } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Avatar from '../common/Avatar';
import Button from '../common/Button';

interface SessionDetailsProps {
  session: {
    id: string;
    title: string;
    description?: string;
    expert: { name: string; avatar?: string };
    learner: { name: string; avatar?: string };
    date: string;
    startTime: string;
    endTime: string;
    duration: number;
    mode: 'online' | 'offline';
    meetingLink?: string;
    location?: string;
    status: string;
    credits: number;
    notes?: string;
  };
  isExpert?: boolean;
}

const SessionDetails: React.FC<SessionDetailsProps> = ({ session, isExpert }) => {
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {session.title}
            </h1>
            {session.description && (
              <p className="text-gray-600 dark:text-gray-400">{session.description}</p>
            )}
          </div>
          <Badge variant="info">{session.status}</Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-[#32b8c6]" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isExpert ? 'Learner' : 'Expert'}
                </p>
                <div className="flex items-center gap-2">
                  <Avatar
                    src={isExpert ? session.learner.avatar : session.expert.avatar}
                    fallback={isExpert ? session.learner.name : session.expert.name}
                    size="xs"
                  />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {isExpert ? session.learner.name : session.expert.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#32b8c6]" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(session.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#32b8c6]" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {session.startTime} - {session.endTime}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {session.mode === 'online' ? (
                <>
                  <Video className="w-5 h-5 text-[#32b8c6]" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mode</p>
                    <p className="font-medium text-gray-900 dark:text-white">Online</p>
                    {session.meetingLink && (
                      <a
                        href={session.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#32b8c6] hover:underline"
                      >
                        Join Meeting
                      </a>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <MapPin className="w-5 h-5 text-[#32b8c6]" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {session.location}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-[#32b8c6]" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Credits</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {session.credits}
                </p>
              </div>
            </div>
          </div>
        </div>

        {session.notes && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-[#32b8c6] mt-0.5" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Notes</p>
                <p className="text-gray-900 dark:text-white">{session.notes}</p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SessionDetails;
