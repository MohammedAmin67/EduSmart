import React from 'react';
import { TrendingUp, Clock, Target, Award } from 'lucide-react';
import Card from '../shared/Card';
import ProgressBar from '../shared/ProgressBar';
import { analyticsData } from '../../data/mockData';

const AnalyticsCharts = () => {
  const maxMinutes = Math.max(...analyticsData.weeklyProgress.map(day => day.minutes));
  const maxXP = Math.max(...analyticsData.weeklyProgress.map(day => day.xp));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-gray-900 animate-fadeInUp">Learning Analytics</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg font-bold shadow hover:bg-blue-200 transition">7 Days</button>
          <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg font-medium transition">30 Days</button>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <Card className="glass-card p-8 rounded-2xl shadow-xl bg-gradient-to-tr from-blue-100 via-purple-50 to-white border-0 animate-slideIn">
        <h3 className="text-xl font-bold mb-5 text-blue-900">Weekly Activity</h3>
        <div className="space-y-4">
          {/* Chart */}
          <div className="grid grid-cols-7 gap-3 h-52">
            {analyticsData.weeklyProgress.map((day, i) => (
              <div key={day.day} className="flex flex-col items-center animate-fadeInUp" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex-1 flex items-end w-full">
                  <div className="w-full bg-gray-200 rounded-t-lg flex flex-col justify-end overflow-hidden">
                    {/* XP Bar */}
                    <div 
                      className="bg-purple-500 w-full rounded-t-lg shadow-lg transition-all duration-700 ease-out"
                      style={{ height: `${(day.xp / maxXP) * 60 + 10}px` }}
                    />
                    {/* Minutes Bar */}
                    <div 
                      className="bg-blue-500 w-full rounded-b-lg shadow-md transition-all duration-700 ease-out"
                      style={{ height: `${(day.minutes / maxMinutes) * 80 + 10}px` }}
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-700 mt-2 font-semibold">{day.day}</div>
                <div className="text-xs text-gray-400">{day.minutes}m</div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center space-x-8 mt-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded shadow"></div>
              <span className="text-sm text-gray-700 font-medium">Study Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded shadow"></div>
              <span className="text-sm text-gray-700 font-medium">XP Earned</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Subject Performance */}
      <Card className="glass-card p-8 rounded-2xl bg-gradient-to-tr from-white to-blue-50 border-0 shadow-lg animate-fadeInUp">
        <h3 className="text-xl font-bold mb-5 text-purple-900">Subject Performance</h3>
        <div className="space-y-6">
          {analyticsData.subjectPerformance.map((subject, idx) => (
            <div key={subject.subject} className="space-y-2 animate-slideIn" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">{subject.subject}</span>
                <span className="text-sm text-gray-500">{subject.accuracy}% accuracy</span>
              </div>
              <ProgressBar 
                progress={subject.accuracy} 
                color={subject.accuracy >= 90 ? 'green' : subject.accuracy >= 80 ? 'blue' : 'yellow'} 
                animated 
                className="shadow"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center bg-gradient-to-br from-blue-100 to-purple-50 border-blue-200 rounded-2xl shadow-lg glass-card animate-fadeInUp">
          <Clock className="w-10 h-10 text-blue-500 mx-auto mb-2 animate-bounce" />
          <div className="text-3xl font-bold text-gray-900">{analyticsData.monthlyStats.totalMinutes}</div>
          <div className="text-base text-gray-500">Total Minutes</div>
        </Card>
        
        <Card className="text-center bg-gradient-to-br from-green-100 to-green-50 border-green-200 rounded-2xl shadow-lg glass-card animate-fadeInUp">
          <Target className="w-10 h-10 text-green-500 mx-auto mb-2 animate-pulse" />
          <div className="text-3xl font-bold text-gray-900">{analyticsData.monthlyStats.totalLessons}</div>
          <div className="text-base text-gray-500">Lessons Completed</div>
        </Card>
        
        <Card className="text-center bg-gradient-to-br from-purple-100 to-blue-50 border-purple-200 rounded-2xl shadow-lg glass-card animate-fadeInUp">
          <TrendingUp className="w-10 h-10 text-purple-500 mx-auto mb-2 animate-glow" />
          <div className="text-3xl font-bold text-gray-900">{analyticsData.monthlyStats.averageAccuracy}%</div>
          <div className="text-base text-gray-500">Average Accuracy</div>
        </Card>
        
        <Card className="text-center bg-gradient-to-br from-yellow-100 to-orange-50 border-yellow-200 rounded-2xl shadow-lg glass-card animate-fadeInUp">
          <Award className="w-10 h-10 text-yellow-500 mx-auto mb-2 animate-bounce" />
          <div className="text-3xl font-bold text-gray-900">{analyticsData.monthlyStats.bestStreak}</div>
          <div className="text-base text-gray-500">Best Streak (days)</div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsCharts;