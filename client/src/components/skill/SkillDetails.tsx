import React from 'react';
import { Users, Award, TrendingUp, Clock, DollarSign, BookOpen } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Avatar from '../common/Avatar';

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
  const levelColors = {
    Beginner: 'success',
    Intermediate: 'warning',
    Advanced: 'error',
  } as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 flex-shrink-0 bg-gradient-to-br from-[#32b8c6] to-[#2a9fac] rounded-xl flex items-center justify-center text-4xl">
            {skill.icon || '🎯'}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {skill.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{skill.category}</p>
              </div>
              <Badge variant={levelColors[skill.level as keyof typeof levelColors]}>
                {skill.level}
              </Badge>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">{skill.description}</p>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card padding="md">
          <div className="text-center">
            <Award className="w-6 h-6 text-[#32b8c6] mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {skill.totalExperts}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Experts</p>
          </div>
        </Card>

        <Card padding="md">
          <div className="text-center">
            <Users className="w-6 h-6 text-[#32b8c6] mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {skill.totalLearners}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Learners</p>
          </div>
        </Card>

        <Card padding="md">
          <div className="text-center">
            <TrendingUp className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {skill.averageRating.toFixed(1)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
          </div>
        </Card>

        <Card padding="md">
          <div className="text-center">
            <DollarSign className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {skill.creditsPerHour}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Credits/hr</p>
          </div>
        </Card>
      </div>

      {/* Experts List */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Top Experts
        </h2>
        <div className="space-y-4">
          {skill.experts.map((expert) => (
            <div
              key={expert.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <Avatar src={expert.avatar} fallback={expert.name} size="md" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {expert.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {expert.rating.toFixed(1)}
                    </span>
                    <span>•</span>
                    <span>{expert.totalSessions} sessions</span>
                  </div>
                </div>
              </div>
              <Button size="sm" onClick={() => onBookSession?.(expert.id)}>
                Book Session
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SkillDetails;
