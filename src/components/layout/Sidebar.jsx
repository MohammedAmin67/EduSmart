import React from 'react';
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  Trophy, 
  User, 
  Settings,
  PlayCircle 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'learning', label: 'Learning', icon: PlayCircle },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleItemClick = (itemId) => {
    setActiveTab(itemId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:z-auto
        flex flex-col
      `}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-900">EduSmart</h1>
          </div>
        </div>

        <nav className="mt-8 flex-1">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Learning Streak Widget */}
        <div className="px-4 py-5 mt-auto flex justify-center">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 p-4 rounded-xl text-white flex flex-col items-center w-full shadow-md">
            <span className="text-2xl font-bold">🔥</span>
            <span className="text-lg font-semibold mt-1">7 Day Streak!</span>
            <span className="text-sm opacity-90">Keep it up!</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;