import React from 'react';
import { Search, Calendar, BookOpen, Award, Users } from 'lucide-react';
import Card from '../common/Card';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => {
  const actions = [
    {
      id: 'explore-skills',
      label: 'Explore Skills',
      icon: Search,
      color: 'bg-blue-500',
    },
    {
      id: 'book-session',
      label: 'Book Session',
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      id: 'add-skill',
      label: 'Add My Skill',
      icon: BookOpen,
      color: 'bg-purple-500',
    },
    {
      id: 'find-experts',
      label: 'Find Experts',
      icon: Users,
      color: 'bg-[#32b8c6]',
    },
    {
      id: 'view-badges',
      label: 'My Badges',
      icon: Award,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onAction(action.id)}
              className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <div className={`p-3 ${action.color} rounded-lg mb-2`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickActions;
