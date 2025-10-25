import React from 'react';
import { Clock, Calendar, Award, Users, BookOpen } from 'lucide-react';
import Card from '../common/Card';
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
    session: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    badge: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    review: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    skill: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    endorsement: 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400',
  };

  if (activities.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">No recent activity</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          const colorClass = colorMap[activity.type];
          
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${colorClass}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
              {activity.user && (
                <Avatar
                  src={activity.user.avatar}
                  fallback={activity.user.name}
                  size="sm"
                />
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default RecentActivity;
