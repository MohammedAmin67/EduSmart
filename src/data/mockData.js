// Mock Data for Smart Education Platform

export const userData = {
  id: 1,
  name: "Alex Johnson",
  email: "alex@example.com",
  level: 12,
  totalXP: 2850,
  xpToNextLevel: 150,
  currentStreak: 7,
  avatar: {
    level: 3,
    accessories: ["graduation_cap", "book", "star_badge"],
    unlocked: ["basic_outfit", "smart_glasses", "trophy"]
  },
  stats: {
    totalLessonsCompleted: 45,
    totalTimeSpent: 1250, // minutes
    averageAccuracy: 87,
    coursesCompleted: 3
  }
};

export const courses = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Master the basics of JavaScript programming",
    progress: 75,
    totalLessons: 20,
    completedLessons: 15,
    estimatedTime: 40,
    difficulty: "Beginner",
    category: "Programming",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "React Development",
    description: "Build modern web applications with React",
    progress: 45,
    totalLessons: 25,
    completedLessons: 11,
    estimatedTime: 60,
    difficulty: "Intermediate",
    category: "Web Development",
    color: "bg-purple-500"
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    description: "Learn efficient problem-solving techniques",
    progress: 20,
    totalLessons: 30,
    completedLessons: 6,
    estimatedTime: 80,
    difficulty: "Advanced",
    category: "Computer Science",
    color: "bg-green-500"
  }
];

export const currentLesson = {
  id: 1,
  courseId: 1,
  title: "Variables and Data Types",
  description: "Understanding how to store and manipulate data in JavaScript",
  type: "video", // video, text, interactive
  duration: 15, // minutes
  content: {
    videoUrl: "placeholder-video.mp4",
    transcript: "Welcome to JavaScript variables and data types...",
    keyPoints: [
      "Variables store data values",
      "JavaScript has dynamic typing",
      "Common data types: string, number, boolean, object"
    ]
  },
  completed: false,
  xpReward: 50
};

export const quizzes = {
  multipleChoice: {
    id: 1,
    lessonId: 1,
    question: "Which of the following is the correct way to declare a variable in JavaScript?",
    options: [
      "var myVariable = 5;",
      "variable myVariable = 5;",
      "v myVariable = 5;",
      "declare myVariable = 5;"
    ],
    correctAnswer: 0,
    explanation: "The 'var' keyword is used to declare variables in JavaScript.",
    xpReward: 25
  },
  dragAndDrop: {
    id: 2,
    lessonId: 1,
    question: "Drag the correct data type to match each value:",
    items: [
      { id: 1, content: "42", type: "draggable" },
      { id: 2, content: "true", type: "draggable" },
      { id: 3, content: "'Hello'", type: "draggable" },
      { id: 4, content: "{}", type: "draggable" }
    ],
    dropZones: [
      { id: 1, label: "Number", correctItemId: 1 },
      { id: 2, label: "Boolean", correctItemId: 2 },
      { id: 3, label: "String", correctItemId: 3 },
      { id: 4, label: "Object", correctItemId: 4 }
    ],
    xpReward: 30
  },
  fillInBlanks: {
    id: 3,
    lessonId: 1,
    question: "Complete the JavaScript variable declaration:",
    template: "_____ myName = '____';",
    blanks: [
      { id: 1, correctAnswer: "let", position: 0 },
      { id: 2, correctAnswer: "Alex", position: 1 }
    ],
    xpReward: 20
  }
};

export const achievements = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "🎯",
    unlockedDate: "2024-01-15",
    xpReward: 100,
    rarity: "common"
  },
  {
    id: 2,
    name: "Week Warrior",
    description: "Maintain a 7-day learning streak",
    icon: "🔥",
    unlockedDate: "2024-01-22",
    xpReward: 250,
    rarity: "rare"
  },
  {
    id: 3,
    name: "Quiz Master",
    description: "Answer 50 quiz questions correctly",
    icon: "🧠",
    unlockedDate: null,
    progress: 35,
    target: 50,
    xpReward: 500,
    rarity: "epic"
  },
  {
    id: 4,
    name: "Course Conqueror",
    description: "Complete an entire course",
    icon: "🏆",
    unlockedDate: "2024-01-10",
    xpReward: 1000,
    rarity: "legendary"
  }
];

export const dailyActivity = {
  streak: 7,
  todayMinutes: 45,
  todayLessons: 3,
  todayXP: 150,
  weeklyGoal: 300, // minutes
  weeklyProgress: 185
};

export const analyticsData = {
  weeklyProgress: [
    { day: "Mon", minutes: 30, lessons: 2, xp: 100 },
    { day: "Tue", minutes: 45, lessons: 3, xp: 150 },
    { day: "Wed", minutes: 25, lessons: 1, xp: 75 },
    { day: "Thu", minutes: 60, lessons: 4, xp: 200 },
    { day: "Fri", minutes: 35, lessons: 2, xp: 125 },
    { day: "Sat", minutes: 50, lessons: 3, xp: 175 },
    { day: "Sun", minutes: 40, lessons: 2, xp: 150 }
  ],
  subjectPerformance: [
    { subject: "JavaScript", accuracy: 92, timeSpent: 120, lessonsCompleted: 15 },
    { subject: "React", accuracy: 85, timeSpent: 80, lessonsCompleted: 8 },
    { subject: "Algorithms", accuracy: 78, timeSpent: 45, lessonsCompleted: 4 }
  ],
  monthlyStats: {
    totalMinutes: 850,
    totalLessons: 28,
    averageAccuracy: 85,
    bestStreak: 12,
    coursesStarted: 3,
    coursesCompleted: 1
  }
};

export const recentActivity = [
  {
    id: 1,
    type: "lesson_completed",
    title: "Arrays and Objects",
    courseTitle: "JavaScript Fundamentals",
    timestamp: "2024-01-20T10:30:00Z",
    xpEarned: 50
  },
  {
    id: 2,
    type: "quiz_completed",
    title: "Variables Quiz",
    courseTitle: "JavaScript Fundamentals",
    timestamp: "2024-01-20T09:15:00Z",
    xpEarned: 25,
    score: 90
  },
  {
    id: 3,
    type: "achievement_unlocked",
    title: "Week Warrior",
    timestamp: "2024-01-19T14:20:00Z",
    xpEarned: 250
  }
];