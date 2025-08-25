import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import Avatar from '../shared/Avatar';
import { userData } from '../../data/mockData';

const Header = ({ onMenuToggle }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search courses, lessons..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* XP Display */}
          <div className="hidden sm:flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-lg">
            <Star className="text-yellow-500" size={16} />
            <span className="font-semibold text-blue-700">{userData.totalXP} XP</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Avatar */}
          <div className="flex items-center space-x-3">
            {/* Avatar: ensure no pixelation, round and object-cover */}
            <div className="w-10 h-10">
              <Avatar user={userData} size="sm" className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 shadow" />
            </div>
            <div className="hidden md:block">
              <p className="font-semibold text-gray-900">{userData.name}</p>
              <p className="text-sm text-gray-500">Level {userData.level}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Fix missing import
const Star = ({ className, size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export default Header;