import React from 'react';
import { Clock, BookOpen, User, ArrowRight } from 'lucide-react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import ProgressBar from '../shared/ProgressBar';
import { courses } from '../../data/mockData';

const CourseGrid = ({ setActiveTab }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
        <Button variant="outline" size="sm">
          Browse All Courses
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} hover className="h-full flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-4 h-4 ${course.color} rounded-full`}></div>
              <div className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(course.difficulty)}`}>
                {course.difficulty}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
            <p className="text-gray-600 text-sm mb-4 flex-1">{course.description}</p>

            <div className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">
                    {course.completedLessons}/{course.totalLessons} lessons
                  </span>
                </div>
                <ProgressBar 
                  progress={course.progress} 
                  color={course.color.replace('bg-', '').replace('-500', '')} 
                  animated 
                />
              </div>

              {/* Course Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{course.estimatedTime}h</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen size={14} />
                  <span>{course.totalLessons} lessons</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User size={14} />
                  <span>{course.category}</span>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full"
                variant={course.progress > 0 ? 'primary' : 'outline'}
                onClick={() => setActiveTab('learning')}
              >
                <span>{course.progress > 0 ? 'Continue' : 'Start Course'}</span>
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Course Recommendations */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Recommended for You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Node.js Fundamentals</h4>
              <p className="text-sm text-gray-600">Based on your JavaScript progress</p>
            </div>
            <Button size="sm" variant="outline">
              Preview
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">CSS Advanced Techniques</h4>
              <p className="text-sm text-gray-600">Continue your web development journey</p>
            </div>
            <Button size="sm" variant="outline">
              Preview
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CourseGrid;