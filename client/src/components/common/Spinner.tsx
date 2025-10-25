import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4',
  };

  const colors = {
    primary: 'border-[#32b8c6] border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-300 dark:border-gray-600 border-t-transparent',
  };

  return (
    <div className={`inline-block ${sizes[size]} rounded-full animate-spin ${colors[color]} ${className}`} />
  );
};

export default Spinner;
