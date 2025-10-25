import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getMySkills, deleteSkill } from '../../redux/features/skillSlice';
import { Plus, Edit, Trash2 } from 'lucide-react';
import SkillCard from '../../components/skill/SkillCard';
import { toast } from 'sonner';

const MySkills: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { skills, loading } = useAppSelector((state) => state.skill);

  useEffect(() => {
    dispatch(getMySkills());
  }, [dispatch]);

  const confirmDeleteSkill = async (skillId: string) => {
  try {
    await dispatch(deleteSkill(skillId)).unwrap();
    toast.success('Skill deleted successfully!');
    dispatch(getMySkills());
  } catch (error) {
    console.error('Error deleting skill:', error);
    toast.error('Failed to delete skill');
  }
};

 const handleDelete = (skillId: string) => {
  toast('Are you sure you want to delete this skill?', {
    description: 'This action cannot be undone.',
    action: {
      label: 'Delete',
      onClick: () => confirmDeleteSkill(skillId),
    },
    cancel: {
      label: 'Cancel',
      onClick: () => toast.info('Deletion cancelled'),
    },
    duration: 5000,
  });
};

  const handleEdit = (skillId: string) => {
    navigate(`/skills/edit/${skillId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              My Skills
            </h1>
            <p className="text-gray-400">
              Manage your teaching skills
            </p>
          </div>
          <button
            onClick={() => navigate('/skills/add')}
            className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Skill
          </button>
        </div>

        {skills.length === 0 ? (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              No skills yet
            </h3>
            <p className="text-gray-400 mb-6">
              Add your first skill to start teaching
            </p>
            <button
              onClick={() => navigate('/skills/add')}
              className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Your First Skill
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div key={skill.id} className="relative group">
                <SkillCard skill={skill} />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(skill.id)}
                    className="p-2 backdrop-blur-xl bg-white/20 rounded-lg hover:bg-white/30 transition-all"
                  >
                    <Edit className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-2 backdrop-blur-xl bg-white/20 rounded-lg hover:bg-white/30 transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySkills;
