import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllSkills, searchSkills } from '../../redux/features/skillSlice';
import SkillCard from '../../components/skill/SkillCard';
import SearchBar from '../../components/common/SearchBar';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';
import { Search } from 'lucide-react';

const SkillsExplore: React.FC = () => {
  const dispatch = useAppDispatch();
  const { skills, loading } = useAppSelector((state) => state.skill);
  const [category, setCategory] = useState<string>('all');
  const [level, setLevel] = useState<string>('all');

  useEffect(() => {
    loadSkills();
  }, [category, level]);

  const loadSkills = () => {
    const params: any = {};
    if (category !== 'all') params.category = category;
    if (level !== 'all') params.level = level;
    
    dispatch(getAllSkills(params));
  };

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      await dispatch(searchSkills(query));
    } else {
      loadSkills();
    }
  };

  const categories = ['all', 'Programming', 'Design', 'Business', 'Marketing', 'Music', 'Language'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  return (
    <Container>
      <div className="py-12 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Skills
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Find experts to learn from
          </p>
          
          <div className="max-w-2xl mx-auto">
            <SearchBar
              placeholder="Search skills..."
              onSearch={handleSearch}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Category:
            </span>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    category === cat
                      ? 'bg-[#32b8c6] text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Level:
            </span>
            <div className="flex gap-2">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    level === lvl
                      ? 'bg-[#32b8c6] text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
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
            <Spinner size="lg" />
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No skills found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
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
    </Container>
  );
};

export default SkillsExplore;
