// RatingStars.tsx
import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, size = 'md', showValue = false }) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizes[size]} ${
            i < Math.floor(rating)
              ? 'text-yellow-500 fill-yellow-500'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      ))}
      {showValue && (
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
