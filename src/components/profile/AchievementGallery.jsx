import React, { useState } from 'react';
import { Trophy, Star, Lock, Calendar } from 'lucide-react';
import Card from '../shared/Card';
import Modal from '../shared/Modal';
import ProgressBar from '../shared/ProgressBar';
import { achievements } from '../../data/mockData';

const AchievementGallery = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [filter, setFilter] = useState('all');

  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-500'
  };

  const rarityBorders = {
    common: 'border-gray-300',
    rare: 'border-blue-300',
    epic: 'border-purple-300',
    legendary: 'border-yellow-300'
  };

  const filters = [
    { id: 'all', label: 'All Achievements' },
    { id: 'unlocked', label: 'Unlocked' },
    { id: 'locked', label: 'Locked' },
    { id: 'in-progress', label: 'In Progress' }
  ];

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'unlocked') return achievement.unlockedDate;
    if (filter === 'locked') return !achievement.unlockedDate && !achievement.progress;
    if (filter === 'in-progress') return achievement.progress && !achievement.unlockedDate;
    return true;
  });

  const unlockedCount = achievements.filter(a => a.unlockedDate).length;
  const totalXPEarned = achievements
    .filter(a => a.unlockedDate)
    .reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Achievement Gallery</h2>
        <div className="text-right">
          <div className="text-lg font-semibold text-gray-900">
            {unlockedCount} / {achievements.length} Unlocked
          </div>
          <div className="text-sm text-gray-500">{totalXPEarned} XP Earned</div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-800">{unlockedCount}</div>
          <div className="text-sm text-yellow-700">Achievements Unlocked</div>
        </Card>
        
        <Card className="text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-800">{totalXPEarned}</div>
          <div className="text-sm text-purple-700">XP from Achievements</div>
        </Card>
        
        <Card className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-800">
            {Math.round((unlockedCount / achievements.length) * 100)}%
          </div>
          <div className="text-sm text-blue-700">Completion Rate</div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {filters.map((filterOption) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              filter === filterOption.id
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement) => (
          <Card
            key={achievement.id}
            hover
            onClick={() => setSelectedAchievement(achievement)}
            className={`relative overflow-hidden ${
              achievement.unlockedDate 
                ? rarityBorders[achievement.rarity]
                : 'border-gray-200 opacity-75'
            }`}
          >
            {/* Rarity Indicator */}
            <div className={`absolute top-0 right-0 w-0 h-0 border-l-[30px] border-b-[30px] border-l-transparent ${
              achievement.unlockedDate 
                ? `border-b-gradient-to-br bg-gradient-to-br ${rarityColors[achievement.rarity]}`
                : 'border-b-gray-300'
            }`} />

            <div className="text-center">
              <div className={`text-4xl mb-3 ${achievement.unlockedDate ? '' : 'grayscale'}`}>
                {achievement.unlockedDate ? achievement.icon : '🔒'}
              </div>
              
              <h3 className={`font-semibold mb-2 ${
                achievement.unlockedDate ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {achievement.name}
              </h3>
              
              <p className={`text-sm mb-3 ${
                achievement.unlockedDate ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {achievement.description}
              </p>

              {/* Progress for in-progress achievements */}
              {achievement.progress && !achievement.unlockedDate && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.target}</span>
                  </div>
                  <ProgressBar 
                    progress={achievement.progress} 
                    max={achievement.target} 
                    color="blue" 
                    size="sm"
                  />
                </div>
              )}

              <div className={`flex items-center justify-center space-x-1 text-sm ${
                achievement.unlockedDate ? 'text-yellow-600' : 'text-gray-400'
              }`}>
                <Star size={14} />
                <span>{achievement.xpReward} XP</span>
              </div>

              {achievement.unlockedDate && (
                <div className="text-xs text-gray-500 mt-2">
                  Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                </div>
              )}

              {!achievement.unlockedDate && !achievement.progress && (
                <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                  <Lock className="text-gray-400" size={32} />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Achievement Detail Modal */}
      <Modal
        isOpen={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
        title="Achievement Details"
        size="sm"
      >
        {selectedAchievement && (
          <div className="text-center space-y-4">
            <div className="text-6xl">
              {selectedAchievement.unlockedDate ? selectedAchievement.icon : '🔒'}
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedAchievement.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {selectedAchievement.description}
              </p>
            </div>

            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              selectedAchievement.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
              selectedAchievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
              selectedAchievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {selectedAchievement.rarity.charAt(0).toUpperCase() + selectedAchievement.rarity.slice(1)}
            </div>

            {selectedAchievement.progress && !selectedAchievement.unlockedDate && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{selectedAchievement.progress}/{selectedAchievement.target}</span>
                </div>
                <ProgressBar 
                  progress={selectedAchievement.progress} 
                  max={selectedAchievement.target} 
                  color="blue" 
                  animated
                  showPercentage
                />
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-yellow-600">
                <Star size={18} />
                <span className="font-semibold">{selectedAchievement.xpReward} XP Reward</span>
              </div>
              {selectedAchievement.unlockedDate && (
                <div className="text-sm text-gray-500 mt-1">
                  Unlocked on {new Date(selectedAchievement.unlockedDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AchievementGallery;