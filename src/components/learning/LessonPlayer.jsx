import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize, BookOpen, FileText, Headphones } from 'lucide-react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import ProgressBar from '../shared/ProgressBar';
import { currentLesson } from '../../data/mockData';

const LessonPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  const contentTypes = [
    { id: 'video', label: 'Video Lesson', icon: Play, active: true },
    { id: 'audio', label: 'Audio Version', icon: Headphones, active: false },
    { id: 'text', label: 'Reading Material', icon: FileText, active: false }
  ];

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // Simulate time progression
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentLesson.duration * 60) {
            clearInterval(interval);
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h1>
          <p className="text-gray-600 mt-1">{currentLesson.description}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Duration: {currentLesson.duration} min</div>
          <div className="text-sm text-blue-600 font-medium">+{currentLesson.xpReward} XP</div>
        </div>
      </div>

      {/* Content Type Selector */}
      <div className="flex space-x-2">
        {contentTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                type.active 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{type.label}</span>
            </button>
          );
        })}
      </div>

      {/* Video Player */}
      <Card padding="none" className="overflow-hidden">
        <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
          {/* Video Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
            <div className="text-white text-center">
              <Play size={64} className="mx-auto mb-4 opacity-50" />
              <div className="text-lg font-medium">Video Content</div>
              <div className="text-sm opacity-75">Play your video</div>
            </div>
          </div>

          {/* Play/Pause Overlay */}
          <button
            onClick={togglePlayback}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity z-10"
          >
            <div className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all">
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </div>
          </button>

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <div className="flex items-center space-x-4 text-white">
              <button onClick={togglePlayback}>
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <div className="flex-1">
                <ProgressBar 
                  progress={currentTime} 
                  max={currentLesson.duration * 60} 
                  color="white"
                  className="bg-white bg-opacity-20"
                />
              </div>
              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(currentLesson.duration * 60)}
              </span>
              <button className="hover:text-blue-400">
                <Volume2 size={20} />
              </button>
              <button className="hover:text-blue-400">
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Points */}
      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <BookOpen className="mr-2" size={20} />
          Key Learning Points
        </h3>
        <ul className="space-y-2">
          {currentLesson.content.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                {index + 1}
              </div>
              <span className="text-gray-700">{point}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Transcript Toggle */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Transcript</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTranscript(!showTranscript)}
          >
            {showTranscript ? 'Hide' : 'Show'} Transcript
          </Button>
        </div>
        
        {showTranscript && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              {currentLesson.content.transcript}
            </p>
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button variant="outline">
          Previous Lesson
        </Button>
        <div className="space-x-3">
          <Button variant="outline">
            Take Notes
          </Button>
          <Button>
            Mark Complete & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;