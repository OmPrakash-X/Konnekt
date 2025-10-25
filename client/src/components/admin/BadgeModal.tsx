import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BadgeFormData) => void;
  badge?: {
    id?: string;
    _id?: string;
    name: string;
    description: string;
    icon: string;
    criteria: string | any;
  } | null;
  mode: 'create' | 'edit';
}

export interface BadgeFormData {
  name: string;
  description: string;
  icon: string;
  criteria: string;
}

const BadgeModal: React.FC<BadgeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  badge,
  mode,
}) => {
  const [formData, setFormData] = useState<BadgeFormData>({
    name: '',
    description: '',
    icon: '🏆',
    criteria: '',
  });

  useEffect(() => {
    if (badge && mode === 'edit') {
      // FIX: Handle criteria as string or object
      let criteriaText = '';
      if (typeof badge.criteria === 'string') {
        criteriaText = badge.criteria;
      } else if (badge.criteria && typeof badge.criteria === 'object') {
        // If criteria has specificSkills property
        if ('specificSkills' in badge.criteria) {
          criteriaText = Array.isArray(badge.criteria.specificSkills)
            ? badge.criteria.specificSkills.join(', ')
            : String(badge.criteria.specificSkills);
        } else {
          // Fallback: stringify the object
          criteriaText = JSON.stringify(badge.criteria);
        }
      }

      setFormData({
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        criteria: criteriaText,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        icon: '🏆',
        criteria: '',
      });
    }
  }, [badge, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.description && formData.criteria) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-black/90 backdrop-blur-xl">
          <h2 className="text-2xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {mode === 'create' ? 'Create New Badge' : 'Edit Badge'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Badge Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Badge Icon (Emoji)
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#32b8c6]/50 focus:ring-2 focus:ring-[#32b8c6]/20 transition-all"
              placeholder="🏆"
              maxLength={2}
            />
          </div>

          {/* Badge Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Badge Name*
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#32b8c6]/50 focus:ring-2 focus:ring-[#32b8c6]/20 transition-all"
              placeholder="e.g., Master Learner"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description*
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#32b8c6]/50 focus:ring-2 focus:ring-[#32b8c6]/20 transition-all resize-none"
              placeholder="Describe what this badge represents..."
              rows={3}
              required
            />
          </div>

          {/* Criteria */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Criteria*
            </label>
            <textarea
              value={formData.criteria}
              onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#32b8c6]/50 focus:ring-2 focus:ring-[#32b8c6]/20 transition-all resize-none"
              placeholder="What do users need to do to earn this badge?"
              rows={3}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-linear-to-r from-[#32b8c6] to-purple-500 hover:from-[#2a9fac] hover:to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-[#32b8c6]/25 hover:shadow-xl hover:shadow-[#32b8c6]/40 transition-all duration-300"
            >
              {mode === 'create' ? 'Create Badge' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BadgeModal;
