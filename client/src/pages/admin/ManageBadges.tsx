import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllBadges, createBadge, updateBadge, deleteBadge } from '../../redux/features/badgeSlice';
import BadgeManagement from '../../components/admin/BadgeManagement';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';

const ManageBadges: React.FC = () => {
  const dispatch = useAppDispatch();
  const { badges, loading } = useAppSelector((state) => state.badge);

  useEffect(() => {
    dispatch(getAllBadges());
  }, [dispatch]);

  const handleAdd = () => {
    // Open modal or navigate to create badge form
    const badgeData = {
      name: prompt('Badge Name:') || '',
      description: prompt('Description:') || '',
      icon: prompt('Icon (emoji):') || '🏆',
      criteria: prompt('Criteria:') || '',
    };

    if (badgeData.name && badgeData.description && badgeData.criteria) {
      dispatch(createBadge(badgeData));
    }
  };

  const handleEdit = (badgeId: string) => {
    const badge = badges.find((b: any) => b.id === badgeId);
    if (!badge) return;

    const updatedData = {
      name: prompt('Badge Name:', badge.name) || badge.name,
      description: prompt('Description:', badge.description) || badge.description,
      icon: prompt('Icon:', badge.icon) || badge.icon,
      criteria: prompt('Criteria:', badge.criteria) || badge.criteria,
    };

    dispatch(updateBadge({ badgeId, data: updatedData }));
  };

  const handleDelete = async (badgeId: string) => {
    if (confirm('Are you sure you want to delete this badge?')) {
      await dispatch(deleteBadge(badgeId));
    }
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
              Badge Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create and manage achievement badges
            </p>
          </div>
          <BadgeManagement
            badges={badges || []}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </Container>
    </div>
  );
};

export default ManageBadges;
