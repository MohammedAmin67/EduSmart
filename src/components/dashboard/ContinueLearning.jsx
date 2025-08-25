import React from 'react';
import { PlayCircle, Clock, Award } from 'lucide-react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import ProgressBar from '../shared/ProgressBar';
import { courses, currentLesson } from '../../data/mockData';

const ContinueLearning = ({ setActiveTab }) => {
  const recentCourses = courses.filter(course => course.progress > 0 && course.progress < 100);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setActiveTab('courses')}
        >
          View All Courses
        </Button>
      </div>

      {/* Current Lesson */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700 font-medium">Currently Learning</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{currentLesson.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{currentLesson.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock size={16} />
                <span>{currentLesson.duration} min</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award size={16} />
                <span>{currentLesson.xpReward} XP</span>
              </div>
            </div>
          </div>
          <Button 
            icon={<PlayCircle size={18} />}
            onClick={() => setActiveTab('learning')}
            className="ml-0 md:ml-4 mt-4 md:mt-0"
          >
            Continue
          </Button>
        </div>
      </Card>

      {/* Recent Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recentCourses.map((course) => (
          <Card key={course.id} hover className="rounded-xl p-6">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-3 h-3 ${course.color} rounded-full mt-1`}></div>
              <div className="text-sm text-gray-500">{course.difficulty}</div>
            </div>
            
            <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
            <p className="text-gray-600 text-sm mb-3">{course.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">{course.completedLessons}/{course.totalLessons} lessons</span>
              </div>
              <ProgressBar 
                progress={course.progress} 
                color={course.color.replace('bg-', '').replace('-500', '')} 
                animated 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={16} className="mr-1" />
                {course.estimatedTime} min remaining
              </div>
              <Button 
                variant="ghost" 
                size="sm"
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