import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!profile) {
    return (
      <Container>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profile not found
          </h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-12 space-y-8">
        <UserProfile user={profile} isOwnProfile={isOwnProfile} />
        <UserReviews reviews={reviews} loading={false} />
      </div>
    </Container>
  );
};

export default Profile;
