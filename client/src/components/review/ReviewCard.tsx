import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import Avatar from '../common/Avatar';
import Card from '../common/Card';

interface ReviewCardProps {
  review: {
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
  };
  onMarkHelpful?: (reviewId: string) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onMarkHelpful }) => {
  return (
    <Card padding="md">
      <div className="flex items-start gap-4">
        <Avatar src={review.reviewer.avatar} fallback={review.reviewer.name} size="md" />
        
        <div className="flex-1">
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

          <p className="text-gray-600 dark:text-gray-400 mb-3">{review.comment}</p>

          {onMarkHelpful && (
            <button
              onClick={() => onMarkHelpful(review.id)}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#32b8c6] transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful ({review.helpfulCount || 0})</span>
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;
