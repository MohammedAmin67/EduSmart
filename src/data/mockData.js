// Enhanced Mock Data for EduSmart Platform

export const userData = {
  id: 1,
  name: "Alex Johnson",
  email: "alex@example.com",
  level: 12,
  totalXP: 2850,
  xpToNextLevel: 300,
  currentStreak: 7,
  coursesStarted: 5,          
  coursesCompleted: 3,         
  avatar: {
    level: 12,
    accessories: ["graduation_cap", "book", "star_badge", "wizard_hat", "magic_staff"],
    unlocked: ["basic_outfit", "smart_glasses", "trophy", "gold_medal"]
  },
  stats: {
    totalLessonsCompleted: 45,
    totalTimeSpent: 1250,
    averageAccuracy: 87,
    coursesCompleted: 3
  }
};

export const courses = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Master the basics of modern JavaScript programming.",
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
    description: "Build beautiful web apps with React.",
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
    description: "Learn efficient problem-solving and coding techniques.",
    progress: 20,
    totalLessons: 30,
    completedLessons: 6,
    estimatedTime: 80,
    difficulty: "Advanced",
    category: "Computer Science",
    color: "bg-green-500"
  },
  {
    id: 4,
    title: "Python for Beginners",
    description: "Start your Python journey with practical exercises.",
    progress: 0,
    totalLessons: 15,
    completedLessons: 0,
    estimatedTime: 35,
    difficulty: "Beginner",
    category: "Programming",
    color: "bg-yellow-500"
  },
  {
    id: 5,
    title: "UI/UX Design Basics",
    description: "Fundamentals of user-centric design and prototyping.",
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    estimatedTime: 28,
    difficulty: "Beginner",
    category: "Design",
    color: "bg-pink-500"
  },
  {
    id: 6,
    title: "Machine Learning 101",
    description: "Introduction to concepts & tools in ML.",
    progress: 0,
    totalLessons: 18,
    completedLessons: 0,
    estimatedTime: 45,
    difficulty: "Intermediate",
    category: "Data Science",
    color: "bg-indigo-500"
  }
];



