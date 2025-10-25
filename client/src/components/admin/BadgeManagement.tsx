// BadgeManagement.tsx
import React from 'react';
import { Award, Edit, Trash2, Plus } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  issuedCount: number;
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
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Badge Management
        </h2>
        <Button onClick={onAdd}>
          <Plus className="w-4 h-4" />
          Create Badge
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{badge.icon}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(badge.id)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => onDelete(badge.id)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {badge.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {badge.description}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
              <strong>Criteria:</strong> {badge.criteria}
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="info">
                <Award className="w-3 h-3" />
                {badge.issuedCount} issued
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BadgeManagement;
