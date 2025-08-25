import React from 'react';
import { BookOpen, Zap, TrendingUp, ShieldCheck, ChevronDown } from 'lucide-react';
import Button from '../shared/Button';
import Card from '../shared/Card';

// Decorative background SVGs
const HeroShapes = () => (
  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 1440 480" fill="none">
    <ellipse cx="300" cy="100" rx="250" ry="80" fill="#dbeafe" opacity="0.45" />
    <ellipse cx="1200" cy="400" rx="200" ry="60" fill="#a7f3d0" opacity="0.4" />
    <ellipse cx="600" cy="380" rx="300" ry="140" fill="#c7d2fe" opacity="0.25" />
  </svg>
);

const FeatureCard = ({ icon, title, description }) => {
  const Icon = icon;
  return (
    <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 bg-gradient-to-b from-white to-blue-50 border-0 rounded-2xl relative overflow-hidden">
      <div className="relative inline-block mb-5">
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full blur-sm opacity-50"></span>
        <div className="bg-blue-100 rounded-full p-4 inline-block shadow-md">
          <Icon className="text-blue-600" size={32} />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Card>
  );
};

const HomePage = ({ onLogin }) => {
  return (
    <div className="bg-gray-50 min-h-screen relative overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-400 to-green-400 rounded-lg flex items-center justify-center shadow-md">
              <BookOpen className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">EduSmart</h1>
          </div>
          <Button
            className="shadow-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2"
            onClick={onLogin}
          >
            Login to Dashboard
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 pb-24 pt-16">
        <HeroShapes />
        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 animate-fadeInUp">
              <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm shadow-sm mb-2">
                New: Gamified Learning
              </span>
              <h2 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight drop-shadow-lg">
                Unlock Your <span className="text-blue-600">Potential</span> with EduSmart
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                A vibrant platform designed to make education <span className="font-semibold text-blue-600">engaging</span>, fun, and effective.<br />
                Track your progress, earn achievements, and master new skills.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-500 text-white text-lg px-8 py-3 shadow-xl hover:scale-105 transition-transform"
                onClick={onLogin}
              >
                Start Learning Now
              </Button>
            </div>
            <div className="mt-10 animate-bounce">
              <ChevronDown className="text-blue-400 w-8 h-8" />
            </div>
          </div>
        </div>
        {/* Visual mockup cards */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 z-0 flex gap-8 opacity-70 pointer-events-none">
          <div className="w-52 h-36 bg-white rounded-2xl shadow-xl border-4 border-blue-200 rotate-[-8deg]"></div>
          <div className="w-52 h-36 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-2xl shadow-xl border-0 rotate-3"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-extrabold text-gray-900 mb-3">Why Choose EduSmart?</h3>
            <p className="text-gray-600 mt-2 text-lg">Everything you need to succeed in your learning journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <FeatureCard
              icon={Zap}
              title="Interactive Learning"
              description="Engage with interactive quizzes, hands-on exercises, and real-world challenges."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Track Your Progress"
              description="Visualize your growth with beautiful analytics and detailed reports."
            />
            <FeatureCard
              icon={BookOpen}
              title="Comprehensive Courses"
              description="Access a wide range of courses for all levels, from beginner to advanced."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Gamified Experience"
              description="Earn XP, unlock achievements, and level up as you learn—all while having fun!"
            />
          </div>
        </div>
        {/* Decorative gradient blob */}
        <div className="absolute right-0 top-2/3 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-2xl pointer-events-none"></div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-700">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white text-2xl md:text-3xl font-bold mb-4 md:mb-0">
            Ready to get started? <span className="text-yellow-300">Join EduSmart today!</span>
          </div>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-500 text-white text-lg px-8 py-3 shadow-xl hover:scale-105 transition-transform"
            onClick={onLogin}
          >
            Create Your Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <BookOpen className="text-blue-400" size={20} />
            <span className="font-bold text-xl">EduSmart</span>
          </div>
          <p className="mb-3 text-gray-400">&copy; 2025 EduSmart. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-2">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 rounded-full"></div>
      </footer>
    </div>
  );
};

export default HomePage;