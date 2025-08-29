import React from 'react';
import { Award, Star, Flame, TrendingUp, Trophy, Clock, CheckCircle } from 'lucide-react';
import Card from '../shared/Card';
import ProgressBar from '../shared/ProgressBar';
import Button from '../shared/Button';
import { userData, dailyActivity, analyticsData, achievements } from '../../data/mockData';

const ProgressOverview = ({ setActiveTab }) => {
  const progressPercent = Math.min(
    100,
    Math.round((userData.totalXP / (userData.totalXP + userData.xpToNextLevel)) * 100)
  );

  // Get next achievement to unlock (locked, closest progress)
  const lockedAchievements = achievements.filter(
    (a) => !a.unlockedDate && a.progress !== undefined && a.target
  );
  const nextAchievement =
    lockedAchievements.length > 0
      ? lockedAchievements.reduce((a, b) =>
          a.progress / a.target > b.progress / b.target ? a : b
        )
      : null;

  return (
    <div className="flex flex-col gap-8 mt-8 transition-colors duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight animate-fadeInUp">
          Progress Overview
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="hover:scale-105 transition"
          onClick={() => setActiveTab && setActiveTab('profile')}
        >
          View Profile
        </Button>
      </div>

      {/* User Profile Card */}
      <Card className="glass-card bg-gradient-to-tr from-blue-100/80 via-purple-50/70 to-white/70 dark:from-gray-900/80 dark:via-purple-900/70 dark:to-gray-900/70 border-0 rounded-2xl p-7 shadow-xl animate-slideIn transition-colors duration-500">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <div className="relative">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl bg-blue-200 dark:bg-blue-600 font-extrabold text-white shadow">
                  {userData.name[0]}
                </div>
                {userData.currentStreak >= 5 && (
                  <div className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-white dark:bg-gray-900 rounded-full px-2 py-0.5 shadow text-xs text-orange-500 font-bold border border-orange-200 dark:border-orange-400">
                    <Flame size={14} className="mr-1" />
                    {userData.currentStreak}d
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">{userData.name}</h3>
                <div className="text-xs text-gray-500 dark:text-gray-300">Level {userData.level}</div>
              </div>
              <div className="ml-auto flex flex-col items-end">
                <div className="text-xs text-blue-600 dark:text-yellow-200 font-bold flex items-center gap-1">
                  <Star size={14} className="text-yellow-400" /> XP: {userData.totalXP}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-200 flex items-center gap-1">
                  <Trophy size={13} className="text-yellow-600" /> Rank: {userData.level >= 10 ? 'Pro' : 'Learner'}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                <span>{userData.totalXP} XP</span>
                <span>{userData.xpToNextLevel} XP to next level</span>
              </div>
              <ProgressBar
                progress={progressPercent}
                color="blue"
                animated
                className="shadow"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-blue-600 dark:text-blue-300" size={20} />
                <div>
                  <div className="font-bold text-lg text-gray-900 dark:text-gray-100">{userData.stats.totalLessonsCompleted}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300">Lessons</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-yellow-500" size={20} />
                <div>
                  <div className="font-bold text-lg text-gray-900 dark:text-gray-100">{userData.stats.coursesCompleted}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300">Courses</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-green-500" size={20} />
                <div>
                  <div className="font-bold text-lg text-gray-900 dark:text-gray-100">{userData.stats.averageAccuracy}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300">Accuracy</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="text-orange-500" size={20} />
                <div>
                  <div className="font-bold text-lg text-gray-900 dark:text-gray-100">{userData.currentStreak}d</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300">Streak</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 bg-blue-100 dark:bg-blue-900 rounded-xl px-4 py-3 flex flex-col gap-1">
                <div className="flex justify-between text-xs font-semibold text-blue-700 dark:text-blue-200">
                  <span>Today</span>
                  <span>{dailyActivity.todayXP} XP</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-300">
                  <span>{dailyActivity.todayLessons} lessons</span>
                  <span>{dailyActivity.todayMinutes} min</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Flame size={16} className="text-orange-400" />
                  <span className="text-xs text-orange-700 dark:text-orange-300 font-semibold">
                    Streak: {dailyActivity.streak} days
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle size={14} className="text-green-500" />
                  <span className="text-xs text-green-700 dark:text-green-300">Weekly Goal: {dailyActivity.weeklyProgress}/{dailyActivity.weeklyGoal} XP</span>
                </div>
              </div>
              <div className="flex-1 bg-yellow-50 dark:bg-yellow-900 rounded-xl px-4 py-3 border border-yellow-200 dark:border-yellow-700 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300 font-semibold mb-1">
                  <Award size={16} className="text-yellow-500" />
                  Next Achievement
                </div>
                {nextAchievement ? (
                  <>
                    <div className="font-bold text-gray-800 dark:text-gray-100 mb-0.5">{nextAchievement.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300 mb-2">{nextAchievement.description}</div>
                    <ProgressBar
                      progress={Math.round(
                        (nextAchievement.progress / nextAchievement.target) * 100
                      )}
                      color="yellow"
                      animated
                      className="shadow"
                    />
                    <div className="text-xs text-yellow-700 dark:text-yellow-300 font-semibold mt-1">
                      {nextAchievement.progress}/{nextAchievement.target} ({Math.round(
                        (nextAchievement.progress / nextAchievement.target) * 100
                      )}%) to unlock
                    </div>
                  </>
                ) : (
                  <div className="text-xs text-gray-500">All achievements unlocked!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Lifetime stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500 dark:text-gray-300 mt-2">
        <div className="flex items-center gap-1 bg-white/70 dark:bg-gray-800/70 rounded-lg px-3 py-2 shadow">
          <Clock size={13} />
          <span>{userData.stats.totalTimeSpent} min total</span>
        </div>
        <div className="flex items-center gap-1 bg-white/70 dark:bg-gray-800/70 rounded-lg px-3 py-2 shadow">
          <Award size={13} />
          <span>{achievements.filter((a) => !!a.unlockedDate).length} achievements unlocked</span>
        </div>
        <div className="flex items-center gap-1 bg-white/70 dark:bg-gray-800/70 rounded-lg px-3 py-2 shadow">
          <Trophy size={13} />
          <span>{analyticsData.monthlyStats.coursesStarted} courses started</span>
        </div>
        <div className="flex items-center gap-1 bg-white/70 dark:bg-gray-800/70 rounded-lg px-3 py-2 shadow">
          <CheckCircle size={13} />
          <span>Best streak: {analyticsData.monthlyStats.bestStreak} days</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;