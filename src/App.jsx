import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import ProgressOverview from './components/dashboard/ProgressOverview';
import ContinueLearning from './components/dashboard/ContinueLearning';
import AnalyticsCharts from './components/analytics/AnalyticsCharts';
import LessonPlayer from './components/learning/LessonPlayer';
import QuizSystem from './components/learning/QuizSystem';
import Profile from './components/profile/Profile';
import AchievementGallery from './components/profile/AchievementGallery';
import CourseGrid from './components/courses/CourseGrid';
import HomePage from './components/home/HomePage';
import SettingsPanel from './components/settings/SettingsPanel';
import SignUpPage from './components/Auth/SignUpPage';
import LoginPage from './components/Auth/LoginPage';
import toast from 'react-hot-toast';
import { UserProvider } from './components/context/UserContext';

// Dark mode context
export const DarkModeContext = createContext({
  darkMode: false,
  setDarkMode: () => {},
  toggleDarkMode: () => {},
});

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // ---- UPDATED: load from localStorage ----
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const navigate = useNavigate();

  // Central dark mode state (init from localStorage or system)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const location = useLocation();

   useEffect(() => {
    if (location.pathname.startsWith('/dashboard/profile')) setActiveTab('profile');
    else if (location.pathname.startsWith('/dashboard/analytics')) setActiveTab('analytics');
    else if (location.pathname.startsWith('/dashboard/courses')) setActiveTab('courses');
    else if (location.pathname.startsWith('/dashboard/learning')) setActiveTab('learning');
    else if (location.pathname.startsWith('/dashboard/achievements')) setActiveTab('achievements');
    else if (location.pathname.startsWith('/dashboard/settings')) setActiveTab('settings');
    else setActiveTab('dashboard');
  }, [location.pathname]);

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
        return <AnimatedMain><Profile /></AnimatedMain>;
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

  // ---- Keep login state and localStorage in sync ----
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    navigate('/dashboard');
  };

  const handleSignUp = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    navigate('/dashboard');
  };

  // Optionally, a logout function (call it from somewhere in the app)
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate('/');
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={
              <SignUpPage
                onBack={() => navigate(-1)}
                onSignUp={handleSignUp}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                onBack={() => navigate(-1)}
                onLogin={handleLogin}
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
                    {/* Remove lg:ml-64 so content is always flush with sidebar; sidebar is fixed, so apply pt-[64px] to main to offset header */}
                    <div className="flex-1">
                      <Header 
                        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
                        setActiveTab={setActiveTab}
                        // You can pass handleLogout here for a logout button
                      />
                      <main className="p-4 lg:p-8 pt-[72px]">{renderContent()}</main>
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
      </UserProvider>
    </DarkModeContext.Provider>
  );
}

export default App;