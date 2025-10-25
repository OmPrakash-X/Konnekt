import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllUsers, updateUserStatus, deleteUser } from '../../redux/features/adminSlice';
import UserManagement from '../../components/admin/UserManagement';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ManageUsers: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, loading } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsers({}));
  }, [dispatch]);

  const confirmToggleStatus = async (userId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
      await dispatch(updateUserStatus({ userId, status: newStatus })).unwrap();
      toast.success(`User ${newStatus === 'active' ? 'activated' : 'suspended'} successfully!`);
      dispatch(getAllUsers({}));
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status');
    }
  };

  const confirmDelete = async (userId: string) => {
    try {
      await dispatch(deleteUser(userId)).unwrap();
      toast.success('User deleted successfully!');
      dispatch(getAllUsers({}));
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleUpdateUser = async (userId: string, action: string) => {
    const user = users.find((u: any) => u.id === userId || u._id === userId);
    
    switch (action) {
      case 'toggle-status':
        if (user) {
          const currentStatus = user.accountStatus || user.status || 'active';
          const actionText = currentStatus === 'active' ? 'suspend' : 'activate';
          
          toast(`Are you sure you want to ${actionText} this user?`, {
            description: user.name || user.email,
            action: {
              label: actionText.charAt(0).toUpperCase() + actionText.slice(1),
              onClick: () => confirmToggleStatus(userId, currentStatus),
            },
            cancel: {
              label: 'Cancel',
              onClick: () => toast.info('Action cancelled'),
            },
            duration: 5000,
          });
        }
        break;
        
      case 'delete':
        toast('Are you sure you want to delete this user?', {
          description: 'This action cannot be undone.',
          action: {
            label: 'Delete',
            onClick: () => confirmDelete(userId),
          },
          cancel: {
            label: 'Cancel',
            onClick: () => toast.info('Deletion cancelled'),
          },
          duration: 5000,
        });
        break;
        
      case 'view':
        navigate(`/profile/${userId}`);
        break;
        
      default:
        toast.error('Unknown action');
    }
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

  // Transform backend data to match frontend expectations
  const transformedUsers = (users || []).map((user: any) => ({
    id: user._id || user.id,
    name: user.name || 'Unknown User',
    email: user.email || 'No email',
    avatar: user.avatar,
    role: user.role || 'user',
    status: user.accountStatus || user.status || 'active',
    joinedDate: user.createdAt || user.joinedDate || new Date().toISOString(),
    totalSessions: user.totalSessions || 0,
  }));

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
            User Management
          </h1>
          <p className="text-gray-400">
            Manage all users, experts, and admins
          </p>
        </div>

        {/* User Management Component */}
        <UserManagement 
          users={transformedUsers} 
          onUpdateUser={handleUpdateUser} 
        />
      </div>

      {/* Background linear Effects */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#32b8c6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default ManageUsers;
