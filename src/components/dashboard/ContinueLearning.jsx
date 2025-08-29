import React from 'react';
import { PlayCircle, Clock, Award } from 'lucide-react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import ProgressBar from '../shared/ProgressBar';
import { courses, currentLesson } from '../../data/mockData';

const ContinueLearning = ({ setActiveTab }) => {
  const recentCourses = courses.filter(course => course.progress > 0 && course.progress < 100);

  return (
    <div className="flex flex-col gap-8 mt-8 transition-colors duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight animate-fadeInUp">Continue Learning</h2>
        <Button 
          variant="outline" 
          size="sm"
          className="hover:scale-105 transition"
          onClick={() => setActiveTab('courses')}
        >
          View All Courses
        </Button>
      </div>

      {/* Current Lesson */}
      <Card className="glass-card bg-gradient-to-tr from-blue-100/80 via-purple-50/70 to-white/70 dark:from-gray-900/80 dark:via-purple-900/70 dark:to-gray-900/70 border-0 rounded-2xl p-7 shadow-xl animate-slideIn transition-colors duration-500">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700 dark:text-green-300 font-bold tracking-wide glow">Currently Learning</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{currentLesson.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-base mb-3">{currentLesson.description}</p>
            <div className="flex items-center space-x-6 text-base text-gray-500 dark:text-gray-300 font-medium">
              <div className="flex items-center space-x-1">
                <Clock size={18} />
                <span>{currentLesson.duration} min</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award size={18} className="" />
                <span>{currentLesson.xpReward} XP</span>
              </div>
            </div>
          </div>
          <Button 
            icon={<PlayCircle size={22} />}
            onClick={() => setActiveTab('learning')}
            className="ml-0 md:ml-4 mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:scale-105 transition"
            size="lg"
          >
            Continue
          </Button>
        </div>
      </Card>

      {/* Recent Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recentCourses.map((course) => (
          <Card key={course.id} hover className="rounded-2xl p-7 glass-card bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg shadow-lg border-0 transition-all duration-300 animate-fadeInUp">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-3 h-3 ${course.color} rounded-full mt-1 shadow-lg`}></div>
              <div className="text-sm text-gray-500 dark:text-gray-300 font-semibold">{course.difficulty}</div>
            </div>
            <h4 className="font-semibold text-xl text-gray-900 dark:text-gray-100 mb-2">{course.title}</h4>
            <p className="text-gray-700 dark:text-gray-300 text-base mb-3">{course.description}</p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-500 dark:text-gray-300">Progress</span>
                <span className="font-semibold">{course.completedLessons}/{course.totalLessons} lessons</span>
              </div>
              <ProgressBar 
                progress={course.progress} 
                color={course.color.replace('bg-', '').replace('-500', '')} 
                animated 
                className="shadow"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                <Clock size={16} className="mr-1" />
                {course.estimatedTime} min remaining
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="hover:scale-105 transition"
                onClick={() => setActiveTab('courses')}
              >
                Resume
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContinueLearning;