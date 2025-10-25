import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getMySkills, deleteSkill } from '../../redux/features/skillSlice';
import { Plus, Edit, Trash2 } from 'lucide-react';
import SkillCard from '../../components/skill/SkillCard';
import Button from '../../components/common/Button';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';

const MySkills: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { skills, loading } = useAppSelector((state) => state.skill);

  useEffect(() => {
    dispatch(getMySkills());
  }, [dispatch]);

  const handleDelete = async (skillId: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      await dispatch(deleteSkill(skillId));
      dispatch(getMySkills());
    }
  };

  const handleEdit = (skillId: string) => {
    navigate(`/skills/edit/${skillId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Container>
      <div className="py-12 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Skills
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your teaching skills
            </p>
          </div>
          <Button onClick={() => navigate('/skills/add')}>
            <Plus className="w-5 h-5" />
            Add Skill
          </Button>
        </div>

        {skills.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No skills yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add your first skill to start teaching
            </p>
            <Button onClick={() => navigate('/skills/add')}>
              <Plus className="w-5 h-5" />
              Add Your First Skill
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div key={skill.id} className="relative group">
                <SkillCard skill={skill} />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(skill.id)}
                    className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Edit className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default MySkills;
