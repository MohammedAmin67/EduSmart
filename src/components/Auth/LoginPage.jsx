import React, { useState } from 'react';
import { BookOpen, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../shared/Button';

const LoginPage = ({ onBack, onLogin, onGoToSignUp }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      if (onLogin) onLogin();
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-purple-100 min-h-screen flex items-center justify-center relative overflow-x-hidden">
      {/* Decorative SVGs */}
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
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1 }}
        className="z-10 w-full max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border-0"
      >
        <div className="flex items-center mb-8">
          <motion.button
            onClick={onBack}
            className="mr-3 p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
            whileHover={{ scale: 1.12 }}
            aria-label="Back"
            type="button"
          >
            <ChevronLeft className="text-blue-600" size={22} />
          </motion.button>
          <span className="flex items-center gap-2">
            <BookOpen className="text-blue-600" size={28} />
            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 tracking-tight drop-shadow-xl">EduSmart</span>
          </span>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3 drop-shadow-2xl text-center">Login to EduSmart</h2>
        <p className="text-gray-700 mb-8 text-center">Welcome back! Please login to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none text-gray-900 font-medium"
              placeholder="you@email.com"
              required
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition outline-none text-gray-900 font-medium"
              placeholder="••••••••"
              required
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 text-white text-lg px-6 py-3 rounded-full font-bold hover:from-purple-600 hover:to-blue-500 transition-all duration-300 shadow-xl animate-glow"
            disabled={submitting}
          >
            {submitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="mt-6 text-center text-gray-500">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline font-semibold"
            onClick={onGoToSignUp}
          >
            Create One
          </button>
        </div>
      </motion.div>
      {/* Decorative blobs */}
      <motion.div
        className="absolute right-0 bottom-0 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-purple-200 rounded-full opacity-30 blur-2xl pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.1, delay: 0.8 }}
      ></motion.div>
      <motion.div
        className="absolute left-0 top-0 w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 bg-blue-300 rounded-full opacity-25 blur-2xl pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.25 }}
        transition={{ duration: 1.1, delay: 0.6 }}
      ></motion.div>
    </div>
  );
};

export default LoginPage;