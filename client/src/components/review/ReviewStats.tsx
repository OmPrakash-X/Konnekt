// ReviewStats.tsx
import React from 'react';
import { Star } from 'lucide-react';
import Card from '../common/Card';

interface ReviewStatsProps {
  stats: {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
}

const ReviewStats: React.FC<ReviewStatsProps> = ({ stats }) => {
  const maxCount = Math.max(...Object.values(stats.ratingDistribution));

  return (
    <Card>
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-5xl font-bold text-gray-900 dark:text-white">
            {stats.averageRating.toFixed(1)}
          </span>
          <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Based on {stats.totalReviews} {stats.totalReviews === 1 ? 'review' : 'reviews'}
        </p>
      </div>

      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((stars) => {
          const count = stats.ratingDistribution[stars as keyof typeof stats.ratingDistribution];
          const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

          return (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-8">
                {stars}★
              </span>
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ReviewStats;
