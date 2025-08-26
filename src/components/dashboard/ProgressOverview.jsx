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
      bgColor: 'bg-orange-100/80 backdrop-blur-md'
    },
    {
      label: 'Time Today',
      value: `${dailyActivity.todayMinutes} min`,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100/80 backdrop-blur-md'
    },
    {
      label: 'Lessons Completed',
      value: userData.stats.totalLessonsCompleted,
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-100/80 backdrop-blur-md'
    },
    {
      label: 'Overall Progress',
      value: `${completionRate}%`,
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100/80 backdrop-blur-md'
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-5">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className={`hover:shadow-xl transition-all rounded-2xl p-6 flex items-center gap-5 bg-white/60 backdrop-blur-xl border-0 glass-card animate-fadeIn`}
              style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12)' }}
            >
              <div className={`p-4 rounded-xl shadow-md ${stat.bgColor} animate-pulse`}>
                <Icon className={stat.color} size={28} />
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gray-900 drop-shadow-md">{stat.value}</p>
                <p className="text-base text-gray-500 font-medium tracking-wide">{stat.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* XP Progress */}
      <Card className="rounded-2xl p-7 bg-gradient-to-tr from-purple-100/90 to-blue-50/80 shadow-2xl border-0 glass-card animate-slideIn">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-purple-900 tracking-wide">Level Progress</h3>
          <div className="text-sm text-gray-500">
            Level {userData.level} • <span className="font-semibold text-purple-600">{userData.xpToNextLevel} XP</span> to next level
          </div>
        </div>
        <ProgressBar 
          progress={userData.totalXP - (userData.level - 1) * 250} 
          max={250} 
          color="purple" 
          size="lg" 
          animated 
          showPercentage
          className="shadow-lg"
        />
        <div className="mt-3 flex justify-between text-base text-gray-600 font-semibold">
          <span className="animate-glow">{userData.totalXP} XP total</span>
          <span>Next: Level {userData.level + 1}</span>
        </div>
      </Card>

      {/* Weekly Goal Progress */}
      <Card className="rounded-2xl p-7 bg-gradient-to-tr from-green-100/80 to-white/80 shadow-xl border-0 glass-card animate-slideIn">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-green-900">Weekly Learning Goal</h3>
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-green-600">{dailyActivity.weeklyProgress}</span> / {dailyActivity.weeklyGoal} minutes
          </div>
        </div>
        <ProgressBar 
          progress={dailyActivity.weeklyProgress} 
          max={dailyActivity.weeklyGoal} 
          color="green" 
          size="lg" 
          animated 
          showPercentage
          className="shadow-md"
        />
        <div className="mt-2 text-sm text-gray-500 font-medium">
          {dailyActivity.weeklyGoal - dailyActivity.weeklyProgress} minutes remaining this week
        </div>
      </Card>
    </div>
  );
};

export default ProgressOverview;