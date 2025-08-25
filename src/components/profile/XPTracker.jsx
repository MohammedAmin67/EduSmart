import React from 'react';
import { Star, TrendingUp, Award, Zap } from 'lucide-react';
import Card from '../shared/Card';
import ProgressBar from '../shared/ProgressBar';
import { userData } from '../../data/mockData';

const XPTracker = () => {
  const currentLevelXP = (userData.level - 1) * 250;
  const nextLevelXP = userData.level * 250;
  const progressInLevel = userData.totalXP - currentLevelXP;
  const xpNeededForNextLevel = nextLevelXP - userData.totalXP;

  const milestones = [
    { level: 5, reward: 'Avatar Accessories Unlocked', unlocked: true },
    { level: 10, reward: 'New Study Themes', unlocked: true },
    { level: 15, reward: 'Advanced Analytics', unlocked: userData.level >= 15 },
    { level: 20, reward: 'Mentor Badge', unlocked: userData.level >= 20 },
    { level: 25, reward: 'Custom Avatar Creation', unlocked: userData.level >= 25 }
  ];

  const recentXPGains = [
    { activity: 'JavaScript Arrays Lesson', xp: 50, time: '2 hours ago' },
    { activity: 'Variables Quiz Perfect Score', xp: 25, time: '3 hours ago' },
    { activity: 'Daily Login Bonus', xp: 10, time: '1 day ago' },
    { activity: 'Week Streak Bonus', xp: 100, time: '2 days ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">XP Progress</h2>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-lg">
          <Star className="text-yellow-600" size={20} />
          <span className="font-bold text-yellow-800">{userData.totalXP} Total XP</span>
        </div>
      </div>

      {/* Current Level Progress */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Level {userData.level}</h3>
            <p className="text-gray-600">Keep learning to reach Level {userData.level + 1}!</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">{progressInLevel}</div>
            <div className="text-sm text-gray-500">/ 250 XP</div>
          </div>
        </div>
        
        <ProgressBar 
          progress={progressInLevel} 
          max={250} 
          color="purple" 
          size="lg" 
          animated 
          showPercentage
        />
        
        <div className="mt-3 flex justify-between text-sm text-gray-600">
          <span>Current Level: {userData.level}</span>
          <span>{xpNeededForNextLevel} XP to next level</span>
        </div>
      </Card>

      {/* XP Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">+{userData.stats.totalTimeSpent}</div>
          <div className="text-sm text-gray-500">Minutes Studied</div>
        </Card>
        
        <Card className="text-center">
          <Award className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{userData.stats.totalLessonsCompleted}</div>
          <div className="text-sm text-gray-500">Lessons Completed</div>
        </Card>
        
        <Card className="text-center">
          <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{userData.stats.averageAccuracy}%</div>
          <div className="text-sm text-gray-500">Average Accuracy</div>
        </Card>
      </div>

      {/* Level Milestones */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Level Milestones</h3>
        <div className="space-y-3">
          {milestones.map((milestone) => (
            <div 
              key={milestone.level}
              className={`flex items-center justify-between p-3 rounded-lg ${
                milestone.unlocked 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  milestone.unlocked 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {milestone.level}
                </div>
                <span className={`font-medium ${
                  milestone.unlocked ? 'text-green-800' : 'text-gray-600'
                }`}>
                  {milestone.reward}
                </span>
              </div>
              {milestone.unlocked && (
                <Award className="text-green-500" size={20} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Recent XP Gains */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Recent XP Gains</h3>
        <div className="space-y-3">
          {recentXPGains.map((gain, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{gain.activity}</div>
                <div className="text-sm text-gray-500">{gain.time}</div>
              </div>
              <div className="flex items-center space-x-1 text-blue-600 font-semibold">
                <span>+{gain.xp}</span>
                <Star size={16} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default XPTracker;