import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  padding = 'default',
  shadow = 'default',
  hover = false,
  onClick = null
}) => {
  const baseClasses = 'bg-white rounded-xl border border-gray-200 transition-all duration-200';
  
  const paddings = {
    none: '',
    sm: 'p-3',
    default: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };
  
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };
  
  const hoverEffect = hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';
  const clickable = onClick ? 'cursor-pointer' : '';
  
  const classes = `${baseClasses} ${paddings[padding]} ${shadows[shadow]} ${hoverEffect} ${clickable} ${className}`;
  
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;