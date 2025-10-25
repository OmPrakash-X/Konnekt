import React from 'react';
import { Calendar, Clock, Video, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Avatar from '../common/Avatar';
import Button from '../common/Button';

interface SessionCardProps {
  session: {
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
  };
  onJoin?: (sessionId: string) => void;
  onCancel?: (sessionId: string) => void;
  onReschedule?: (sessionId: string) => void;
}

const SessionCard: React.FC<SessionCardProps> = ({
  session,
  onJoin,
  onCancel,
  onReschedule,
}) => {
  const statusConfig = {
    upcoming: {
      icon: AlertCircle,
      variant: 'info' as const,
      label: 'Upcoming',
    },
    completed: {
      icon: CheckCircle,
      variant: 'success' as const,
      label: 'Completed',
    },
    cancelled: {
      icon: XCircle,
      variant: 'error' as const,
      label: 'Cancelled',
    },
  };

  const config = statusConfig[session.status];
  const StatusIcon = config.icon;

  return (
    <Card hover padding="md">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar
            src={session.expert.avatar}
            fallback={session.expert.name}
            size="md"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {session.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              with {session.expert.name}
            </p>
          </div>
        </div>
        <Badge variant={config.variant} icon={<StatusIcon className="w-3 h-3" />}>
          {config.label}
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 text-[#32b8c6]" />
          <span>{new Date(session.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4 text-[#32b8c6]" />
          <span>
            {session.startTime} - {session.endTime} ({session.duration}h)
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          {session.mode === 'online' ? (
            <>
              <Video className="w-4 h-4 text-[#32b8c6]" />
              <span>Online Session</span>
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4 text-[#32b8c6]" />
              <span>{session.location || 'In-person'}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {session.credits} credits
        </span>

        {session.status === 'upcoming' && (
          <div className="flex gap-2">
            {onJoin && (
              <Button size="sm" onClick={() => onJoin(session.id)}>
                Join Session
              </Button>
            )}
            {onReschedule && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onReschedule(session.id)}
              >
                Reschedule
              </Button>
            )}
            {onCancel && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onCancel(session.id)}
              >
                Cancel
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default SessionCard;
