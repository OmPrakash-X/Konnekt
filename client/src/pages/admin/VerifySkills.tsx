import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getPendingSkills, approveSkill, rejectSkill } from '../../redux/features/adminSlice';
import SkillVerification from '../../components/admin/SkillVerification';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';

const VerifySkills: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pendingSkills, loading } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getPendingSkills());
  }, [dispatch]);

  const handleApprove = async (skillId: string) => {
    await dispatch(approveSkill(skillId));
    dispatch(getPendingSkills()); // Refresh list
  };

  const handleReject = async (skillId: string) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      await dispatch(rejectSkill({ skillId, reason }));
      dispatch(getPendingSkills()); // Refresh list
    }
  };

  const handleView = (skillId: string) => {
    window.location.href = `/skills/${skillId}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <Container size="full">
        <div className="py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Skill Verification
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Review and approve expert skill submissions
            </p>
          </div>

          {!pendingSkills || pendingSkills.length === 0 ? (
            <div className="text-center py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No pending skill verifications
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
      </Container>
    </div>
  );
};

export default VerifySkills;
