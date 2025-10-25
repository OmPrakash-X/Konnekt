import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getPendingSkills, approveSkill, rejectSkill } from '../../redux/features/adminSlice';
import SkillVerification from '../../components/admin/SkillVerification';
import RejectModal from '../../components/admin/RejectModal';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useNavigate } from 'react-router-dom';

const VerifySkills: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pendingSkills, loading } = useAppSelector((state) => state.admin);
  
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  useEffect(() => {
    dispatch(getPendingSkills());
  }, [dispatch]);

  const handleApprove = async (skillId: string) => {
    await dispatch(approveSkill(skillId));
    dispatch(getPendingSkills()); // Refresh list
  };

  const handleReject = async (skillId: string) => {
    const skill = pendingSkills?.find((s: any) => s.id === skillId || s._id === skillId);
    setSelectedSkill(skill);
    setRejectModalOpen(true);
  };

  const handleRejectSubmit = async (reason: string) => {
    if (selectedSkill) {
      await dispatch(rejectSkill({ 
        skillId: selectedSkill.id || selectedSkill._id, 
        reason 
      }));
      dispatch(getPendingSkills()); // Refresh list
    }
  };

  const handleView = (skillId: string) => {
    navigate(`/skills/${skillId}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-black">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
            Skill Verification
          </h1>
          <p className="text-gray-400">
            Review and approve expert skill submissions
          </p>
        </div>

        {/* Content */}
        {!pendingSkills || pendingSkills.length === 0 ? (
          <div className="text-center py-16 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
            <div className="w-16 h-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">✅</span>
            </div>
            <p className="text-gray-400 text-lg">
              No pending skill verifications
            </p>
            <p className="text-gray-500 text-sm mt-2">
              All submissions have been reviewed
            </p>
          </div>
        ) : (
          <SkillVerification
            pendingSkills={pendingSkills}
            onApprove={handleApprove}
            onReject={handleReject}
            onView={handleView}
          />
        )}
      </div>

      {/* Reject Modal */}
      <RejectModal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onSubmit={handleRejectSubmit}
        skillName={selectedSkill?.skillName}
      />

      {/* Background linear Effects */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#32b8c6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default VerifySkills;
