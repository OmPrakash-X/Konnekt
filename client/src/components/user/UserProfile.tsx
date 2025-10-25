import React from 'react';
import { Mail, MapPin, Calendar, Award, Star, TrendingUp, Edit } from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    location?: string | { country?: string; city?: string; state?: string }; // Can be string or object
    joinedDate: string;
    rating?: number;
    totalReviews?: number;
    totalSessions?: number;
    expertIn?: string[];
    badges?: Array<{
      name: string;
      icon: string;
    }>;
    isExpert?: boolean;
  };
  isOwnProfile?: boolean;
  onEdit?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, isOwnProfile, onEdit }) => {
  // Helper function to format location
  const formatLocation = (location: string | { country?: string; city?: string; state?: string } | undefined) => {
    if (!location) return null;
    
    if (typeof location === 'string') {
      return location;
    }
    
    // If location is an object, format it as a string
    const parts = [];
    if (location.city) parts.push(location.city);
    if (location.state) parts.push(location.state);
    if (location.country) parts.push(location.country);
    
    return parts.length > 0 ? parts.join(', ') : null;
  };

  const locationString = formatLocation(user.location);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-[#32b8c6] to-purple-500 rounded-full blur-lg opacity-50" />
              <div className="relative">
                <Avatar src={user.avatar} fallback={user.name} size="xl" />
                {user.isExpert && (
                  <div className="absolute -bottom-2 -right-2 bg-linear-to-r from-[#32b8c6] to-purple-500 p-2 rounded-full border-4 border-black">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                {user.isExpert && (
                  <Badge variant="success" icon={<Award className="w-3 h-3" />}>
                    Expert
                  </Badge>
                )}
              </div>
              {isOwnProfile && (
                <button
                  onClick={onEdit}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Bio */}
            {user.bio && (
              <p className="text-gray-300 mb-4">{user.bio}</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              {locationString && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{locationString}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-linear-to-br from-yellow-500 to-yellow-600 rounded-xl">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {user.rating?.toFixed(1) || 'N/A'}
              </p>
              <p className="text-sm text-gray-400">
                Rating ({user.totalReviews || 0} reviews)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-linear-to-br from-[#32b8c6] to-[#2a9fac] rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {user.totalSessions || 0}
              </p>
              <p className="text-sm text-gray-400">Total Sessions</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {user.badges?.length || 0}
              </p>
              <p className="text-sm text-gray-400">Badges Earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expert In Skills */}
      {user.expertIn && user.expertIn.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Expert In</h2>
          <div className="flex flex-wrap gap-2">
            {user.expertIn.map((skill, index) => (
              <Badge key={index} variant="default">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Badges */}
      {user.badges && user.badges.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.badges.map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 mb-2 text-4xl">{badge.icon}</div>
                <p className="text-sm font-medium text-white text-center">
                  {badge.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
