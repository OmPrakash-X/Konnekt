import React from 'react';
import { Mail, MapPin, Calendar, Award, Star, TrendingUp, Edit } from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Card from '../common/Card';

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    location?: string;
    joinedDate: string;
    rating?: number;
    totalReviews?: number;
    totalSessions?: number;
    expertIn?: string[];
    badges?: Array<{ name: string; icon: string }>;
    isExpert?: boolean;
  };
  isOwnProfile?: boolean;
  onEdit?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, isOwnProfile, onEdit }) => {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative">
              <Avatar src={user.avatar} fallback={user.name} size="xl" />
              {user.isExpert && (
                <div className="absolute -bottom-2 -right-2 bg-[#32b8c6] p-2 rounded-full border-4 border-white dark:border-gray-800">
                  <Award className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {user.name}
                </h1>
                {user.isExpert && (
                  <Badge variant="success" icon={<Award className="w-3 h-3" />}>
                    Expert
                  </Badge>
                )}
              </div>
              {isOwnProfile && (
                <Button onClick={onEdit} variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              )}
            </div>

            {/* Bio */}
            {user.bio && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">{user.bio}</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              {user.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card padding="md">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.rating?.toFixed(1) || 'N/A'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Rating ({user.totalReviews || 0} reviews)
              </p>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#32b8c6]/10 dark:bg-[#32b8c6]/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-[#32b8c6]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.totalSessions || 0}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Sessions
              </p>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.badges?.length || 0}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Badges Earned</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Expert In Skills */}
      {user.expertIn && user.expertIn.length > 0 && (
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Expert In
          </h2>
          <div className="flex flex-wrap gap-2">
            {user.expertIn.map((skill, index) => (
              <Badge key={index} variant="default">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Badges */}
      {user.badges && user.badges.length > 0 && (
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Badges
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.badges.map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="w-12 h-12 mb-2 text-4xl">{badge.icon}</div>
                <p className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  {badge.name}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default UserProfile;
