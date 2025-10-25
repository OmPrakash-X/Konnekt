import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllUsers, updateUserStatus, deleteUser } from '../../redux/features/adminSlice';
import UserManagement from '../../components/admin/UserManagement';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';

const ManageUsers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsers({}));
  }, [dispatch]);

  const handleUpdateUser = async (userId: string, action: string) => {
    switch (action) {
      case 'toggle-status':
        await dispatch(updateUserStatus({ userId, status: 'active' }));
        dispatch(getAllUsers({})); // Refresh list
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this user?')) {
          await dispatch(deleteUser(userId));
        }
        break;
      case 'view':
        window.location.href = `/profile/${userId}`;
        break;
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
    <Container size="full">
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            User Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all users, experts, and admins
          </p>
        </div>

        <UserManagement users={users} onUpdateUser={handleUpdateUser} />
      </div>
    </Container>
  );
};

export default ManageUsers;
