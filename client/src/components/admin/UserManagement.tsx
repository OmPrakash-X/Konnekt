import React, { useState } from 'react';
import { MoreVertical, Ban, CheckCircle, XCircle, Eye, Users as UsersIcon } from 'lucide-react';
import Avatar from '../common/Avatar';
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
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

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

  const getRoleBadgeStyle = (role: string) => {
    const styles = {
      user: 'bg-gray-500/10 border-gray-500/20 text-gray-400',
      expert: 'bg-[#32b8c6]/10 border-[#32b8c6]/20 text-[#32b8c6]',
      admin: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    };
    return styles[role as keyof typeof styles] || styles.user;
  };

  const getStatusBadgeStyle = (status: string) => {
    const styles = {
      active: 'bg-green-500/10 border-green-500/20 text-green-400',
      suspended: 'bg-red-500/10 border-red-500/20 text-red-400',
      inactive: 'bg-gray-500/10 border-gray-500/20 text-gray-400',
    };
    return styles[status as keyof typeof styles] || styles.inactive;
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
            User Management
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage all users, experts, and admins
          </p>
        </div>
        <div className="flex gap-3 flex-wrap items-center">
          {/* Role Filter Buttons */}
          <div className="flex gap-2">
            {['all', 'user', 'expert', 'admin'].map((role) => (
              <button
                key={role}
                onClick={() => handleRoleFilter(role)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedRole === role
                    ? 'bg-linear-to-r from-[#32b8c6] to-purple-500 text-white shadow-lg shadow-[#32b8c6]/25'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
          <SearchBar placeholder="Search users..." onSearch={handleSearch} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-4 font-medium text-gray-400 uppercase text-xs tracking-wider">
                User
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-400 uppercase text-xs tracking-wider">
                Role
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-400 uppercase text-xs tracking-wider">
                Status
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-400 uppercase text-xs tracking-wider">
                Sessions
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-400 uppercase text-xs tracking-wider">
                Joined
              </th>
              <th className="text-right py-4 px-4 font-medium text-gray-400 uppercase text-xs tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-16">
                  <UsersIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No users found</p>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-r from-[#32b8c6] to-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                        <Avatar
                          src={user.avatar}
                          fallback={user.name}
                          size="sm"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getRoleBadgeStyle(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusBadgeStyle(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    {user.totalSessions}
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setDropdownOpen(dropdownOpen === user.id ? null : user.id)}
                        className="p-2 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                      
                      {dropdownOpen === user.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setDropdownOpen(null)}
                          />
                          <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden">
                            <button
                              onClick={() => {
                                onUpdateUser(user.id, 'view');
                                setDropdownOpen(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              View Profile
                            </button>
                            <button
                              onClick={() => {
                                onUpdateUser(user.id, 'toggle-status');
                                setDropdownOpen(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                            >
                              {user.status === 'active' ? (
                                <>
                                  <Ban className="w-4 h-4" />
                                  Suspend
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4" />
                                  Activate
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => {
                                onUpdateUser(user.id, 'delete');
                                setDropdownOpen(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border-t border-white/10"
                            >
                              <XCircle className="w-4 h-4" />
                              Delete User
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
