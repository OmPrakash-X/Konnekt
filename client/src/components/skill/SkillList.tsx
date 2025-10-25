import React from 'react';
import SkillCard from './SkillCard';
import Spinner from '../common/Spinner';
import { BookOpen } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  icon?: string;
  totalExperts: number;
  totalLearners: number;
  averageRating: number;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface SkillListProps {
  skills: Skill[];
  loading?: boolean;
  emptyMessage?: string;
}

const SkillList: React.FC<SkillListProps> = ({
  skills,
  loading,
  emptyMessage = 'No skills found',
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <BookOpen className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-600 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
};

export default SkillList;
