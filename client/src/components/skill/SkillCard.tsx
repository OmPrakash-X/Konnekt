import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, BookOpen, Award } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Avatar from '../common/Avatar';

interface SkillCardProps {
  skill: {
    id: string;
    name: string;
    category: string;
    description: string;
    icon?: string;
    totalExperts: number;
    totalLearners: number;
    averageRating: number;
    level?: 'Beginner' | 'Intermediate' | 'Advanced';
    topExperts?: Array<{ name: string; avatar?: string }>;
  };
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const navigate = useNavigate();

  const levelColors = {
    Beginner: 'success',
    Intermediate: 'warning',
    Advanced: 'error',
  } as const;

  return (
    <Card hover padding="md" onClick={() => navigate(`/skills/${skill.id}`)}>
      <div className="flex items-start gap-4 mb-4">
        {/* Icon */}
        <div className="w-14 h-14 flex-shrink-0 bg-gradient-to-br from-[#32b8c6] to-[#2a9fac] rounded-lg flex items-center justify-center text-2xl">
          {skill.icon || '🎯'}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
                {skill.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {skill.category}
              </p>
            </div>
            {skill.level && (
              <Badge variant={levelColors[skill.level]} size="sm">
                {skill.level}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {skill.description}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
        <div className="flex items-center gap-1">
          <Award className="w-4 h-4 text-[#32b8c6]" />
          <span>{skill.totalExperts} experts</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-[#32b8c6]" />
          <span>{skill.totalLearners} learners</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-yellow-500" />
          <span>{skill.averageRating.toFixed(1)}</span>
        </div>
      </div>

      {/* Top Experts */}
      {skill.topExperts && skill.topExperts.length > 0 && (
        <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <BookOpen className="w-4 h-4 text-gray-400" />
          <div className="flex -space-x-2">
            {skill.topExperts.slice(0, 3).map((expert, index) => (
              <Avatar
                key={index}
                src={expert.avatar}
                fallback={expert.name}
                size="xs"
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Top experts
          </span>
        </div>
      )}
    </Card>
  );
};

export default SkillCard;
