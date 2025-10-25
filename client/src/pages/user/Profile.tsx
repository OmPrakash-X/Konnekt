import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserProfile } from '../../redux/features/userSlice';
import { getReviewsByExpert } from '../../redux/features/reviewSlice';
import UserProfile from '../../components/user/UserProfile';
import UserReviews from '../../components/user/UserReviews';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { profile, loading: profileLoading } = useAppSelector((state) => state.user);
  const { reviews } = useAppSelector((state) => state.review);
  const currentUser = useAppSelector((state) => state.auth.user);

  const isOwnProfile = !userId || userId === (currentUser?.id || currentUser?._id);

  useEffect(() => {
    // Only fetch if viewing someone else's profile
    if (userId && !isOwnProfile) {
      dispatch(getUserProfile(userId));
      dispatch(getReviewsByExpert(userId));
    } else if (currentUser?.id || currentUser?._id) {
      // Fetch reviews for own profile
      const myId = currentUser.id || currentUser._id;
      if (myId) {
        dispatch(getReviewsByExpert(myId));
      }
    }
  }, [dispatch, userId, isOwnProfile, currentUser?.id, currentUser?._id]);

  // Use auth.user for own profile, profile for others
  const displayUser = isOwnProfile ? currentUser : profile;

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!displayUser) {
    return (
      <div className="min-h-screen bg-black">
        <Container>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Profile not found</h2>
            <p className="text-gray-400 mb-6">User ID: {userId || 'Not provided'}</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-linear-to-r from-[#32b8c6] to-purple-500 text-white rounded-xl hover:scale-105 transition-transform"
            >
              Go to Dashboard
            </button>
          </div>
        </Container>
      </div>
    );
  }

  // Transform the user data to match UserProfile component expectations
  const profileData = {
    id: displayUser.id || displayUser._id || '',
    name: displayUser.name || 'Unknown User',
    email: displayUser.email || '',
    avatar: displayUser.avatar,
    bio: displayUser.bio,
    location: displayUser.location, // Pass the whole location object
    joinedDate: displayUser.joinedDate || displayUser.createdAt || new Date().toISOString(),
    rating: displayUser.averageRating || displayUser.rating || 0,
    totalReviews: displayUser.totalReviews || 0,
    totalSessions: displayUser.totalSessions || 0,
    expertIn: displayUser.skills?.map((skill: any) => 
      typeof skill === 'string' ? skill : skill.name
    ) || displayUser.expertIn || [],
    badges: displayUser.badges?.map((badge: any) => ({
      name: badge.name || badge,
      icon: badge.icon || '🏆',
    })) || [],
    isExpert: displayUser.expertProfile?.isExpert || 
              displayUser.isExpert || 
              displayUser.role === 'expert',
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background linears */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#32b8c6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="py-12 space-y-8">
          <UserProfile
            user={profileData}
            isOwnProfile={isOwnProfile}
            onEdit={() => navigate('/profile/edit')}
          />
          <UserReviews reviews={reviews || []} loading={false} />
        </div>
      </Container>
    </div>
  );
};

export default Profile;
