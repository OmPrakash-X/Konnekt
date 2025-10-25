import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Award, TrendingUp } from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Card from '../common/Card';

interface UserCardProps {
  user: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
    location?: string;
    rating?: number;
    totalReviews?: number;
    expertIn?: string[];
    isExpert?: boolean;
    totalSessions?: number;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Card hover padding="md" onClick={() => navigate(`/profile/${user.id}`)}>
      <div className="flex flex-col items-center text-center">
        {/* Avatar with Expert Badge */}
        <div className="relative mb-4">
          <Avatar src={user.avatar} fallback={user.name} size="xl" />
          {user.isExpert && (
            <div className="absolute -bottom-1 -right-1 bg-[#32b8c6] p-1.5 rounded-full border-2 border-white dark:border-gray-800">
              <Award className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {user.name}
        </h3>

        {/* Location */}
        {user.location && (
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <MapPin className="w-4 h-4" />
            <span>{user.location}</span>
          </div>
        )}

        {/* Bio */}
        {user.bio && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {user.bio}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4">
          {user.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {user.rating.toFixed(1)}
              </span>
              {user.totalReviews && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({user.totalReviews})
                </span>
              )}
            </div>
          )}
          
          {user.totalSessions && (
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-[#32b8c6]" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {user.totalSessions} sessions
              </span>
            </div>
          )}
        </div>

        {/* Skills */}
        {user.expertIn && user.expertIn.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {user.expertIn.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="default" size="sm">
                {skill}
              </Badge>
            ))}
            {user.expertIn.length > 3 && (
              <Badge variant="default" size="sm">
                +{user.expertIn.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default UserCard;
