import React, { useState } from 'react';
import { BookOpen, Tag, FileText, DollarSign } from 'lucide-react';

interface SkillFormProps {
  initialData?: {
    name: string;
    category: string;
    description: string;
    level: string;
    creditsPerHour: number;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const SkillForm: React.FC<SkillFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    description: initialData?.description || '',
    level: initialData?.level || 'Beginner',
    creditsPerHour: initialData?.creditsPerHour || 10,
  });
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'Programming',
    'Design',
    'Business',
    'Marketing',
    'Music',
    'Language',
    'Fitness',
    'Other',
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Skill Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Skill Name</label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., React Development"
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all"
            required
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <Tag className="w-4 h-4" />
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all"
          required
        >
          <option value="" className="bg-black">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-black">
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe your skill and what you can teach..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all resize-none"
          required
        />
      </div>

      {/* Difficulty Level */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Difficulty Level
        </label>
        <div className="flex gap-2">
          {levels.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setFormData({ ...formData, level })}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                formData.level === level
                  ? 'bg-white text-black'
                  : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Credits per Hour */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Credits per Hour</label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="number"
            name="creditsPerHour"
            value={formData.creditsPerHour}
            onChange={handleChange}
            min={1}
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all"
            required
          />
        </div>
        <p className="text-xs text-gray-500">How many credits learners will pay per hour</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Skill' : 'Add Skill'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SkillForm;
