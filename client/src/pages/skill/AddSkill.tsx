import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { createSkill } from '../../redux/features/skillSlice';
import { BookOpen, Tag, FileText, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const AddSkill: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    level: 'Beginner',
    creditsPerHour: 50,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(createSkill(formData)).unwrap();
      toast.success('Skill added successfully!');
      navigate('/skills/my-skills');
    } catch (error: any) {
      toast.error(error || 'Failed to add skill');
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['Programming', 'Design', 'Business', 'Marketing', 'Music', 'Language'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Add New Skill
          </h1>
          <p className="text-gray-400">
            Share your expertise with others
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Skill Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Skill Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., React Development"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all"
                required
              >
                <option value="" className="bg-black">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-black">{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Describe what you'll teach..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all resize-none"
                required
              />
            </div>

            {/* Level */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Level *
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all"
                required
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl} className="bg-black">{lvl}</option>
                ))}
              </select>
            </div>

            {/* Credits */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Credits Per Hour *
              </label>
              <input
                type="number"
                value={formData.creditsPerHour}
                onChange={(e) => setFormData({ ...formData, creditsPerHour: Number(e.target.value) })}
                min={10}
                max={500}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all"
                required
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50"
              >
                {isLoading ? 'Adding...' : 'Add Skill'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSkill;
