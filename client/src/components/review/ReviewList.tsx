import React from 'react';
import { Star } from 'lucide-react';
import ReviewCard from './ReviewCard';
import Spinner from '../common/Spinner';

interface Review {
  id: string;
  reviewer: {
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  date: string;
  sessionTitle?: string;
  helpfulCount?: number;
}

interface ReviewListProps {
  reviews: Review[];
  loading?: boolean;
  onMarkHelpful?: (reviewId: string) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, loading, onMarkHelpful }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 dark:text-gray-400">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} onMarkHelpful={onMarkHelpful} />
      ))}
    </div>
  );
};

export default ReviewList;
