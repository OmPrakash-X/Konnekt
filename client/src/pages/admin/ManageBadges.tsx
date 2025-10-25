import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllBadges, createBadge, updateBadge, deleteBadge } from '../../redux/features/badgeSlice';
import BadgeManagement from '../../components/admin/BadgeManagement';
import BadgeModal from '../../components/admin/BadgeModal';
import type { BadgeFormData } from '../../components/admin/BadgeModal';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { toast } from 'sonner';

const ManageBadges: React.FC = () => {
  const dispatch = useAppDispatch();
  const { badges, loading } = useAppSelector((state) => state.badge);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedBadge, setSelectedBadge] = useState<any>(null);

  useEffect(() => {
    dispatch(getAllBadges());
  }, [dispatch]);

  const handleAdd = () => {
    setModalMode('create');
    setSelectedBadge(null);
    setModalOpen(true);
  };

  const handleEdit = (badgeId: string) => {
    const badge = badges.find((b: any) => (b.id === badgeId || b._id === badgeId));
    
    if (!badge) {
      toast.error('Badge not found');
      return;
    }
    
    setModalMode('edit');
    setSelectedBadge(badge);
    setModalOpen(true);
  };

  const handleModalSubmit = async (data: BadgeFormData) => {
    try {
      if (modalMode === 'create') {
        await dispatch(createBadge(data)).unwrap();
        toast.success('Badge created successfully!');
      } else if (selectedBadge) {
        const badgeId = selectedBadge.id || selectedBadge._id;
        await dispatch(updateBadge({ badgeId, data })).unwrap();
        toast.success('Badge updated successfully!');
      }
      setModalOpen(false);
      dispatch(getAllBadges());
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Failed to ${modalMode} badge`);
    }
  };

  const confirmDelete = async (badgeId: string) => {
    try {
      await dispatch(deleteBadge(badgeId)).unwrap();
      toast.success('Badge deleted successfully!');
      dispatch(getAllBadges());
    } catch (error) {
      console.error('Error deleting badge:', error);
      toast.error('Failed to delete badge');
    }
  };

  const handleDelete = (badgeId: string) => {
    // Sonner confirmation toast with action buttons
    toast('Are you sure you want to delete this badge?', {
      description: 'This action cannot be undone.',
      action: {
        label: 'Delete',
        onClick: () => confirmDelete(badgeId),
      },
      cancel: {
        label: 'Cancel',
        onClick: () => toast.info('Deletion cancelled'),
      },
      duration: 5000,
    });
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
            Badge Management
          </h1>
          <p className="text-gray-400">
            Create and manage achievement badges
          </p>
        </div>

        {/* Badge Management Component */}
        <BadgeManagement
          badges={badges || []}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Badge Modal */}
      <BadgeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        badge={selectedBadge}
        mode={modalMode}
      />

      {/* Background Gradient Effects */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#32b8c6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default ManageBadges;
