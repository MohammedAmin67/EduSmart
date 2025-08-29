import React from 'react';
import { Star, TrendingUp, Award, Zap } from 'lucide-react';
import Card from '../shared/Card';
import ProgressBar from '../shared/ProgressBar';
import { userData } from '../../data/mockData';

// Dynamic XP scaling formula (same as your advanced code)
const getXPForLevel = level => Math.round(250 * Math.pow(1.1, level - 1));

const XPTracker = () => {
  // Calculate cumulative XP required to reach current level
  let xpForPrevLevels = 0;
  for (let i = 1; i < userData.level; i++) {
    xpForPrevLevels += getXPForLevel(i);
  }
  const xpForThisLevel = getXPForLevel(userData.level);
  const progressInLevel = userData.totalXP - xpForPrevLevels;
  const xpNeededForNextLevel = Math.max(0, xpForThisLevel - progressInLevel);

  const milestones = [
    { level: 5, reward: 'Avatar Accessories Unlocked', unlocked: userData.level >= 5 },
    { level: 10, reward: 'New Study Themes', unlocked: userData.level >= 10 },
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
    <div className="space-y-6 sm:space-y-8 min-h-screen px-2 py-4 transition-colors duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 animate-fadeInUp">XP Progress</h2>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-lg">
          <Star className="text-yellow-600 dark:text-yellow-400" size={20} />
          <span className="font-bold text-yellow-800 dark:text-yellow-200 text-base sm:text-lg">{userData.totalXP} Total XP</span>
        </div>
      </div>

      {/* Current Level Progress */}
      <Card className="bg-gradient-to-r from-purple-100 to-blue-50 dark:from-purple-900 dark:to-blue-900 border-0 rounded-2xl shadow-2xl glass-card animate-fadeInUp p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-5 gap-2">
          <div>
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Level {userData.level}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              Keep learning to reach Level {userData.level + 1}!
            </p>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">{progressInLevel}</div>
            <div className="text-xs sm:text-base text-gray-500 dark:text-gray-300">
              / {xpForThisLevel} XP
            </div>
          </div>
        </div>
        
        <ProgressBar 
          progress={progressInLevel} 
          max={xpForThisLevel} 
          color="purple" 
          size="lg" 
          animated 
          showPercentage
          className="shadow-lg"
        />
        
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-between text-sm sm:text-base text-gray-600 dark:text-gray-300 font-semibold">
          <span>Current Level: {userData.level}</span>
          <span>
            {xpNeededForNextLevel > 0
              ? `${xpNeededForNextLevel} XP to next level`
              : <span className="text-green-600 dark:text-green-400 font-bold">Ready to level up!</span>
            }
          </span>
        </div>
      </Card>

      {/* XP Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
        <Card className="text-center glass-card bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 border-0 rounded-2xl shadow-lg animate-fadeInUp p-4">
          <TrendingUp className="w-7 h-7 sm:w-10 sm:h-10 text-green-500 dark:text-green-400 mx-auto mb-1 sm:mb-2 animate-pulse" />
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">+{userData.stats.totalTimeSpent}</div>
          <div className="text-xs sm:text-base text-gray-500 dark:text-gray-300">Minutes Studied</div>
        </Card>
        <Card className="text-center glass-card bg-gradient-to-br from-blue-100 to-purple-50 dark:from-blue-900 dark:to-purple-900 border-0 rounded-2xl shadow-lg p-4">
          <Award className="w-7 h-7 sm:w-10 sm:h-10 text-blue-500 dark:text-blue-400 mx-auto mb-1 sm:mb-2 animate-pulse" />
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{userData.stats.totalLessonsCompleted}</div>
          <div className="text-xs sm:text-base text-gray-500 dark:text-gray-300">Lessons Completed</div>
        </Card>
        <Card className="text-center glass-card bg-gradient-to-br from-yellow-100 to-orange-50 dark:from-yellow-900 dark:to-orange-900 border-0 rounded-2xl shadow-lg animate-fadeInUp p-4">
          <Zap className="w-7 h-7 sm:w-10 sm:h-10 text-yellow-500 dark:text-yellow-400 mx-auto mb-1 sm:mb-2 animate-pulse" />
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{userData.stats.averageAccuracy}%</div>
          <div className="text-xs sm:text-base text-gray-500 dark:text-gray-300">Average Accuracy</div>
        </Card>
      </div>

      {/* Level Milestones */}
      <Card className="glass-card rounded-2xl shadow-lg p-5 sm:p-7 bg-gradient-to-tr from-blue-100/80 to-white/80 dark:from-blue-900/80 dark:to-white/10 border-0 animate-fadeInUp">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-5 text-gray-900 dark:text-gray-100">Level Milestones</h3>
        <div className="space-y-3 sm:space-y-4">
          {milestones.map((milestone) => (
            <div 
              key={milestone.level}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-xl shadow-md
                ${milestone.unlocked 
                  ? 'bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/80 dark:to-green-700/40 border border-green-200 dark:border-green-700 animate-glow' 
                  : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 opacity-70'
                }`}
            >
              <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-0">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg font-bold
                  ${milestone.unlocked 
                    ? 'bg-green-500 text-white shadow-md animate-pulse' 
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                  {milestone.level}
                </div>
                <span className={`font-semibold text-base sm:text-lg ${
                  milestone.unlocked ? 'text-green-800 dark:text-green-200' : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {milestone.reward}
                </span>
              </div>
              {milestone.unlocked && (
                <Award className="text-green-500 dark:text-green-400 animate-bounce" size={20} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Recent XP Gains */}
      <Card className="glass-card rounded-2xl shadow-lg p-5 sm:p-7 bg-gradient-to-tr from-yellow-100/70 to-white/80 dark:from-yellow-900/60 dark:to-white/10 border-0 animate-fadeInUp">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-5 text-gray-900 dark:text-gray-100">Recent XP Gains</h3>
        <div className="space-y-3 sm:space-y-4">
          {recentXPGains.map((gain, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow">
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">{gain.activity}</div>
                <div className="text-xs text-gray-500 dark:text-gray-300">{gain.time}</div>
              </div>
              <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 font-semibold text-sm sm:text-base mt-1 sm:mt-0">
                <span>+{gain.xp}</span>
                <Star size={14} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default XPTracker;