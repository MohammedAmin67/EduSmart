import React, { useState } from 'react';
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


function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <ProgressOverview />
            <ContinueLearning setActiveTab={setActiveTab} />
          </div>
        );
      case 'learning':
        return (
          <div className="space-y-8">
            <LessonPlayer />
            <QuizSystem />
          </div>
        );
      case 'courses':
        return <CourseGrid setActiveTab={setActiveTab} />;
      case 'analytics':
        return <AnalyticsCharts />;
      case 'achievements':
        return <AchievementGallery />;
      case 'profile':
        return (
          <div className="space-y-8">
            <XPTracker />
          </div>
        );
      case 'settings':
        return <SettingsPanel />;
      default:
        return <ProgressOverview />;
    }
  };

  if (!isLoggedIn) {
    return <HomePage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <div className="flex-1 lg:ml-64">
          <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;