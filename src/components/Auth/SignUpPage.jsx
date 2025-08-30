import React, { useState, useContext } from 'react';
import { ChevronLeft, Sparkles, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../shared/Button';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../App';

const SignUpPage = ({ onBack, onSignUp }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [animating, setAnimating] = useState(false);
  const [fadeToDark, setFadeToDark] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      if (onSignUp) onSignUp();
    }, 1200);
  };

  const handleDarkToggle = () => {
    setFadeToDark(!darkMode);
    setAnimating(true);
    setTimeout(() => {
      toggleDarkMode();
      setTimeout(() => setAnimating(false), 400);
    }, 60);
  };

  return (
    <div className="bg-gradient-to-br from-fuchsia-100 via-white to-pink-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen flex items-center justify-center relative overflow-x-hidden font-display transition-colors duration-500">
      <AnimatePresence>
        {animating && (
          <motion.div
            className="fixed inset-0 z-[999] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              background: fadeToDark
                ? "rgba(24,24,37,0.92)"
                : "rgba(255,255,255,0.92)"
            }}
          />
        )}
      </AnimatePresence>
      {/* Decorative SVGs */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 1440 480" fill="none">
        <motion.ellipse
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 0.45, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          cx="300" cy="100" rx="250" ry="80" fill="#fce7f3"
        />
        <motion.ellipse
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          cx="1200" cy="400" rx="200" ry="60" fill="#a7f3d0"
        />
        <motion.ellipse
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.19, scale: 1 }}
          transition={{ duration: 1.3, delay: 1 }}
          cx="600" cy="380" rx="300" ry="140" fill="#fbcfe8"
        />
      </svg>
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1 }}
        className="z-10 w-full max-w-md mx-auto bg-white/80 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border-0 transition-colors duration-500"
      >
        <div className="flex items-center mb-8 justify-between">
          <span className="flex items-center gap-2">
            <Sparkles className="text-pink-600" size={28} />
            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-fuchsia-500 tracking-tight drop-shadow-xl">EduSmart</span>
          </span>
          <div className="flex gap-2">
            <motion.button
              onClick={onBack}
              className="mr-1 p-2 rounded-full bg-fuchsia-100 dark:bg-gray-700 hover:bg-pink-200 dark:hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.12 }}
              aria-label="Back"
              type="button"
            >
              <ChevronLeft className="text-pink-600 dark:text-fuchsia-200" size={22} />
            </motion.button>
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-3 drop-shadow-2xl text-center">Create Your Free Account</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8 text-center">Start your learning journey with EduSmart today!</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-3 rounded-lg bg-fuchsia-50 dark:bg-gray-800 border border-pink-200 dark:border-gray-800 focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 transition outline-none text-gray-900 dark:text-gray-100 font-medium"
              placeholder="Your full name"
              required
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 rounded-lg bg-fuchsia-50 dark:bg-gray-800 border border-pink-200 dark:border-gray-800 focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 transition outline-none text-gray-900 dark:text-gray-100 font-medium"
              placeholder="you@email.com"
              required
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 rounded-lg bg-fuchsia-50 dark:bg-gray-800 border border-pink-200 dark:border-gray-800 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition outline-none text-gray-900 dark:text-gray-100 font-medium"
              placeholder="••••••••"
              required
              value={form.password}
              onChange={handleChange}
              minLength={6}
              autoComplete="new-password"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-pink-600 via-fuchsia-500 to-yellow-400 text-white text-lg px-6 py-3 rounded-full font-bold hover:from-fuchsia-600 hover:to-pink-500 transition-all duration-700 shadow-xl animate-glow"
            disabled={submitting}
          >
            {submitting ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
        <div className="mt-6 text-center text-gray-500 dark:text-gray-300">
          Already have an account?{" "}
          <button
            type="button"
            className="text-pink-600 dark:text-pink-300 hover:underline font-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </motion.div>
      {/* Decorative blobs */}
      <motion.div
        className="absolute right-0 bottom-0 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-fuchsia-200 dark:bg-fuchsia-900 rounded-full opacity-30 blur-2xl pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.1, delay: 0.8 }}
      ></motion.div>
      <motion.div
        className="absolute left-0 top-0 w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 bg-pink-200 dark:bg-pink-900 rounded-full opacity-25 blur-2xl pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.25 }}
        transition={{ duration: 1.1, delay: 0.6 }}
      ></motion.div>
    </div>
  );
};

export default SignUpPage;