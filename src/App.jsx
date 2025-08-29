import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import ProgressOverview from './components/dashboard/ProgressOverview';
import ContinueLearning from './components/dashboard/ContinueLearning';
import AnalyticsCharts from './components/analytics/AnalyticsCharts';
import LessonPlayer from './components/learning/LessonPlayer';
import QuizSystem from './components/learning/QuizSystem';
import XPTracker from './components/profile/XPTracker';
import AchievementGallery from './components/profile/AchievementGallery';
import CourseGrid from './components/courses/CourseGrid';
import HomePage from './components/home/HomePage';
import SettingsPanel from './components/settings/SettingsPanel';
import SignUpPage from './components/Auth/SignUpPage';
import LoginPage from './components/Auth/LoginPage';
import toast from 'react-hot-toast';

// Dark mode context
export const DarkModeContext = createContext({
  darkMode: false,
  setDarkMode: () => {},
  toggleDarkMode: () => {},
});

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const navigate = useNavigate();

  // Central dark mode state (init from localStorage or system)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Whenever darkMode changes, update html class and localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((d) => !d);

  // Animation wrapper for main dashboard area
  const AnimatedMain = ({ children }) => (
    <div className="max-w-7xl mx-auto animate-fadeInUp">{children}</div>
  );

  const handleLearningTabClick = () => {
    if (selectedCourseId) {
      setActiveTab('learning');
    } else {
      setActiveTab('courses');
      toast.error("Please select a course to continue")
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <AnimatedMain>
            <ProgressOverview />
            <ContinueLearning setActiveTab={setActiveTab} />
          </AnimatedMain>
        );
      case 'learning':
        if (!selectedCourseId) {
          return (
            <AnimatedMain>
              <div className="text-center text-lg py-10">
                Please select a course first from <span className="underline cursor-pointer" onClick={() => setActiveTab('courses')}>My Courses</span>.
              </div>
            </AnimatedMain>
          );
        }
        return (
          <AnimatedMain>
            <LessonPlayer selectedCourseId={selectedCourseId} />
            <QuizSystem selectedCourseId={selectedCourseId} />
            <div className="mt-6 flex justify-center">
              <button
                className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-lg hover:shadow-xl px-6 py-3 rounded-lg transition-all duration-200"
                onClick={() => setActiveTab('courses')}
              >
                Back to My Courses
              </button>
            </div>
          </AnimatedMain>
        );
      case 'courses':
        return (
          <AnimatedMain>
            <CourseGrid
              setActiveTab={setActiveTab}
              onSelectCourse={(id) => {
                setSelectedCourseId(id);
                setActiveTab('learning');
              }}
            />
          </AnimatedMain>
        );
      case 'analytics':
        return <AnimatedMain><AnalyticsCharts /></AnimatedMain>;
      case 'achievements':
        return <AnimatedMain><AchievementGallery /></AnimatedMain>;
      case 'profile':
        return <AnimatedMain><XPTracker /></AnimatedMain>;
      case 'settings':
        return (
          <AnimatedMain>
            <SettingsPanel />
          </AnimatedMain>
        );
      default:
        return <AnimatedMain><ProgressOverview /></AnimatedMain>;
    }
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <SignUpPage
              onBack={() => navigate(-1)}
              onSignUp={() => {
                setIsLoggedIn(true);
                navigate('/dashboard');
              }}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              onBack={() => navigate(-1)}
              onLogin={() => {
                setIsLoggedIn(true);
                navigate('/dashboard');
              }}
              onGoToSignUp={() => navigate('/signup')}
            />
          }
        />
        <Route
          path="/dashboard/*"
          element={
            isLoggedIn ? (
              <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 animate-fadeIn transition-colors">
                <div className="flex">
                  <Sidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    onLearningTabClick={handleLearningTabClick} 
                  />
                  <div className="flex-1 lg:ml-64">
                    <Header 
                      onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
                      setActiveTab={setActiveTab}
                    />
                    <main className="p-4 lg:p-8">{renderContent()}</main>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </DarkModeContext.Provider>
  );
}

export default App;