// -- Each course has its own lesson(s) and quiz(zes) --
export const lessonsByCourse = {
  1: [
    {
      id: 1,
      courseId: 1,
      title: "Variables and Data Types",
      description: "Understanding how to store and manipulate data in JavaScript.",
      type: "video",
      duration: 15,
      content: {
        videoUrl: "js-variables.mp4",
        transcript: "Welcome to JavaScript variables and data types. We'll cover var, let, const, and the core data types you will use most often. Try to follow along with the code examples and feel free to pause and rewind.",
        keyPoints: [
          "Variables store data values",
          "JavaScript has dynamic typing",
          "Common data types: string, number, boolean, object",
          "Use let/const for modern JS",
          "Variable names must start with a letter, $, or _"
        ]
      },
      completed: false,
      xpReward: 50,
      questions: [
        {
          id: 101,
          type: "multipleChoice",
          question: "Which is the correct way to declare a variable in JavaScript?",
          options: [
            "var myVariable = 5;",
            "variable myVariable = 5;",
            "v myVariable = 5;",
            "declare myVariable = 5;"
          ],
          correctAnswer: 0,
          explanation: "The 'var' keyword is used to declare variables in JavaScript.",
          xpReward: 20
        },
        {
          id: 102,
          type: "dragAndDrop",
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
          xpReward: 20
        },
        {
          id: 103,
          type: "fillInBlanks",
          question: "Complete the JavaScript variable declaration:",
          template: "_____ myName = '____';",
          blanks: [
            { id: 1, correctAnswer: "let", position: 0 },
            { id: 2, correctAnswer: "Alex", position: 1 }
          ],
          xpReward: 10
        }
      ]
    }
  ],
  2: [
    {
      id: 2,
      courseId: 2,
      title: "Intro to React",
      description: "Learn the basics of React, components, and JSX.",
      type: "video",
      duration: 18,
      content: {
        videoUrl: "react-intro.mp4",
        transcript: "This lesson covers what React is, how components work, and how to use JSX to build UI.",
        keyPoints: [
          "React is a JavaScript library for building UIs",
          "Components let you split UI into independent pieces",
          "JSX lets you write HTML in JS",
          "Props are how you pass data",
          "State is used for interactivity"
        ]
      },
      completed: false,
      xpReward: 60,
      questions: [
        {
          id: 201,
          type: "multipleChoice",
          question: "What does JSX stand for in React?",
          options: [
            "JavaScript XML",
            "Java Syntax Extension",
            "JavaScript Extension",
            "Java Source X"
          ],
          correctAnswer: 0,
          explanation: "JSX stands for JavaScript XML.",
          xpReward: 20
        },
        {
          id: 202,
          type: "dragAndDrop",
          question: "Match the React concept to the definition:",
          items: [
            { id: 1, content: "Component", type: "draggable" },
            { id: 2, content: "Props", type: "draggable" },
            { id: 3, content: "State", type: "draggable" }
          ],
          dropZones: [
            { id: 1, label: "Used for interactivity", correctItemId: 3 },
            { id: 2, label: "Reusable UI piece", correctItemId: 1 },
            { id: 3, label: "Data passed to component", correctItemId: 2 }
          ],
          xpReward: 20
        },
        {
          id: 203,
          type: "fillInBlanks",
          question: "Fill in the blank: React components return ____.",
          template: "React components return ____.",
          blanks: [
            { id: 1, correctAnswer: "JSX", position: 0 }
          ],
          xpReward: 10
        }
      ]
    }
  ],
  3: [
    {
      id: 3,
      courseId: 3,
      title: "Algorithm Basics",
      description: "The foundations of algorithms and Big O Notation.",
      type: "video",
      duration: 22,
      content: {
        videoUrl: "algorithms-basics.mp4",
        transcript: "In this lesson, we will explore what algorithms are and how we measure their efficiency using Big O notation.",
        keyPoints: [
          "Algorithm = step-by-step procedure",
          "Efficiency matters",
          "Big O = performance measurement",
          "Common structures: arrays, stacks, queues"
        ]
      },
      completed: false,
      xpReward: 70,
      questions: [
        {
          id: 301,
          type: "multipleChoice",
          question: "What does Big O Notation describe?",
          options: [
            "Algorithm performance",
            "Variable scope",
            "UI layout",
            "Programming errors"
          ],
          correctAnswer: 0,
          explanation: "Big O notation describes the performance (efficiency) of an algorithm.",
          xpReward: 20
        },
        {
          id: 302,
          type: "dragAndDrop",
          question: "Match the data structure to its property:",
          items: [
            { id: 1, content: "Stack", type: "draggable" },
            { id: 2, content: "Queue", type: "draggable" }
          ],
          dropZones: [
            { id: 1, label: "First-In-First-Out", correctItemId: 2 },
            { id: 2, label: "Last-In-First-Out", correctItemId: 1 }
          ],
          xpReward: 20
        },
        {
          id: 303,
          type: "fillInBlanks",
          question: "Complete: An ____ is a step-by-step solution.",
          template: "An ____ is a step-by-step solution.",
          blanks: [
            { id: 1, correctAnswer: "algorithm", position: 0 }
          ],
          xpReward: 10
        }
      ]
    }
  ],
  4: [
    {
      id: 4,
      courseId: 4,
      title: "Getting Started with Python",
      description: "Begin your journey with Python variables and syntax.",
      type: "video",
      duration: 14,
      content: {
        videoUrl: "python-intro.mp4",
        transcript: "This lesson introduces Python syntax, variables, and how to run your first Python program.",
        keyPoints: [
          "Python uses indentation",
          "Variables are dynamically typed",
          "Print with print()",
          "No semicolons needed"
        ]
      },
      completed: false,
      xpReward: 45,
      questions: [
        {
          id: 401,
          type: "multipleChoice",
          question: "How do you print text in Python?",
          options: [
            "print('Hello')",
            "console.log('Hello')",
            "echo 'Hello';",
            "System.out.println('Hello')"
          ],
          correctAnswer: 0,
          explanation: "Use print('Hello') to print in Python.",
          xpReward: 15
        },
        {
          id: 402,
          type: "dragAndDrop",
          question: "Match the Python concept to its description:",
          items: [
            { id: 1, content: "Indentation", type: "draggable" },
            { id: 2, content: "Dynamic typing", type: "draggable" }
          ],
          dropZones: [
            { id: 1, label: "No need to declare variable types", correctItemId: 2 },
            { id: 2, label: "Controls code structure", correctItemId: 1 }
          ],
          xpReward: 15
        },
        {
          id: 403,
          type: "fillInBlanks",
          question: "Fill: print(____)",
          template: "print(____)",
          blanks: [
            { id: 1, correctAnswer: "'Hello'", position: 0 }
          ],
          xpReward: 5
        }
      ]
    }
  ],
  5: [
    {
      id: 5,
      courseId: 5,
      title: "What is UI/UX?",
      description: "Understand the difference between UI and UX design.",
      type: "video",
      duration: 11,
      content: {
        videoUrl: "uiux-intro.mp4",
        transcript: "UI is about how things look. UX is about how things work for the user. Both are essential for good design.",
        keyPoints: [
          "UI = User Interface (visuals)",
          "UX = User Experience (interaction)",
          "Both needed for great products"
        ]
      },
      completed: false,
      xpReward: 40,
      questions: [
        {
          id: 501,
          type: "multipleChoice",
          question: "What does UI stand for?",
          options: [
            "User Interface",
            "Universal Input",
            "User Internet",
            "Unified Interaction"
          ],
          correctAnswer: 0,
          explanation: "UI stands for User Interface.",
          xpReward: 10
        },
        {
          id: 502,
          type: "dragAndDrop",
          question: "Match the design area to what it focuses on:",
          items: [
            { id: 1, content: "UI", type: "draggable" },
            { id: 2, content: "UX", type: "draggable" }
          ],
          dropZones: [
            { id: 1, label: "Look & feel", correctItemId: 1 },
            { id: 2, label: "Ease of use", correctItemId: 2 }
          ],
          xpReward: 10
        },
        {
          id: 503,
          type: "fillInBlanks",
          question: "Fill: ____ is about how things work for the user.",
          template: "____ is about how things work for the user.",
          blanks: [
            { id: 1, correctAnswer: "UX", position: 0 }
          ],
          xpReward: 5
        }
      ]
    }
  ],
  6: [
    {
      id: 6,
      courseId: 6,
      title: "Machine Learning Overview",
      description: "An introduction to the field and its terminology.",
      type: "video",
      duration: 20,
      content: {
        videoUrl: "ml-overview.mp4",
        transcript: "Machine learning is a field of AI that lets systems learn patterns from data. This lesson covers ML basics and types.",
        keyPoints: [
          "ML is a type of AI",
          "Learns from data",
          "Supervised vs unsupervised learning",
          "Requires lots of data"
        ]
      },
      completed: false,
      xpReward: 55,
      questions: [
        {
          id: 601,
          type: "multipleChoice",
          question: "Machine learning is a subfield of what?",
          options: [
            "Artificial Intelligence",
            "Web Development",
            "UI Design",
            "Networking"
          ],
          correctAnswer: 0,
          explanation: "ML is a subfield of AI (Artificial Intelligence).",
          xpReward: 15
        },
        {
          id: 602,
          type: "dragAndDrop",
          question: "Match the ML type to its description:",
          items: [
            { id: 1, content: "Supervised", type: "draggable" },
            { id: 2, content: "Unsupervised", type: "draggable" }
          ],
          dropZones: [
            { id: 1, label: "Learns from labeled data", correctItemId: 1 },
            { id: 2, label: "Finds patterns in unlabeled data", correctItemId: 2 }
          ],
          xpReward: 15
        },
        {
          id: 603,
          type: "fillInBlanks",
          question: "Fill: ML stands for ____.",
          template: "ML stands for ____.",
          blanks: [
            { id: 1, correctAnswer: "Machine Learning", position: 0 }
          ],
          xpReward: 5
        }
      ]
    }
  ]
};

