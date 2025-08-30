import React from 'react';
import { User } from 'lucide-react';

const Avatar = ({ user, size = 'lg', showLevel = true, animated = false }) => {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };

  const getAvatarColor = (level) => {
    if (level >= 20) return 'bg-gradient-to-br from-purple-500 to-pink-500';
    if (level >= 15) return 'bg-gradient-to-br from-blue-500 to-purple-500';
    if (level >= 10) return 'bg-gradient-to-br from-green-500 to-blue-500';
    if (level >= 5) return 'bg-gradient-to-br from-yellow-400 to-orange-500';
    return 'bg-gradient-to-br from-gray-400 to-gray-600';
  };

  return (
    <div className="relative">
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className={`${sizes[size]} rounded-full object-cover border-2 border-blue-300 shadow-lg ${animated ? 'transition-all duration-300 hover:scale-105' : ''}`}
        />
      ) : (
        <div className={`${sizes[size]} ${getAvatarColor(user.level)} rounded-full flex items-center justify-center text-white shadow-lg ${animated ? 'transition-all duration-300 hover:scale-105' : ''}`}>
          <User size={size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 24 : 28} />
        </div>
      )}
      {showLevel && (
        <div className="absolute -bottom-1 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
          {user.level}
        </div>
      )}
    </div>
  );
};

export default Avatar;