import React from 'react';
import { TrendingUp, Clock, Target, Award } from 'lucide-react';
import Card from '../shared/Card';
import ProgressBar from '../shared/ProgressBar';
import { analyticsData } from '../../data/mockData';

const AnalyticsCharts = () => {
  const maxMinutes = Math.max(...analyticsData.weeklyProgress.map(day => day.minutes));
  const maxXP = Math.max(...analyticsData.weeklyProgress.map(day => day.xp));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Learning Analytics</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg font-medium">
            7 Days
          </button>
          <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">
            30 Days
          </button>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
        <div className="space-y-4">
          {/* Chart */}
          <div className="grid grid-cols-7 gap-2 h-48">
            {analyticsData.weeklyProgress.map((day) => (
              <div key={day.day} className="flex flex-col items-center">
                <div className="flex-1 flex items-end w-full">
                  <div className="w-full bg-gray-200 rounded-t-lg flex flex-col justify-end overflow-hidden">
                    {/* XP Bar */}
                    <div 
                      className="bg-purple-500 w-full transition-all duration-500 ease-out"
                      style={{ height: `${(day.xp / maxXP) * 60}px` }}
                    />
                    {/* Minutes Bar */}
                    <div 
                      className="bg-blue-500 w-full transition-all duration-500 ease-out"
                      style={{ height: `${(day.minutes / maxMinutes) * 80}px` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-2 font-medium">{day.day}</div>
                <div className="text-xs text-gray-500">{day.minutes}m</div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Study Time (minutes)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span className="text-sm text-gray-600">XP Earned</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Subject Performance */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Subject Performance</h3>
        <div className="space-y-4">
          {analyticsData.subjectPerformance.map((subject) => (
            <div key={subject.subject} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{subject.subject}</span>
                <span className="text-sm text-gray-500">{subject.accuracy}% accuracy</span>
              </div>
              <ProgressBar 
                progress={subject.accuracy} 
                color={subject.accuracy >= 90 ? 'green' : subject.accuracy >= 80 ? 'blue' : 'yellow'} 
                animated 
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{subject.timeSpent} minutes spent</span>
                <span>{subject.lessonsCompleted} lessons completed</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center">
          <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{analyticsData.monthlyStats.totalMinutes}</div>
          <div className="text-sm text-gray-500">Total Minutes</div>
        </Card>
        
        <Card className="text-center">
          <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{analyticsData.monthlyStats.totalLessons}</div>
          <div className="text-sm text-gray-500">Lessons Completed</div>
        </Card>
        
        <Card className="text-center">
          <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{analyticsData.monthlyStats.averageAccuracy}%</div>
          <div className="text-sm text-gray-500">Average Accuracy</div>
        </Card>
        
        <Card className="text-center">
          <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{analyticsData.monthlyStats.bestStreak}</div>
          <div className="text-sm text-gray-500">Best Streak (days)</div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsCharts;