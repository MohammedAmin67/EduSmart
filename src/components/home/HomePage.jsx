import React from 'react';
import { BookOpen, Zap, TrendingUp, ShieldCheck, ChevronDown } from 'lucide-react';
import Button from '../shared/Button';
import Card from '../shared/Card';
import { motion } from 'framer-motion';

// Decorative animated SVGs
const HeroShapes = () => (
  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 1440 480" fill="none">
    <motion.ellipse
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 0.45, y: 0 }}
      transition={{ duration: 1.2, delay: 0.1 }}
      cx="300" cy="100" rx="250" ry="80" fill="#dbeafe"
    />
    <motion.ellipse
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 0.4, x: 0 }}
      transition={{ duration: 1.2, delay: 0.7 }}
      cx="1200" cy="400" rx="200" ry="60" fill="#a7f3d0"
    />
    <motion.ellipse
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 0.25, scale: 1 }}
      transition={{ duration: 1.3, delay: 1 }}
      cx="600" cy="380" rx="300" ry="140" fill="#c7d2fe"
    />
  </svg>
);

const FeatureCard = ({ icon, title, description, i }) => {
  const Icon = icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: i * 0.15 }}
    >
      <Card className="text-center p-6 md:p-8 hover:shadow-[0_0_28px_6px_rgba(56,189,248,0.25)] bg-gradient-to-b from-white/80 to-blue-50/80 border-0 rounded-2xl relative overflow-hidden backdrop-blur-md transition-all duration-300 group">
        <div className="relative inline-block mb-5">
          <motion.span
            className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full blur-xl opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all"
            layoutId={`glow-${title}`}
          ></motion.span>
          <div className="bg-blue-100 rounded-full p-4 inline-block shadow-lg group-hover:shadow-blue-300/80 transition-all duration-300">
            <Icon className="text-blue-600 group-hover:text-blue-800" size={32} />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 drop-shadow">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </Card>
    </motion.div>
  );
};

const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: i => ({
    opacity: 1, y: 0, transition: { delay: i * 0.18, duration: 0.85, type: 'spring' }
  })
};

