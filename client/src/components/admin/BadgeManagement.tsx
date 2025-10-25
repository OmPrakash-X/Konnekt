import React from 'react';
import { Award, Edit, Trash2, Plus } from 'lucide-react';

interface BadgeItem {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  icon: string;
  criteria: string | any; // Allow string or object
  issuedCount?: number;
}

interface BadgeManagementProps {
  badges: BadgeItem[];
  onAdd: () => void;
  onEdit: (badgeId: string) => void;
  onDelete: (badgeId: string) => void;
}

const BadgeManagement: React.FC<BadgeManagementProps> = ({
  badges,
  onAdd,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-6 justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Badge Management
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Create and manage achievement badges
          </p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-[#32b8c6] to-purple-500 text-white font-medium rounded-xl shadow-lg shadow-[#32b8c6]/25 hover:shadow-xl hover:shadow-[#32b8c6]/40 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Create Badge
        </button>
      </div>

      {/* Empty State or Badges Grid */}
      {badges.length === 0 ? (
        <div className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">
            No badges available. Create one to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => {
            const badgeId = badge.id || badge._id || '';
            
            // Handle criteria safely
            const criteriaText = (() => {
              if (typeof badge.criteria === 'string') {
                return badge.criteria;
              } else if (Array.isArray(badge.criteria)) {
                return badge.criteria.join(', ');
              } else if (badge.criteria && typeof badge.criteria === 'object') {
                // If criteria has specificSkills property
                if ('specificSkills' in badge.criteria) {
                  return Array.isArray(badge.criteria.specificSkills)
                    ? badge.criteria.specificSkills.join(', ')
                    : String(badge.criteria.specificSkills);
                }
                return JSON.stringify(badge.criteria);
              }
              return 'No criteria specified';
            })();

            return (
              <div
                key={badgeId}
                className="group relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#32b8c6]/10"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-[#32b8c6]/0 to-purple-500/0 group-hover:from-[#32b8c6]/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-300" />

                <div className="relative">
                  {/* Icon and Actions */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                      {badge.icon}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(badgeId)}
                        className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#32b8c6]/50 rounded-lg transition-all duration-300"
                        title="Edit badge"
                      >
                        <Edit className="w-4 h-4 text-gray-400 hover:text-[#32b8c6]" />
                      </button>
                      <button
                        onClick={() => onDelete(badgeId)}
                        className="p-2 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 rounded-lg transition-all duration-300"
                        title="Delete badge"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* Badge Info */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {badge.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {badge.description}
                  </p>

                  {/* Criteria */}
                  <div className="mb-4 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">
                      <strong className="text-gray-400">Criteria:</strong>
                    </p>
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {criteriaText}
                    </p>
                  </div>

                  {/* Issued Count */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-linear-to-r from-[#32b8c6]/10 to-purple-500/10 border border-[#32b8c6]/20 rounded-lg">
                    <Award className="w-4 h-4 text-[#32b8c6]" />
                    <span className="text-sm font-medium text-white">
                      {badge.issuedCount || 0} issued
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BadgeManagement;
