import React from 'react';

const ProgressBar = ({ 
  progress = 0, 
  max = 100, 
  color = 'blue',
  size = 'md',
  showPercentage = false,
  animated = false,
  className = ''
}) => {
  const percentage = Math.min((progress / max) * 100, 100);
  
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    indigo: 'bg-indigo-500'
  };
  
  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6'
  };
  
  const animatedClass = animated ? 'transition-all duration-500 ease-out' : '';
  
  return (
    <div className={`w-full ${className}`}>
      <div className={`bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <div 
          className={`${colors[color]} ${sizes[size]} rounded-full ${animatedClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;