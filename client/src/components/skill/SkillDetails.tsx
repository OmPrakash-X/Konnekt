import React from 'react';
import { Users, Award, TrendingUp, DollarSign } from 'lucide-react';

interface SkillDetailsProps {
  skill: {
    name: string;
    category: string;
    description: string;
    icon?: string;
    level: string;
    totalExperts: number;
    totalLearners: number;
    averageRating: number;
    creditsPerHour: number;
    averageDuration: number;
    experts: Array<{
      id: string;
      name: string;
      avatar?: string;
      rating: number;
      totalSessions: number;
    }>;
  };
  onBookSession?: (expertId: string) => void;
}

const SkillDetails: React.FC<SkillDetailsProps> = ({ skill, onBookSession }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-8">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 shrink-0 bg-white rounded-xl flex items-center justify-center text-4xl">
            {skill.icon || '🎯'}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {skill.name}
                </h1>
                <p className="text-gray-400">{skill.category}</p>
              </div>
              <span className="px-3 py-1 text-sm font-medium bg-white/10 text-white rounded-lg">
                {skill.level}
              </span>
            </div>
            <p className="text-gray-300 mt-4">{skill.description}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <Award className="w-6 h-6 text-white mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">
            {skill.totalExperts}
          </p>
          <p className="text-sm text-gray-400">Experts</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <Users className="w-6 h-6 text-white mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">
            {skill.totalLearners}
          </p>
          <p className="text-sm text-gray-400">Learners</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <TrendingUp className="w-6 h-6 text-white mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">
            {skill.averageRating.toFixed(1)}
          </p>
          <p className="text-sm text-gray-400">Rating</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <DollarSign className="w-6 h-6 text-white mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">
            {skill.creditsPerHour}
          </p>
          <p className="text-sm text-gray-400">Credits/hr</p>
        </div>
      </div>

      {/* Experts List */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-8">
        <h2 className="text-xl font-semibold text-white mb-6">
          Top Experts
        </h2>
        <div className="space-y-4">
          {skill.experts.map((expert) => (
            <div
              key={expert.id}
              className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
                  {expert.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    {expert.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {expert.rating.toFixed(1)}
                    </span>
                    <span>•</span>
                    <span>{expert.totalSessions} sessions</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onBookSession?.(expert.id)}
                className="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
              >
                Book Session
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;
