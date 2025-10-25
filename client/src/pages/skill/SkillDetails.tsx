import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getSkillById, getSkillExperts } from '../../redux/features/skillSlice';
import { BookOpen, Users, Clock, DollarSign, Star } from 'lucide-react';
import UserCard from '../../components/user/UserCard';

const SkillDetails: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const dispatch = useAppDispatch();
  const { currentSkill: skill, skillExperts: experts, loading } = useAppSelector(
    (state) => state.skill
  );

  useEffect(() => {
    if (skillId) {
      dispatch(getSkillById(skillId));
      dispatch(getSkillExperts(skillId));
    }
  }, [dispatch, skillId]);

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
        <div className="text-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Skill not found
          </h2>
          <p className="text-gray-400 mb-6">
            The skill you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/skills"
            className="px-6 py-3 bg-linear-to-r from-[#32b8c6] to-purple-500 text-white font-medium rounded-xl hover:scale-105 transition-transform inline-block"
          >
            Browse Skills
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative group bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-linear-to-br from-[#32b8c6]/0 to-purple-500/0 group-hover:from-[#32b8c6]/5 group-hover:to-purple-500/5 rounded-2xl transition-all duration-300" />
          
          <div className="relative">
            {/* Badges */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#32b8c6]/10 border border-[#32b8c6]/20 text-[#32b8c6] text-sm font-medium rounded-lg">
                {skill.category}
              </span>
              <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium rounded-lg">
                {skill.level}
              </span>
            </div>

            {/* Title and Icon */}
            <div className="flex items-center gap-4 mb-4">
              {skill.icon && (
                <div className="text-5xl">{skill.icon}</div>
              )}
              <h1 className="text-4xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {skill.name}
              </h1>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-300">
              {skill.description}
            </p>

            {/* Rating */}
            {skill.averageRating && (
              <div className="flex items-center gap-2 mt-4">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-medium">
                  {skill.averageRating.toFixed(1)}
                </span>
                <span className="text-gray-400">
                  ({skill.totalLearners || 0} learners)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/5 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider">Level</p>
                <p className="text-lg font-semibold text-white">
                  {skill.level || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/5 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-linear-to-br from-[#32b8c6] to-purple-500 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider">Experts</p>
                <p className="text-lg font-semibold text-white">
                  {experts?.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/5 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-linear-to-br from-green-500 to-emerald-500 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider">Duration</p>
                <p className="text-lg font-semibold text-white">
                  1-2 hours
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/5 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-linear-to-br from-yellow-500 to-orange-500 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider">Credits/Hour</p>
                <p className="text-lg font-semibold text-white">
                  {skill.creditsPerHour || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Experts Section */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Learn from these experts
          </h2>
          
          {!experts || experts.length === 0 ? (
            <div className="text-center py-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                No experts available for this skill yet
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Be the first to offer expertise in {skill.name}!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map((expert) => (
                <UserCard key={expert.id || expert._id} user={expert} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Background linear Effects */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#32b8c6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default SkillDetails;
