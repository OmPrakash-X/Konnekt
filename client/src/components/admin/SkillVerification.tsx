// SkillVerification.tsx
import React from 'react';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';

interface PendingSkill {
  id: string;
  skillName: string;
  category: string;
  user: {
    name: string;
    avatar?: string;
  };
  submittedDate: string;
  level: string;
}

interface SkillVerificationProps {
  pendingSkills: PendingSkill[];
  onApprove: (skillId: string) => void;
  onReject: (skillId: string) => void;
  onView: (skillId: string) => void;
}

const SkillVerification: React.FC<SkillVerificationProps> = ({
  pendingSkills,
  onApprove,
  onReject,
  onView,
}) => {
  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Skill Verification Queue
      </h2>

      <div className="space-y-4">
        {pendingSkills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center gap-4 flex-1">
              <Avatar
                src={skill.user.avatar}
                fallback={skill.user.name}
                size="md"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {skill.skillName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  by {skill.user.name}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="default">{skill.category}</Badge>
                  <Badge variant="info">{skill.level}</Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(skill.submittedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onView(skill.id)}>
                <Eye className="w-4 h-4" />
              </Button>
              <Button size="sm" onClick={() => onApprove(skill.id)}>
                <CheckCircle className="w-4 h-4" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onReject(skill.id)}
              >
                <XCircle className="w-4 h-4" />
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SkillVerification;
