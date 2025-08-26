import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import Avatar from '../shared/Avatar';
import { userData } from '../../data/mockData';
import { motion, useAnimation } from 'framer-motion';

// Animated gradient logo
const AnimatedLogo = () => (
  <motion.div
    initial={{ scale: 0.8, rotate: -10, opacity: 0.4 }}
    animate={{ scale: 1, rotate: 0, opacity: 1 }}
    whileHover={{
      scale: 1.12,
      rotate: 7,
      boxShadow: '0px 0px 28px 8px #6366f1',
      transition: { type: 'spring', stiffness: 220 }
    }}
    transition={{ type: 'spring', stiffness: 220, damping: 14 }}
    className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 via-blue-400 to-green-400 flex items-center justify-center shadow-xl"
  >
    <motion.span
      className="block"
      animate={{
        scale: [1, 1.11, 1],
        rotate: [0, 8, -8, 0],
        filter: [
          "drop-shadow(0 0 0px #6366f1)", "drop-shadow(0 0 9px #6366f1)", "drop-shadow(0 0 0px #6366f1)"
        ]
      }}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }}
    >
      <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
        <path d="M3 6.75C3 5.23122 4.23122 4 5.75 4H18.25C19.7688 4 21 5.23122 21 6.75V17.25C21 18.7688 19.7688 20 18.25 20H5.75C4.23122 20 3 18.7688 3 17.25V6.75Z" fill="url(#a)" />
        <path d="M7 8H17M7 12H13" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <defs>
          <linearGradient id="a" x1="3" y1="4" x2="21" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>
    </motion.span>
  </motion.div>
);

// XP star
const Star = ({ className, size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const Header = ({ onMenuToggle }) => {
  const [shadow, setShadow] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 8) {
        setShadow(true);
        controls.start({ boxShadow: "0 2px 24px 0 rgba(59,130,246,0.15)", backgroundColor: "rgba(255,255,255,0.93)" });
      } else {
        setShadow(false);
        controls.start({ boxShadow: "0 0px 0px 0 rgba(0,0,0,0)", backgroundColor: "rgba(255,255,255,0.99)" });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <motion.header
      className={`border-b border-blue-100/40 px-2 sm:px-4 py-2 sm:py-3 sticky top-0 z-40 w-full transition-shadow backdrop-blur-lg`}
      animate={controls}
      initial={{ boxShadow: "0 0px 0px 0 rgba(0,0,0,0)", backgroundColor: "rgba(255,255,255,0.99)" }}
      style={{ WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile menu button */}
          <motion.button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-blue-100/60 transition"
            whileTap={{ scale: 0.94 }}
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </motion.button>

          {/* Animated logo */}
          <div className="flex items-center space-x-2">
            <AnimatedLogo />
          </div>

          {/* Desktop search bar */}
          <motion.div
            className="hidden md:flex items-center space-x-2 ml-3 sm:ml-5"
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="relative w-36 sm:w-48 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
              <input
                type="text"
                placeholder="Search courses, lessons..."
                className="pl-10 pr-4 py-2 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full bg-white/90 transition"
              />
            </div>
          </motion.div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* XP Display */}
          <motion.div
            className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-blue-200 px-2 sm:px-3 py-1 rounded-lg shadow font-semibold"
            initial={{ y: -13, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.45 }}
          >
            <Star className="text-yellow-400 drop-shadow" size={16} />
            <span className="font-semibold text-blue-700 text-sm">{userData.totalXP} XP</span>
          </motion.div>

          {/* Notifications */}
          <motion.button
            className="relative p-2 rounded-lg hover:bg-blue-100/40 transition group"
            whileHover={{ scale: 1.11, boxShadow: '0px 0px 16px 0 #818cf8' }}
            whileTap={{ scale: 0.92 }}
            aria-label="Notifications"
          >
            <Bell size={20} className="text-blue-600 group-hover:text-blue-800 transition" />
            <motion.span
              className="absolute -top-1 -right-1 bg-gradient-to-tr from-pink-500 to-yellow-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-white shadow-xl animate-bounce"
              animate={{ scale: [1, 1.16, 1], rotate: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              3
            </motion.span>
          </motion.button>

          {/* User Avatar & info */}
          <motion.div
            className="flex items-center space-x-1 sm:space-x-3"
            initial={{ x: 18, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.23, duration: 0.5 }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10">
              <Avatar user={userData} size="sm" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-blue-300 shadow hover:ring-2 hover:ring-blue-400 transition" />
            </div>
            <div className="hidden md:block">
              <motion.p
                className="font-semibold text-gray-900"
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.34, duration: 0.3 }}
              >
                {userData.name}
              </motion.p>
              <motion.p
                className="text-sm text-blue-500 font-medium"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                Level {userData.level}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;