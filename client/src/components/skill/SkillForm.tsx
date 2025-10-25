import React, { useState } from 'react';
import { BookOpen, Tag, FileText, DollarSign } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

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
      <Input
        label="Skill Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="e.g., React Development"
        icon={<BookOpen className="w-5 h-5" />}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Tag className="w-4 h-4 inline mr-2" />
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#32b8c6]"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <FileText className="w-4 h-4 inline mr-2" />
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe your skill and what you can teach..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#32b8c6]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Difficulty Level
        </label>
        <div className="flex gap-2">
          {levels.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setFormData({ ...formData, level })}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                formData.level === level
                  ? 'bg-[#32b8c6] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <Input
        label="Credits per Hour"
        type="number"
        name="creditsPerHour"
        value={formData.creditsPerHour}
        onChange={handleChange}
        min={1}
        icon={<DollarSign className="w-5 h-5" />}
        helperText="How many credits learners will pay per hour"
        required
      />

      <div className="flex gap-3">
        <Button type="submit" fullWidth isLoading={isLoading}>
          {initialData ? 'Update Skill' : 'Add Skill'}
        </Button>
        <Button type="button" variant="outline" fullWidth onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default SkillForm;
