import React from 'react';
import { Star } from 'lucide-react';
import Avatar from '../common/Avatar';
import Card from '../common/Card';

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
}

interface UserReviewsProps {
  reviews: Review[];
  loading?: boolean;
}

const UserReviews: React.FC<UserReviewsProps> = ({ reviews, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} padding="md">
            <div className="animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-2" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24" />
                </div>
              </div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <Card padding="lg">
        <div className="text-center py-8">
          <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">No reviews yet</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} padding="md">
          <div className="flex items-start gap-4">
            <Avatar src={review.reviewer.avatar} fallback={review.reviewer.name} size="md" />
            
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {review.reviewer.name}
                  </h4>
                  {review.sessionTitle && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {review.sessionTitle}
                    </p>
                  )}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {review.rating.toFixed(1)}
                </span>
              </div>

              {/* Comment */}
              <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default UserReviews;
