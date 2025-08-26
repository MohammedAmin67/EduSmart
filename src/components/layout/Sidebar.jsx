import React from 'react';
import {
  Home,
  BookOpen,
  BarChart3,
  Trophy,
  User,
  Settings,
  PlayCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menuVariants = {
  hidden: { x: -64, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 18, stiffness: 180 } },
  exit: { x: -64, opacity: 0, transition: { duration: 0.28 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.45 }
  }),
};

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

  // Glassmorphism/gradient/glow styles
  const sidebarBg =
    "bg-gradient-to-br from-white/80 via-blue-100/70 to-blue-200/50 backdrop-blur-2xl shadow-2xl border-r-0 border-blue-200/30";

  // Always visible on lg+ screens, controlled by isOpen on mobile
  const showSidebar = (typeof window === "undefined" || window.innerWidth >= 1024) ? true : isOpen;

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 lg:hidden z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(showSidebar) && (
          <motion.aside
            key="sidebar"
            className={`
              fixed top-0 left-0 h-full w-64 ${sidebarBg} z-[101]
              transform lg:relative lg:translate-x-0 flex flex-col
              border-r border-blue-200/30 transition-all
              ${isOpen ? 'shadow-2xl' : ''}
              max-w-full
              lg:translate-x-0
            `}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            {/* Close button for mobile */}
            <div className="flex items-center justify-between p-6 border-b border-blue-100/40 lg:hidden">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 via-blue-400 to-green-400 rounded-lg flex items-center justify-center shadow-md">
                <BookOpen className="text-white" size={20} />
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-blue-100/70 transition"
                aria-label="Close sidebar"
              >
                <X className="text-blue-700" size={22} />
              </button>
            </div>

            {/* Desktop Brand */}
            <div className="p-6 pb-1 border-b border-blue-100/40 hidden lg:flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 via-blue-400 to-green-400 rounded-lg flex items-center justify-center shadow-md">
                <BookOpen className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-blue-700 to-purple-600 text-transparent bg-clip-text">EduSmart</h1>
            </div>

            {/* Menu */}
            <nav className="mt-8 pt-3 pb-3 flex-1 overflow-y-auto">
              <ul className="space-y-3 px-2 sm:px-4">
                {menuItems.map((item, i) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                    >
                      <motion.button
                        onClick={() => handleItemClick(item.id)}
                        className={`
                          w-full flex items-center space-x-3 px-3 sm:px-4 py-3 rounded-xl
                          font-medium text-base transition-all duration-200 group
                          relative overflow-hidden
                          ${isActive
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-400/20 text-blue-700 shadow-[0_0_24px_4px_rgba(59,130,246,0.13)]'
                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-200/70 hover:to-purple-200/60 hover:text-blue-900'
                          }
                        `}
                        whileHover={{
                          scale: 1.045,
                          boxShadow: '0px 0px 20px 3px #6366f1',
                          transition: { duration: 0.18 }
                        }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <span className="relative">
                          <Icon
                            size={20}
                            className={`
                              ${isActive
                                ? 'text-blue-600 drop-shadow-[0_0_6px_#818cf8]'
                                : 'group-hover:text-blue-500 text-gray-500 transition'
                              }
                            `}
                          />
                          {/* No weird border for active */}
                        </span>
                        <span className="relative z-10">{item.label}</span>
                      </motion.button>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Learning Streak Widget */}
            <motion.div
              className="px-2 sm:px-4 py-7 mt-auto flex justify-center"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <motion.div
                className="bg-gradient-to-r from-orange-400 via-pink-500 to-red-500/90 p-4 rounded-2xl text-white flex flex-col items-center w-full shadow-lg border-2 border-white/10 backdrop-blur-lg relative"
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0px 0px 32px 12px #f59e42',
                  transition: { duration: 0.22 }
                }}
              >
                <span className="text-2xl font-bold drop-shadow-glow animate-fire">🔥</span>
                <span className="text-lg font-semibold mt-1 drop-shadow">7 Day Streak!</span>
                <span className="text-sm opacity-90">Keep it up!</span>
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-orange-400/50 rounded-full blur-xl opacity-60 pointer-events-none"></span>
              </motion.div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;