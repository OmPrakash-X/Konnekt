import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getSkillById, getSkillExperts } from '../../redux/features/skillSlice';
import { BookOpen, Users, Clock, DollarSign } from 'lucide-react';
import UserCard from '../../components/user/UserCard';

const SkillDetails: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const dispatch = useAppDispatch();
  const { currentSkill: skill, loading } = useAppSelector((state) => state.skill);
  const [experts, setExperts] = React.useState<any[]>([]);

  useEffect(() => {
    if (skillId) {
      dispatch(getSkillById(skillId));
      loadExperts();
    }
  }, [dispatch, skillId]);

  const loadExperts = async () => {
    try {
      const response = await dispatch(getSkillExperts(skillId!)).unwrap();
      setExperts(response);
    } catch (error) {
      console.error('Failed to load experts:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Skill not found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-lg">
              {skill.category}
            </span>
            <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-lg">
              {skill.level}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {skill.name}
          </h1>
          <p className="text-xl text-gray-300">
            {skill.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-white" />
              <div>
                <p className="text-sm text-gray-400">Level</p>
                <p className="text-lg font-semibold text-white">
                  {skill.level}
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-white" />
              <div>
                <p className="text-sm text-gray-400">Experts</p>
                <p className="text-lg font-semibold text-white">
                  {experts.length}
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-white" />
              <div>
                <p className="text-sm text-gray-400">Duration</p>
                <p className="text-lg font-semibold text-white">
                  1-2 hours
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-white" />
              <div>
                <p className="text-sm text-gray-400">Credits/Hour</p>
                <p className="text-lg font-semibold text-white">
                  {skill.creditsPerHour}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Experts Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Learn from these experts
          </h2>
          {experts.length === 0 ? (
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <p className="text-gray-400">
                No experts available for this skill yet
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map((expert) => (
                <UserCard key={expert.id} user={expert} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;