export const currentLesson = {
  id: 1,
  title: 'Variables and Data Types',
  description: 'Understanding how to store and manipulate data in JavaScript.',
  type: 'video',
  content: {
    videoUrl: 'js-variables.mp4'
  },
  courseId: 1,
  duration: 15,
  questions: [/* ... */]
};

export const dailyActivity = {
  todayXP: 35,
  todayLessons: 2,
  todayMinutes: 25,
  streak: 7,
  weeklyGoal: 300,
  weeklyProgress: 180
};

export const analyticsData = {
  weeklyChart: [
    { day: 'Mon', xp: 50, minutes: 40 },
    { day: 'Tue', xp: 80, minutes: 60 },
    { day: 'Wed', xp: 30, minutes: 20 },
    { day: 'Thu', xp: 90, minutes: 70 },
    { day: 'Fri', xp: 65, minutes: 55 },
    { day: 'Sat', xp: 110, minutes: 90 },
    { day: 'Sun', xp: 20, minutes: 10 }
  ],
  subjectPerformance: [
    {
      subject: "JavaScript",
      accuracy: 87,
      timeSpent: 350,
      lessonsCompleted: 12
    },
    {
      subject: "React",
      accuracy: 92,
      timeSpent: 430,
      lessonsCompleted: 15
    },
    {
      subject: "Python",
      accuracy: 78,
      timeSpent: 220,
      lessonsCompleted: 8
    }
  ],
  monthlyStats: {
    totalMinutes: 1890,
    totalLessons: 40,
    averageAccuracy: 86,
    bestStreak: 7
  }
};

