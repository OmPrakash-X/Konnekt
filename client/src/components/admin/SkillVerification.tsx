import React from 'react';
import { CheckCircle, XCircle, Eye, Shield } from 'lucide-react';
import Avatar from '../common/Avatar';


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
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Skill Verification Queue
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Review and approve expert skill submissions
        </p>
      </div>

      {pendingSkills.length === 0 ? (
        <div className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">
            No pending skill verifications
          </p>
          <p className="text-gray-500 text-sm mt-2">
            All submissions have been reviewed
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingSkills.map((skill) => (
            <div
              key={skill.id}
              className="group relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#32b8c6]/10"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-linear-to-r from-[#32b8c6]/0 to-purple-500/0 group-hover:from-[#32b8c6]/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-300" />
              
              <div className="relative flex items-center justify-between gap-4 flex-wrap">
                {/* User Info Section */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-[#32b8c6] to-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                    <Avatar
                      src={skill.user.avatar}
                      fallback={skill.user.name}
                      size="md"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-lg truncate">
                      {skill.skillName}
                    </h3>
                    <p className="text-sm text-gray-400">
                      by {skill.user.name}
                    </p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="px-2 py-1 bg-[#32b8c6]/10 border border-[#32b8c6]/20 text-[#32b8c6] text-xs font-medium rounded-lg">
                        {skill.category}
                      </span>
                      <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium rounded-lg">
                        {skill.level}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(skill.submittedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap">
                  {/* View Button */}
                  <button
                    onClick={() => onView(skill.id)}
                    className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Approve Button */}
                  <button
                    onClick={() => onApprove(skill.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 hover:border-green-500/50 text-green-400 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">Approve</span>
                  </button>

                  {/* Reject Button */}
                  <button
                    onClick={() => onReject(skill.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <XCircle className="w-4 h-4" />
                    <span className="font-medium">Reject</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillVerification;
