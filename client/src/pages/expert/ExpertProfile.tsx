import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserProfile } from '../../redux/features/userSlice';
import { getReviewsByExpert } from '../../redux/features/reviewSlice';
import UserProfile from '../../components/user/UserProfile';
import UserReviews from '../../components/user/UserReviews';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';

const ExpertProfile: React.FC = () => {
  const { expertId } = useParams<{ expertId: string }>();
  const dispatch = useAppDispatch();
  const { profile, loading: userLoading } = useAppSelector((state) => state.user);
  const { reviews, loading: reviewsLoading } = useAppSelector((state) => state.review);

  useEffect(() => {
    if (expertId) {
      dispatch(getUserProfile(expertId));
      dispatch(getReviewsByExpert(expertId));
    }
  }, [dispatch, expertId]);

  if (userLoading) {
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Expert not found
          </h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-12 space-y-8">
        <UserProfile user={profile} isOwnProfile={false} />
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Reviews
          </h2>
          <UserReviews reviews={reviews} loading={reviewsLoading} />
        </div>
      </div>
    </Container>
  );
};

export default ExpertProfile;
