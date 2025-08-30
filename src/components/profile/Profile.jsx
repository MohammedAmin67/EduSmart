import React, { useState, useEffect } from "react";
import {
  Star, Award, Trophy, Zap, Mail, ChevronRight, User as UserIcon, Sparkles, Target
} from "lucide-react";
import ProgressBar from "../shared/ProgressBar";
import { useUser } from "../context/UserContext";

// XP Bar uses ProgressOverview formula for consistency
const getProgressPercent = (user) =>
  Math.min(100, Math.round((user.totalXP / (user.totalXP + user.xpToNextLevel)) * 100));

const milestonesList = [
  { id: 1, name: "Avatar Accessories Unlocked", xp: 0, unlocked: (level) => level >= 5, icon: "🎯", date: "Level 5" },
  { id: 2, name: "New Study Themes", xp: 0, unlocked: (level) => level >= 10, icon: "💻", date: "Level 10" },
  { id: 3, name: "Advanced Analytics", xp: 0, unlocked: (level) => level >= 15, icon: "🤝", date: "Level 15" },
  { id: 4, name: "Mentor Badge", xp: 0, unlocked: (level) => level >= 20, icon: "💡", date: "Level 20" },
  { id: 5, name: "Custom Avatar Creation", xp: 0, unlocked: (level) => level >= 25, icon: "👑", date: "Level 25" }
];

const recentXPGains = [
  { id: 1, activity: 'JavaScript Arrays Lesson', xp: 50, date: "2 hours ago", type: "project" },
  { id: 2, activity: 'Variables Quiz Perfect Score', xp: 25, date: "3 hours ago", type: "review" },
  { id: 3, activity: 'Daily Login Bonus', xp: 10, date: "1 day ago", type: "fix" },
  { id: 4, activity: 'Week Streak Bonus', xp: 100, date: "2 days ago", type: "mentor" }
];

const getActivityIcon = (type) => {
  const icons = {
    project: <Target className="w-4 h-4" />,
    review: <Award className="w-4 h-4" />,
    fix: <Zap className="w-4 h-4" />,
    mentor: <Star className="w-4 h-4" />,
    docs: <Trophy className="w-4 h-4" />,
  };
  return icons[type] || <Star className="w-4 h-4" />;
};

