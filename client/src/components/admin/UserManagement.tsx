import React, { useState } from 'react';
import { MoreVertical, Ban, CheckCircle, XCircle, Eye } from 'lucide-react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Dropdown from '../common/Dropdown';
import SearchBar from '../common/SearchBar';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'expert' | 'admin';
  status: 'active' | 'suspended' | 'inactive';
  joinedDate: string;
  totalSessions: number;
}

interface UserManagementProps {
  users: User[];
  onUpdateUser: (userId: string, action: string) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({
  users,
  onUpdateUser,
}) => {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const handleSearch = (query: string) => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleRoleFilter = (role: string) => {
    setSelectedRole(role);
    if (role === 'all') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.role === role));
    }
  };

  const statusColors = {
    active: 'success',
    suspended: 'error',
    inactive: 'default',
  } as const;

  const roleColors = {
    user: 'default',
    expert: 'info',
    admin: 'warning',
  } as const;

  return (
    <Card>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          User Management
        </h2>
        <div className="flex gap-3 flex-wrap">
          <div className="flex gap-2">
            {['all', 'user', 'expert', 'admin'].map((role) => (
              <button
                key={role}
                onClick={() => handleRoleFilter(role)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedRole === role
                    ? 'bg-[#32b8c6] text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
          <SearchBar placeholder="Search users..." onSearch={handleSearch} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                User
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                Role
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                Sessions
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                Joined
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    No users found
                  </p>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={user.avatar}
                        fallback={user.name}
                        size="sm"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={roleColors[user.role]}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={statusColors[user.status]}>
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {user.totalSessions}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Dropdown
                      trigger={
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      }
                      items={[
                        {
                          label: 'View Profile',
                          onClick: () => onUpdateUser(user.id, 'view'),
                          icon: <Eye className="w-4 h-4" />,
                        },
                        {
                          label:
                            user.status === 'active' ? 'Suspend' : 'Activate',
                          onClick: () => onUpdateUser(user.id, 'toggle-status'),
                          icon:
                            user.status === 'active' ? (
                              <Ban className="w-4 h-4" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            ),
                        },
                        {
                          label: 'Delete User',
                          onClick: () => onUpdateUser(user.id, 'delete'),
                          icon: <XCircle className="w-4 h-4" />,
                          danger: true,
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default UserManagement;
