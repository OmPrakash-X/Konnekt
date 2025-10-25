import React from 'react';
import { Search, Calendar, BookOpen, Award, Users } from 'lucide-react';


interface QuickActionsProps {
  onAction: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => {
  const actions = [
    {
      id: 'explore-skills',
      label: 'Explore Skills',
      icon: Search,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'book-session',
      label: 'Book Session',
      icon: Calendar,
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'add-skill',
      label: 'Add My Skill',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'find-experts',
      label: 'Find Experts',
      icon: Users,
      color: 'from-[#32b8c6] to-[#2a9fac]',
    },
    {
      id: 'view-badges',
      label: 'My Badges',
      icon: Award,
      color: 'from-yellow-500 to-yellow-600',
    },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onAction(action.id)}
              className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-4 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                <div className={`p-3 bg-linear-to-br ${action.color} rounded-lg shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-white">
                  {action.label}
                </span>
              </div>
              {/* Hover linear overlay */}
              <div className={`absolute inset-0 bg-linear-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
