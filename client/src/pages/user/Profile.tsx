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

  const { profile, loading } = useAppSelector((state) => state.user);
  const { reviews } = useAppSelector((state) => state.review);
  const currentUser = useAppSelector((state) => state.auth.user);

  const isOwnProfile = !userId || userId === currentUser?.id;

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
      dispatch(getReviewsByExpert(userId));
    }
  }, [dispatch, userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black">
        <Container>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white">Profile not found</h2>
          </div>
        </Container>
      </div>
    );
  }

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
            user={profile}
            isOwnProfile={isOwnProfile}
            onEdit={() => navigate('/profile/edit')}
          />
          <UserReviews reviews={reviews} loading={false} />
        </div>
      </Container>
    </div>
  );
};

export default Profile;
