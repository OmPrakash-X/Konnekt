import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllSkills, searchSkills } from '../../redux/features/skillSlice';
import SkillCard from '../../components/skill/SkillCard';
import { Search } from 'lucide-react';

const SkillsExplore: React.FC = () => {
  const dispatch = useAppDispatch();
  const { skills, loading } = useAppSelector((state) => state.skill);
  const [category, setCategory] = useState<string>('all');
  const [level, setLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadSkills();
  }, [category, level]);

  const loadSkills = () => {
    const params: any = {};
    if (category !== 'all') params.category = category;
    if (level !== 'all') params.level = level;
    
    dispatch(getAllSkills(params));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await dispatch(searchSkills(searchQuery));
    } else {
      loadSkills();
    }
  };

  const categories = ['all', 'Programming', 'Design', 'Business', 'Marketing', 'Music', 'Language'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Explore Skills
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Find experts to learn from
          </p>
          
          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all"
              />
            </div>
          </form>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-300">
              Category:
            </span>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    category === cat
                      ? 'bg-white text-black'
                      : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-300">
              Level:
            </span>
            <div className="flex gap-2">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    level === lvl
                      ? 'bg-white text-black'
                      : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : skills.length === 0 ? (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No skills found
            </h3>
            <p className="text-gray-400">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsExplore;