export const achievements = [
  {
    id: 1,
    name: 'First Steps',
    description: 'Completed your first lesson!',
    icon: '🎉',
    xpReward: 20,
    rarity: 'common',
    unlockedDate: '2025-08-22T14:30:00Z'
  },
  {
    id: 2,
    name: 'Quiz Master',
    description: 'Scored 100% on a quiz.',
    icon: '🏆',
    xpReward: 50,
    rarity: 'rare',
    unlockedDate: '2025-08-23T11:10:00Z'
  },
  {
    id: 3,
    name: 'Streaker',
    description: 'Maintain a 7-day learning streak.',
    icon: '🔥',
    xpReward: 70,
    rarity: 'epic',
    unlockedDate: null,
    progress: 5, // in-progress, current streak 5/7
    target: 7
  },
  {
    id: 4,
    name: 'Perfectionist',
    description: 'Achieve 90%+ accuracy in lessons for a week.',
    icon: '🌟',
    xpReward: 100,
    rarity: 'legendary',
    unlockedDate: null
  },
  {
    id: 5,
    name: 'Explorer',
    description: 'Complete 5 different courses.',
    icon: '🗺️',
    xpReward: 60,
    rarity: 'epic',
    unlockedDate: '2025-08-25T17:20:00Z'
  },
  {
    id: 6,
    name: 'Night Owl',
    description: 'Study after midnight 3 days in a row.',
    icon: '🦉',
    xpReward: 40,
    rarity: 'rare',
    unlockedDate: null,
    progress: 2,
    target: 3
  },
  {
    id: 7,
    name: 'Speed Learner',
    description: 'Finish a lesson in under 10 minutes.',
    icon: '⚡',
    xpReward: 25,
    rarity: 'common',
    unlockedDate: '2025-08-24T09:45:00Z'
  },
  {
    id: 8,
    name: 'Social Butterfly',
    description: 'Invite 3 friends to join EduSmart.',
    icon: '🦋',
    xpReward: 30,
    rarity: 'rare',
    unlockedDate: null
  }
];