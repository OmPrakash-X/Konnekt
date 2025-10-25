import React from 'react';
import { Star } from 'lucide-react';
import Avatar from '../common/Avatar';

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
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Reviews</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded w-32 mb-2" />
                  <div className="h-3 bg-gray-700 rounded w-24" />
                </div>
              </div>
              <div className="h-4 bg-gray-700 rounded w-full mb-2" />
              <div className="h-4 bg-gray-700 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Reviews</h3>
        <div className="text-center py-8">
          <Star className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-400">No reviews yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Reviews</h3>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <Avatar
                src={review.reviewer.avatar}
                fallback={review.reviewer.name}
                size="md"
              />
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-white">
                      {review.reviewer.name}
                    </h4>
                    {review.sessionTitle && (
                      <p className="text-sm text-gray-400">{review.sessionTitle}</p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
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
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-300">
                    {review.rating.toFixed(1)}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-gray-300">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
