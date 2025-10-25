import React from 'react';
import { Clock, Calendar, Award, Users, BookOpen } from 'lucide-react';
import Avatar from '../common/Avatar';

interface Activity {
  id: string;
  type: 'session' | 'badge' | 'review' | 'skill' | 'endorsement';
  title: string;
  description: string;
  time: string;
  user?: {
    name: string;
    avatar?: string;
  };
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const iconMap = {
    session: Calendar,
    badge: Award,
    review: Users,
    skill: BookOpen,
    endorsement: Award,
  };

  const colorMap = {
    session: 'from-blue-500 to-blue-600',
    badge: 'from-yellow-500 to-yellow-600',
    review: 'from-green-500 to-green-600',
    skill: 'from-purple-500 to-purple-600',
    endorsement: 'from-pink-500 to-pink-600',
  };

  const formatTimeAgo = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  if (activities.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-400">No recent activity</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          const colorClass = colorMap[activity.type];

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`p-3 bg-linear-to-br ${colorClass} rounded-lg shadow-lg shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white mb-1">{activity.title}</p>
                <p className="text-sm text-gray-400 line-clamp-2">{activity.description}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimeAgo(activity.time)}</span>
                </div>
              </div>

              {/* User Avatar if present */}
              {activity.user && (
                <div className="shrink-0">
                  <Avatar
                    src={activity.user.avatar}
                    fallback={activity.user.name}
                    size="sm"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
