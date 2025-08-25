import React from 'react';
import { TrendingUp, Clock, BookOpen, Target } from 'lucide-react';
import Card from '../shared/Card';
import ProgressBar from '../shared/ProgressBar';
import { userData, dailyActivity, courses } from '../../data/mockData';

const ProgressOverview = () => {
  const completionRate = (userData.stats.totalLessonsCompleted / courses.reduce((acc, course) => acc + course.totalLessons, 0) * 100).toFixed(1);

  const stats = [
    {
      label: 'Current Streak',
      value: `${dailyActivity.streak} days`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      label: 'Time Today',
      value: `${dailyActivity.todayMinutes} min`,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Lessons Completed',
      value: userData.stats.totalLessonsCompleted,
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Overall Progress',
      value: `${completionRate}%`,
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow rounded-xl p-6 flex items-center gap-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <Icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* XP Progress */}
      <Card className="rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Level Progress</h3>
          <div className="text-sm text-gray-500">
            Level {userData.level} • {userData.xpToNextLevel} XP to next level
          </div>
        </div>
        <ProgressBar 
          progress={userData.totalXP - (userData.level - 1) * 250} 
          max={250} 
          color="purple" 
          size="lg" 
          animated 
          showPercentage
        />
        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>{userData.totalXP} XP total</span>
          <span>Next: Level {userData.level + 1}</span>
        </div>
      </Card>

      {/* Weekly Goal Progress */}
      <Card className="rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Weekly Learning Goal</h3>
          <div className="text-sm text-gray-500">
            {dailyActivity.weeklyProgress} / {dailyActivity.weeklyGoal} minutes
          </div>
        </div>
        <ProgressBar 
          progress={dailyActivity.weeklyProgress} 
          max={dailyActivity.weeklyGoal} 
          color="green" 
          size="lg" 
          animated 
          showPercentage
        />
        <div className="mt-2 text-sm text-gray-500">
          {dailyActivity.weeklyGoal - dailyActivity.weeklyProgress} minutes remaining this week
        </div>
      </Card>
    </div>
  );
};

export default ProgressOverview;