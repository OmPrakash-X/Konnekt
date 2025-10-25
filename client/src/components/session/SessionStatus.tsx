// SessionStatus.tsx
import React from 'react';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

interface SessionStatusProps {
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  size?: 'sm' | 'md' | 'lg';
}

const SessionStatus: React.FC<SessionStatusProps> = ({ status, size = 'md' }) => {
  const config = {
    upcoming: {
      icon: Clock,
      label: 'Upcoming',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/20',
    },
    'in-progress': {
      icon: AlertCircle,
      label: 'In Progress',
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-100 dark:bg-orange-900/20',
    },
    completed: {
      icon: CheckCircle,
      label: 'Completed',
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/20',
    },
    cancelled: {
      icon: XCircle,
      label: 'Cancelled',
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-100 dark:bg-red-900/20',
    },
  };

  const { icon: Icon, label, color, bg } = config[status];

  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-full font-medium ${sizes[size]} ${bg} ${color}`}>
      <Icon className={iconSizes[size]} />
      {label}
    </span>
  );
};

export default SessionStatus;
