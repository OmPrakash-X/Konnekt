import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Award } from 'lucide-react';

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

  return (
    <div
      onClick={() => navigate(`/skills/${skill.id}`)}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
    >
      <div className="flex items-start gap-4 mb-4">
        {/* Icon */}
        <div className="w-14 h-14 shrink-0 bg-white rounded-lg flex items-center justify-center text-2xl">
          {skill.icon || '🎯'}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1 truncate">
                {skill.name}
              </h3>
              <p className="text-sm text-gray-400">
                {skill.category}
              </p>
            </div>
            {skill.level && (
              <span className="px-2 py-1 text-xs font-medium bg-white/10 text-white rounded-lg">
                {skill.level}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
        {skill.description}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <Award className="w-4 h-4 text-white" />
          <span>{skill.totalExperts} experts</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-white" />
          <span>{skill.totalLearners} learners</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-white" />
          <span>{skill.averageRating.toFixed(1)}</span>
        </div>
      </div>

      {/* Top Experts */}
      {skill.topExperts && skill.topExperts.length > 0 && (
        <div className="flex items-center gap-2 pt-4 mt-4 border-t border-white/10">
          <div className="flex -space-x-2">
            {skill.topExperts.slice(0, 3).map((expert, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full bg-white/20 border-2 border-black flex items-center justify-center text-xs text-white font-semibold"
              >
                {expert.name.charAt(0)}
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-500">
            Top experts
          </span>
        </div>
      )}
    </div>
  );
};

export default SkillCard;