const Profile = () => {
  const { user, updateAvatar } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredMilestone, setHoveredMilestone] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);

  // Avatar upload logic
  const [avatarUrl, setAvatarUrl] = useState(user.avatar || "");
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    setAvatarUrl(user.avatar || "");
  }, [user.avatar]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result);
      updateAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const progressPercent = getProgressPercent(user);
  const milestones = milestonesList.map(m => ({
    ...m,
    unlocked: m.unlocked(user.level)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-blue-950 dark:via-blue-900 dark:to-indigo-900/90 backdrop-blur-xl rounded-3xl transition-colors">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Fade backgrounds in light/dark mode */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse
          bg-purple-300/20 dark:bg-purple-600/10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000
          bg-blue-200/20 dark:bg-blue-600/10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl animate-pulse delay-2000
          bg-pink-200/20 dark:bg-pink-500/10"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Profile Header Section */}
        <div className={`transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="backdrop-blur-xl dark:bg-white/10 bg-white/70 rounded-3xl p-8 mb-8 border border-white/40 dark:border-white/20 shadow-2xl hover:shadow-blue-800/30 transition-all duration-500 hover:bg-white/80 dark:hover:bg-white/15">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Avatar Section */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-pink-400 dark:from-blue-700 dark:to-pink-800 rounded-full blur-sm group-hover:blur-lg transition-all duration-700 animate-pulse"></div>
                <div
                  className="relative w-32 h-32 rounded-full flex items-center justify-center border-4 border-white/70 dark:border-white/30 bg-gradient-to-br from-blue-200 via-indigo-200 to-pink-200 dark:from-blue-700 dark:via-indigo-700 dark:to-pink-700 cursor-pointer group"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  style={{ overflow: "hidden" }}
                  title="Change Profile Photo"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={user.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <UserIcon className="w-16 h-16 text-gray-600 dark:text-white/90 drop-shadow-lg" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs bg-black/40 text-white px-2 py-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Change Photo
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-300 to-emerald-300 dark:from-green-400 dark:to-emerald-400 text-yellow-900 dark:text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce border border-yellow-200 dark:border-green-300">
                  LV {user.level}
                </div>
              </div>
              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-gray-900 to-purple-600 dark:from-white dark:to-purple-200 bg-clip-text text-transparent">
                  {user.name}
                </h1>
                <p className="text-purple-800 dark:text-purple-200 text-xl mb-4">{user.title}</p>
                <p className="text-blue-700 dark:text-blue-200 mb-6 flex items-center justify-center lg:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>

                {/* XP Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm text-gray-700 dark:text-white/80">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                      Experience Points
                    </span>
                    <span>
                      {user.totalXP} XP
                      {" "}
                      <span className="text-xs text-gray-400 dark:text-gray-300 font-normal">
                        (Next level: {user.xpToNextLevel} XP)
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ProgressBar
                      progress={progressPercent}
                      color="blue"
                      animated
                      className="shadow flex-1"
                    />
                    <span className="text-gray-800 dark:text-white/80 font-semibold w-12 text-right">
                      {progressPercent}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* XP Stats Card (left) + Milestones (right) */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* XP Statistics */}
          <div className="lg:col-span-1 flex items-stretch">
            <div className="w-full backdrop-blur-xl dark:bg-white/10 bg-white/70 rounded-3xl p-6 border border-white/40 dark:border-white/20 shadow-2xl hover:shadow-blue-700/25 transition-all duration-500 hover:bg-white/80 dark:hover:bg-white/15 h-full flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500 dark:text-yellow-400 animate-pulse" />
                XP Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-xl bg-white/80 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 transition-colors duration-300 group">
                  <span className="text-gray-800 dark:text-white/80 group-hover:text-blue-800 dark:group-hover:text-white transition-colors">Total XP</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-300 group-hover:scale-110 transition-transform duration-300">
                    {user.totalXP}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-white/80 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 transition-colors duration-300 group">
                  <span className="text-gray-800 dark:text-white/80 group-hover:text-blue-800 dark:group-hover:text-white transition-colors">Level</span>
                  <span className="text-2xl font-bold text-green-700 dark:text-green-300 group-hover:scale-110 transition-transform duration-300">
                    {user.level}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-white/80 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 transition-colors duration-300 group">
                  <span className="text-gray-800 dark:text-white/80 group-hover:text-blue-800 dark:group-hover:text-white transition-colors">Next Level</span>
                  <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-300 group-hover:scale-110 transition-transform duration-300">
                    {user.xpToNextLevel} XP
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-white/80 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 transition-colors duration-300 group">
                  <span className="text-gray-800 dark:text-white/80 group-hover:text-blue-800 dark:group-hover:text-white transition-colors">Progress</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-200 group-hover:scale-110 transition-transform duration-300">
                    {progressPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Milestones */}
          <div className="lg:col-span-2 flex items-stretch">
            <div className={`w-full transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="backdrop-blur-xl dark:bg-white/10 bg-white/70 rounded-3xl p-6 border border-white/40 dark:border-white/20 shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 hover:bg-white/80 dark:hover:bg-white/15 h-full">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-pink-400 animate-pulse" />
                  Level Milestones
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className={`relative p-4 rounded-2xl border transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-1 ${
                        milestone.unlocked
                          ? 'bg-gradient-to-br from-blue-200/50 to-pink-200/50 dark:from-blue-700/20 dark:to-pink-700/20 border-blue-300/30 dark:border-blue-400/30 hover:border-blue-400/50 shadow-lg hover:shadow-blue-500/25'
                          : 'bg-white/70 dark:bg-white/5 border-white/40 dark:border-white/10 hover:border-blue-200/60 dark:hover:border-white/20 grayscale hover:grayscale-0'
                      }`}
                      onMouseEnter={() => setHoveredMilestone(milestone.id)}
                      onMouseLeave={() => setHoveredMilestone(null)}
                    >
                      {milestone.unlocked && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-300 to-emerald-300 dark:from-green-400 dark:to-emerald-400 rounded-full flex items-center justify-center animate-pulse border border-green-200 dark:border-green-300">
                          <span className="text-xs text-green-900 dark:text-white">✓</span>
                        </div>
                      )}
                      <div className="text-center">
                        <div className={`text-3xl mb-2 transition-transform duration-300 ${hoveredMilestone === milestone.id ? 'scale-125 animate-bounce' : ''}`}>
                          {milestone.icon}
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">{milestone.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-white/60 mb-2">{milestone.xp ? `${milestone.xp} XP` : milestone.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent XP Gains and Contact */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent XP Gains */}
          <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="backdrop-blur-xl dark:bg-white/10 bg-white/70 rounded-3xl p-6 border border-white/40 dark:border-white/20 shadow-2xl hover:shadow-green-500/25 transition-all duration-500 hover:bg-white/80 dark:hover:bg-white/15 h-full">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-blue-400 animate-pulse" />
                Recent XP Gains
              </h3>
              <div className="space-y-3">
                {recentXPGains.map((gain, index) => (
                  <div
                    key={gain.id}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-300 group cursor-pointer transform hover:scale-[1.02] hover:shadow-lg"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-200/50 to-purple-200/50 dark:from-blue-700/20 dark:to-purple-700/20 rounded-full flex items-center justify-center text-blue-700 dark:text-white group-hover:scale-110 transition-transform duration-300">
                      {getActivityIcon(gain.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors duration-300">{gain.activity}</h4>
                      <p className="text-sm text-gray-600 dark:text-white/60">{gain.date}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className="text-lg font-bold text-green-600 dark:text-green-300 group-hover:scale-110 transition-transform duration-300">
                        +{gain.xp} XP
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Contact Me Section */}
          <div className={`transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="backdrop-blur-xl dark:bg-white/10 bg-white/70 rounded-3xl p-6 border border-white/40 dark:border-white/20 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 hover:bg-white/80 dark:hover:bg-white/15 h-full">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Mail className="w-6 h-6 text-cyan-400 animate-pulse" />
                Feedback
              </h3>
              {/* Contact Form */}
              <div className="space-y-4">
                {['name', 'email', 'message'].map((field) => (
                  <div key={field} className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === field || formData[field]
                          ? '-top-2 text-xs bg-gradient-to-r from-blue-600 to-pink-400 dark:from-blue-400 dark:to-pink-400 bg-clip-text text-transparent'
                          : 'top-3 text-gray-600 dark:text-white/60'
                      }`}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {field === 'message' ? (
                      <textarea
                        className="w-full p-4 bg-white/90 dark:bg-white/10 border border-black/40 dark:border-cyan/20 rounded-2xl text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-blue-400/50 focus:bg-white/95 dark:focus:bg-white/15 transition-all duration-300 resize-none h-24 hover:shadow-lg"
                        onFocus={() => setFocusedField(field)}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        value={formData[field]}
                      />
                    ) : (
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        className="w-full p-4 bg-white/90 dark:bg-white/10 border border-black/40 dark:border-cyan/20 rounded-2xl text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-blue-400/50 focus:bg-white/95 dark:focus:bg-white/15 transition-all duration-300 hover:shadow-lg"
                        onFocus={() => setFocusedField(field)}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        value={formData[field]}
                      />
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    alert("Thank you for your feedback!");
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-pink-500 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;