const HomePage = ({ onLogin }) => {
  // Smooth scroll to features
  const scrollToFeatures = () => {
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-purple-100 min-h-screen relative overflow-x-hidden">
      {/* Header */}
      <header className="bg-white/80 shadow-lg sticky top-0 z-50 backdrop-blur-lg transition-shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 210, damping: 12, delay: 0.3 }}
            className="flex items-center space-x-2"
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-400 to-green-400 rounded-lg flex items-center justify-center shadow-md"
              whileHover={{ scale: 1.13, boxShadow: '0px 0px 16px 2px #38bdf8' }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <BookOpen className="text-white" size={24} />
            </motion.div>
            {/* Hide brand on mobile, show on md+ */}
            <span className="hidden md:inline text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 tracking-tight drop-shadow-xl">EduSmart</span>
          </motion.div>
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7, type: 'spring' }}
          >
            <Button
              className="shadow-lg bg-gradient-to-r from-blue-600 to-purple-500 hover:from-purple-600 hover:to-blue-500 text-white px-4 md:px-6 py-2 rounded-full font-semibold text-base tracking-wide transition-transform transform hover:scale-105 focus:ring-4 focus:ring-purple-300"
              onClick={onLogin}
            >
              Login to Dashboard
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-purple-50 pb-24 pt-14 sm:pt-20 md:pt-24 overflow-hidden">
        <HeroShapes />
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.10, delayChildren: 0.1 } }
            }}
            className="flex flex-col items-center text-center"
          >
            <motion.div variants={heroVariants} custom={0} className="mb-5 md:mb-7">
              <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-100 to-blue-300 text-blue-700 font-semibold text-sm shadow-sm mb-2 animate-pulse">
                New: Gamified Learning
              </span>
            </motion.div>
            <motion.h2
              variants={heroVariants}
              custom={1}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight drop-shadow-2xl"
            >
              Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 animate-gradient-x">Potential</span> with <span className="text-blue-600">EduSmart</span>
            </motion.h2>
            <motion.p
              variants={heroVariants}
              custom={2}
              className="text-md sm:text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
            >
              A vibrant platform designed to make education <span className="font-semibold text-blue-600">engaging</span>, fun, and effective.<br />
              Track your progress, earn achievements, and master new skills.
            </motion.p>
            <motion.div
              variants={heroVariants}
              custom={3}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 text-white text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 shadow-2xl rounded-full font-bold blur-[0.5px] hover:from-purple-600 hover:to-blue-500 transition-all duration-300 hover:shadow-[0_0_32px_14px_rgba(168,85,247,0.2)] animate-glow"
                onClick={onLogin}
              >
                Start Learning Now
              </Button>
            </motion.div>
            <motion.div
              variants={heroVariants}
              custom={4}
              className="mt-8 md:mt-12"
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <button onClick={scrollToFeatures} aria-label="Scroll to features">
                <ChevronDown className="text-blue-400 w-8 h-8 sm:w-10 sm:h-10 drop-shadow-lg animate-bounce" />
              </button>
            </motion.div>
          </motion.div>
        </div>
        {/* Visual mockup cards */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 z-0 flex gap-4 sm:gap-8 opacity-80 pointer-events-none">
          <motion.div
            initial={{ scale: 0.8, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: -8, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.1, type: 'spring' }}
            className="w-28 h-20 sm:w-40 sm:h-32 md:w-52 md:h-36 bg-white/80 rounded-2xl shadow-2xl border-4 border-blue-200 drop-shadow-xl backdrop-blur-2xl"
          ></motion.div>
          <motion.div
            initial={{ scale: 0.7, rotate: 14, opacity: 0 }}
            animate={{ scale: 1, rotate: 3, opacity: 1 }}
            transition={{ delay: 1.3, duration: 1.1, type: 'spring' }}
            className="w-28 h-20 sm:w-40 sm:h-32 md:w-52 md:h-36 bg-gradient-to-tr from-blue-200/60 via-purple-300/50 to-pink-200/40 rounded-2xl shadow-2xl border-0 drop-shadow-md backdrop-blur-xl"
          ></motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-20 sm:py-28 md:py-32 bg-gradient-to-b from-white/90 to-blue-50/80 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 sm:mb-16 md:mb-20"
          >
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 drop-shadow-lg">Why Choose EduSmart?</h3>
            <p className="text-gray-600 mt-2 text-base sm:text-lg">Everything you need to succeed in your learning journey.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {[
              {
                icon: Zap,
                title: "Interactive Learning",
                description: "Engage with interactive quizzes, hands-on exercises, and real-world challenges."
              },
              {
                icon: TrendingUp,
                title: "Track Your Progress",
                description: "Visualize your growth with beautiful analytics and detailed reports."
              },
              {
                icon: BookOpen,
                title: "Comprehensive Courses",
                description: "Access a wide range of courses for all levels, from beginner to advanced."
              },
              {
                icon: ShieldCheck,
                title: "Gamified Experience",
                description: "Earn XP, unlock achievements, and level up as you learn—all while having fun!"
              },
            ].map((props, i) => (
              <FeatureCard {...props} key={props.title} i={i} />
            ))}
          </div>
        </div>
        {/* Decorative gradient blobs */}
        <motion.div
          className="absolute right-0 top-2/3 w-44 h-44 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-200 rounded-full opacity-40 blur-2xl pointer-events-none"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.6 }}
        ></motion.div>
        <motion.div
          className="absolute left-0 bottom-0 w-32 h-32 sm:w-52 sm:h-52 md:w-80 md:h-80 bg-blue-300 rounded-full opacity-30 blur-2xl pointer-events-none"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.7 }}
        ></motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 shadow-xl relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8"
        >
          <div className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-0 drop-shadow-2xl text-center md:text-left">
            Ready to get started? <span className="text-yellow-300 animate-glow">Join EduSmart today!</span>
          </div>
          <motion.div whileHover={{ scale: 1.07, boxShadow: '0px 0px 36px 8px #facc15' }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 via-purple-500 to-yellow-400 text-white text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 shadow-2xl rounded-full font-bold hover:from-purple-600 hover:to-blue-500 transition-all duration-300 animate-glow"
              onClick={onLogin}
            >
              Create Your Free Account
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-12 sm:h-16 md:h-24 bg-gradient-to-r from-blue-400 via-purple-400 to-yellow-200 opacity-20 blur-2xl rounded-full"
          initial={{ scaleX: 0.7, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.18 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.3 }}
        ></motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/90 text-white py-8 sm:py-10 md:py-12 relative backdrop-blur-lg border-t border-blue-900/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-3 flex items-center justify-center gap-2"
          >
            <BookOpen className="text-blue-400" size={20} />
            <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">EduSmart</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 0.7, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-3 text-gray-400 text-sm sm:text-base"
          >
            &copy; 2025 EduSmart. All rights reserved.
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-2">
            {["Privacy Policy", "Terms of Service", "Contact"].map(label => (
              <motion.a
                key={label}
                href="#"
                className="hover:text-blue-400 transition-colors font-semibold"
                whileHover={{ scale: 1.12, color: "#38bdf8" }}
                transition={{ type: 'spring', stiffness: 350 }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </div>
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 opacity-40 rounded-full"
          initial={{ scaleX: 0.2, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
        ></motion.div>
      </footer>
    </div>
  );
};

export default HomePage;