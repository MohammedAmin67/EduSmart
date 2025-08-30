import React from 'react';
import {
  Home,
  BookOpen,
  BarChart3,
  Trophy,
  User,
  Settings,
  PlayCircle,
  X,
  Sparkles,
  Flame,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menuVariants = {
  hidden: { 
    x: -320, 
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { 
      type: 'spring', 
      damping: 25, 
      stiffness: 200,
      staggerChildren: 0.05
    } 
  },
  exit: { 
    x: -320, 
    opacity: 0, 
    transition: { duration: 0.25, ease: "easeInOut" } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { 
      delay: i * 0.05, 
      duration: 0.4,
      ease: "easeOut"
    }
  }),
};

// Enhanced streak widget with more animations
const StreakWidget = () => (
  <motion.div
    className="mx-4 mb-6 p-4 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-2xl shadow-lg relative overflow-hidden"
    whileHover={{ scale: 1.02, y: -2 }}
    transition={{ duration: 0.3 }}
  >
    {/* Animated background elements */}
    <div className="absolute inset-0">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          style={{
            left: `${20 + i * 12}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
        />
      ))}
    </div>
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-2">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Flame className="w-6 h-6 text-white" />
        </motion.div>
        <motion.div
          className="text-2xl font-bold text-white"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          7
        </motion.div>
      </div>
      <div className="text-white font-bold text-sm mb-1">Day Streak!</div>
      <div className="text-orange-100 text-xs">Keep the momentum going!</div>
      
      {/* Progress bar */}
      <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "85%" }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>
    </div>
  </motion.div>
);

// Enhanced brand logo
const BrandLogo = () => (
  <motion.div
    className="flex items-center space-x-3 px-4 py-6 border-b border-blue-200/30"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
      whileHover={{ rotate: 360, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <Sparkles className="w-6 h-6 text-white relative z-10" />
    </motion.div>
    <motion.span
      className="font-bold text-xl text-gray-800 dark:text-gray-100"
      animate={{
        backgroundImage: [
          "linear-gradient(45deg, #3B82F6, #8B5CF6)",
          "linear-gradient(45deg, #8B5CF6, #EC4899)",
          "linear-gradient(45deg, #EC4899, #3B82F6)",
        ],
      }}
      transition={{ duration: 3, repeat: Infinity }}
      style={{
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
    >
      EduSmart
    </motion.span>
  </motion.div>
);

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
    { id: 'learning', label: 'Learning', icon: PlayCircle, badge: '3' },
    { id: 'courses', label: 'My Courses', icon: BookOpen, badge: null },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: 'New' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, badge: '2' },
    { id: 'profile', label: 'Profile', icon: User, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null }
  ];

  const handleItemClick = (itemId) => {
    setActiveTab(itemId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  // Enhanced glassmorphism styles
  const sidebarBg = "bg-gradient-to-br from-white/95 via-blue-50/90 to-blue-100/80 dark:from-gray-950 dark:via-blue-900 dark:to-blue-950 backdrop-blur-2xl shadow-2xl border-r border-blue-200/30 dark:border-blue-900/30 transition-colors duration-500";

  // Always visible on lg+ screens, controlled by isOpen on mobile
  const showSidebar = (typeof window === "undefined" || window.innerWidth >= 1024) ? true : isOpen;

  return (
    <>
      {/* Enhanced overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Enhanced Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            className={`fixed rounded-sm left-0 top-0 h-full w-80 z-50 ${sidebarBg} lg:relative lg:z-auto`}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Enhanced close button for mobile */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-700/30 transition-colors duration-200 lg:hidden z-10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>

            {/* Brand Logo */}
            <BrandLogo />

            {/* Enhanced Navigation Menu */}
            <nav className="flex-1 py-6">
              <div className="space-y-2 px-4">
                {menuItems.map((item, i) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      custom={i}
                      variants={itemVariants}
                      onClick={() => handleItemClick(item.id)}
                      className={`
                        w-full flex items-center justify-between px-4 py-4 rounded-2xl
                        font-semibold text-base transition-all duration-300 group
                        relative overflow-hidden
                        ${isActive
                          ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/15 to-blue-500/20 text-blue-700 dark:text-blue-300 shadow-lg shadow-blue-500/25'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-200/50 hover:to-purple-200/40 hover:dark:from-blue-900/40 hover:dark:to-purple-900/40 hover:text-blue-900 dark:hover:text-blue-100 hover:shadow-md'
                        }
                      `}
                      whileHover={{
                        scale: 1.02,
                        x: 4,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Animated background for active state */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl"
                          layoutId="activeTab"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                        animate={isActive ? { opacity: 0.3 } : { opacity: 0 }}
                      />
                      
                      <div className="flex items-center space-x-4 relative z-10">
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-200'}`} />
                        </motion.div>
                        <span className="relative">
                          {item.label}
                          {isActive && (
                            <motion.div
                              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              layoutId="underline"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                        </span>
                      </div>
                      
                      {/* Enhanced badges */}
                      {item.badge && (
                        <motion.div
                          className={`
                            px-2.5 py-1 rounded-full text-xs font-bold relative z-10
                            ${item.badge === 'New' 
                              ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
                              : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                            }
                          `}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 500 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {item.badge}
                          
                          {/* Pulse effect for new items */}
                          {item.badge === 'New' && (
                            <motion.div
                              className="absolute inset-0 bg-green-400 rounded-full"
                              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </nav>

            {/* Enhanced Learning Streak Widget */}
            <StreakWidget />
            
            {/* Bottom decoration */}
            <motion.div
              className="px-4 pb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-center space-x-1 text-gray-400 dark:text-gray-500">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      delay: i * 0.2 
                    }}
                  >
                    <Star className="w-3 h-3 fill-current" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;