import React, { useState } from 'react';
import { Check, X, RefreshCw, Sparkles, Star, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { lessonsByCourse, courses } from '../../data/mockData';

// --- Level Up Animation Character ---
const LevelUpCharacter = ({ show, xp, level }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        key="levelup"
        initial={{ scale: 0.5, opacity: 0, y: 80 }}
        animate={{ scale: 1.2, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 80 }}
        transition={{ duration: 0.7, type: 'spring', bounce: 0.5 }}
        className="fixed left-1/2 top-32 md:top-44 z-[9999] -translate-x-1/2 pointer-events-none"
        style={{ width: 340, maxWidth: "95vw" }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: [1, 1.13, 1.07, 1],
            rotate: [0, 34, -24, 0]
          }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 3.2, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute bg-gradient-to-br from-yellow-300 via-pink-400 to-fuchsia-400 opacity-40 blur-2xl rounded-full"
            style={{ width: 170, height: 170, zIndex: 1 }}
            animate={{
              scale: [1, 1.14, 1],
              opacity: [0.6, 0.85, 0.6]
            }}
            transition={{ duration: 1.7, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div
            className="relative z-10"
            initial={{ y: 10 }}
            animate={{
              y: [10, 0, 8, 0, 10],
              rotate: [0, -5, 7, 0]
            }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          >
            <span className="text-[64px] drop-shadow-xl select-none" role="img" aria-label="Wizard">
              🧙‍♂️
            </span>
            <motion.div
              className="absolute -top-5 left-1/2 -translate-x-1/2"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.89, 1.15, 0.89]
              }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            >
              <Sparkles size={38} className="text-yellow-300 drop-shadow-lg" />
            </motion.div>
            <motion.div
              className="absolute -right-8 top-2"
              animate={{ x: [0, -8, 3, 0], rotate: [0, 16, -12, 0], opacity: [0.5, 1, 0.7, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.9 }}
            >
              <Star className="text-yellow-400" size={30} />
            </motion.div>
            <motion.div
              className="absolute -left-8 top-12"
              animate={{ x: [0, 8, -3, 0], rotate: [0, -10, 18, 0], opacity: [0.5, 0.9, 0.7, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.1, delay: 0.6 }}
            >
              <Star className="text-pink-300" size={22} />
            </motion.div>
            <motion.div
              className="absolute -right-3 bottom-4"
              animate={{ y: [0, -7, 5, 0], opacity: [0.5, 0.85, 0.7, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.7 }}
            >
              <Star className="text-fuchsia-400" size={18} />
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-3 text-3xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent tracking-tight drop-shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.15, 1], opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Level Up!
        </motion.div>
        <motion.div
          className="text-lg font-bold text-pink-700 dark:text-pink-300 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Star className="text-yellow-400" size={20} />
          +{xp} XP
        </motion.div>
        <div className="text-base text-gray-600 dark:text-gray-300 mt-2">
          You reached Level <span className="font-bold text-fuchsia-600 dark:text-yellow-200">{level}</span>! <span role="img" aria-label="Party">🎉</span>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Multiple Choice Quiz ---
const MultipleChoiceQuiz = ({ quiz, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setSubmitted(true);
      const isCorrect = selectedAnswer === quiz.correctAnswer;
      setTimeout(() => onAnswer(isCorrect, quiz.xpReward), 1800);
    }
  };

  return (
    <Card className="p-4 sm:p-6 bg-white dark:bg-gray-900 border-0 shadow-lg">
      <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{quiz.question}</h3>
      <div className="space-y-3 mb-6">
        {quiz.options.map((option, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.07 }}
          >
            <label className={`
              flex items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all
              ${selectedAnswer === index 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/60' 
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-400'
              }
              ${submitted 
                ? index === quiz.correctAnswer 
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/40' 
                  : index === selectedAnswer && index !== quiz.correctAnswer
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/40'
                    : 'opacity-60'
                : ''
              }
            `}>
              <input
                type="radio"
                name="quiz-option"
                value={index}
                checked={selectedAnswer === index}
                onChange={() => !submitted && setSelectedAnswer(index)}
                disabled={submitted}
                className="sr-only"
              />
              <div className={`
                w-5 h-5 border-2 rounded-full mr-3 flex items-center justify-center
                ${selectedAnswer === index ? 'border-blue-500' : 'border-gray-300 dark:border-gray-500'}
              `}>
                {selectedAnswer === index && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <span className="flex-1 text-sm sm:text-base text-gray-900 dark:text-gray-100">{option}</span>
              {submitted && index === quiz.correctAnswer && (
                <Check className="text-green-500" size={20} />
              )}
              {submitted && index === selectedAnswer && index !== quiz.correctAnswer && (
                <X className="text-red-500" size={20} />
              )}
            </label>
          </motion.div>
        ))}
      </div>
      {!submitted ? (
        <Button 
          onClick={handleSubmit} 
          disabled={selectedAnswer === null}
          className="w-full"
        >
          Submit Answer
        </Button>
      ) : (
        <motion.div
          className={`p-4 rounded-lg ${
            selectedAnswer === quiz.correctAnswer 
              ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
              : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200'
          }`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="font-semibold">
            {selectedAnswer === quiz.correctAnswer ? '🎉 Correct!' : '❌ Incorrect'}
          </div>
          <div className="text-xs sm:text-sm mt-1">{quiz.explanation}</div>
        </motion.div>
      )}
    </Card>
  );
};

// --- Drag And Drop Quiz ---
const DragAndDropQuiz = ({ quiz, onAnswer }) => {
  const [droppedItems, setDroppedItems] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (dropZone) => {
    if (draggedItem && !submitted) {
      setDroppedItems(prev => ({
        ...prev,
        [dropZone.id]: draggedItem
      }));
      setDraggedItem(null);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(droppedItems).length === quiz.dropZones.length) {
      setSubmitted(true);
      const correctAnswers = quiz.dropZones.filter(zone => 
        droppedItems[zone.id]?.id === zone.correctItemId
      ).length;
      const isCorrect = correctAnswers === quiz.dropZones.length;
      setTimeout(() => onAnswer(isCorrect, quiz.xpReward), 1800);
    }
  };

  const availableItems = quiz.items.filter(item => 
    !Object.values(droppedItems).some(dropped => dropped?.id === item.id)
  );

  return (
    <Card className="p-4 sm:p-6 bg-white dark:bg-gray-900 border-0 shadow-lg">
      <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{quiz.question}</h3>
      {/* Draggable Items */}
      <div className="mb-6">
        <h4 className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Drag these items:</h4>
        <motion.div layout className="flex flex-wrap gap-2">
          {availableItems.map((item) => (
            <motion.div
              key={item.id}
              draggable={!submitted}
              onDragStart={() => handleDragStart(item)}
              className={`
                px-3 py-2 sm:px-4 sm:py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-lg cursor-move border-2 border-blue-200 dark:border-blue-700
                ${!submitted ? 'hover:bg-blue-200 hover:shadow-md dark:hover:bg-blue-800' : 'opacity-60'}
                transition-all duration-200 text-xs sm:text-base select-none
              `}
              whileHover={!submitted ? { scale: 1.08, rotate: 3 } : {}}
              whileTap={!submitted ? { scale: 0.96, rotate: -2 } : {}}
            >
              {item.content}
              <ArrowUpRight className="inline ml-1 text-blue-400 dark:text-blue-200" size={14} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* Drop Zones */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
        {quiz.dropZones.map((zone) => {
          const droppedItem = droppedItems[zone.id];
          const isCorrect = submitted && droppedItem?.id === zone.correctItemId;
          const isIncorrect = submitted && droppedItem && droppedItem.id !== zone.correctItemId;
          return (
            <motion.div
              key={zone.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(zone)}
              className={`
                min-h-12 sm:min-h-16 p-3 sm:p-4 border-2 border-dashed rounded-lg flex items-center justify-center
                transition-all duration-200 relative
                ${droppedItem 
                  ? submitted
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                    : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400'
                }
                ${draggedItem && !droppedItem && !submitted ? 'ring-2 ring-blue-400 dark:ring-blue-700' : ''}
              `}
            >
              {droppedItem ? (
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <span className="text-xs sm:text-base text-gray-900 dark:text-gray-100">{droppedItem.content}</span>
                  {submitted && (
                    <>
                      {isCorrect && <Check className="text-green-500" size={16} />}
                      {isIncorrect && <X className="text-red-500" size={16} />}
                    </>
                  )}
                  <ArrowDownLeft className="inline text-blue-400 dark:text-blue-200" size={14} />
                </motion.div>
              ) : (
                <span className="text-gray-500 dark:text-gray-300 text-xs sm:text-base">{zone.label}</span>
              )}
            </motion.div>
          );
        })}
      </motion.div>
      {!submitted ? (
        <Button 
          onClick={handleSubmit}
          disabled={Object.keys(droppedItems).length !== quiz.dropZones.length}
          className="w-full"
        >
          Submit Answer
        </Button>
      ) : (
        <motion.div
          className={`p-4 rounded-lg ${
            quiz.dropZones.every(zone => droppedItems[zone.id]?.id === zone.correctItemId)
              ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200'
              : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200'
          }`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="font-semibold">
            {quiz.dropZones.every(zone => droppedItems[zone.id]?.id === zone.correctItemId)
              ? '🎉 Perfect Match!'
              : '❌ Some items are incorrect'
            }
          </div>
        </motion.div>
      )}
    </Card>
  );
};

// --- Fill In Blanks Quiz ---
const FillInBlanksQuiz = ({ quiz, onAnswer }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (blankId, value) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [blankId]: value }));
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === quiz.blanks.length) {
      setSubmitted(true);
      const correctAnswers = quiz.blanks.filter(blank => 
        answers[blank.id]?.toLowerCase().trim() === blank.correctAnswer.toLowerCase()
      ).length;
      const isCorrect = correctAnswers === quiz.blanks.length;
      setTimeout(() => onAnswer(isCorrect, quiz.xpReward), 1800);
    }
  };

  const renderTemplate = () => {
    const parts = quiz.template.split('____');
    const result = [];
    parts.forEach((part, index) => {
      result.push(
        <span key={`text-${index}`} className="text-gray-900 dark:text-gray-100">
          {part}
        </span>
      );
      if (index < parts.length - 1) {
        const blank = quiz.blanks[index];
        const userAnswer = answers[blank.id] || '';
        const isCorrect = submitted && userAnswer.toLowerCase().trim() === blank.correctAnswer.toLowerCase();
        const isIncorrect = submitted && userAnswer && !isCorrect;
        result.push(
          <span key={`blank-${index}`} className="relative inline-block">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => handleInputChange(blank.id, e.target.value)}
              disabled={submitted}
              className={`
                inline-block px-2 py-1 border-b-2 bg-transparent text-center min-w-16 sm:min-w-20 focus:outline-none text-xs sm:text-base
                ${submitted
                  ? isCorrect
                    ? 'border-green-500 text-green-700 dark:border-green-400 dark:text-green-300'
                    : isIncorrect
                      ? 'border-red-500 text-red-700 dark:border-red-400 dark:text-red-300'
                      : 'border-gray-300 dark:border-gray-600'
                  : 'border-blue-400 dark:border-blue-500 focus:border-blue-600 dark:focus:border-blue-400'
                }
                dark:bg-gray-900
              `}
              placeholder="____"
            />
            {submitted && (
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs">
                {isCorrect && <Check className="text-green-500 mx-auto" size={16} />}
                {isIncorrect && <X className="text-red-500 mx-auto" size={16} />}
              </span>
            )}
          </span>
        );
      }
    });
    return result;
  };

  return (
    <Card className="p-4 sm:p-6 bg-white dark:bg-gray-900 border-0 shadow-lg">
      <h3 className="text-base sm:text-lg font-semibold mb-6 text-gray-900 dark:text-gray-100">{quiz.question}</h3>
      <div className="text-base leading-relaxed mb-8 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-x-auto">
        {renderTemplate()}
      </div>
      {!submitted ? (
        <Button 
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== quiz.blanks.length}
          className="w-full"
        >
          Submit Answer
        </Button>
      ) : (
        <motion.div
          className={`p-4 rounded-lg ${
            quiz.blanks.every(blank => answers[blank.id]?.toLowerCase().trim() === blank.correctAnswer.toLowerCase())
              ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200'
              : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200'
          }`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="font-semibold">
            {quiz.blanks.every(blank => answers[blank.id]?.toLowerCase().trim() === blank.correctAnswer.toLowerCase())
              ? '🎉 All blanks filled correctly!'
              : '❌ Some answers are incorrect'
            }
          </div>
          {submitted && (
            <div className="text-xs sm:text-sm mt-2">
              Correct answers: {quiz.blanks.map(blank => blank.correctAnswer).join(', ')}
            </div>
          )}
        </motion.div>
      )}
    </Card>
  );
};

const QuizSystem = ({ selectedCourseId }) => {
  const [currentQuizType, setCurrentQuizType] = useState('multipleChoice');
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);

  // Pick the lesson and quizzes for the selected course
  const course = courses.find(c => c.id === selectedCourseId) || courses[0];
  const lesson = lessonsByCourse?.[course.id]?.[0];
  const quizzesArr = lesson?.questions || [];

  const quizTypes = [
    { id: 'multipleChoice', label: 'Multiple Choice', component: MultipleChoiceQuiz },
    { id: 'dragAndDrop', label: 'Drag & Drop', component: DragAndDropQuiz },
    { id: 'fillInBlanks', label: 'Fill in Blanks', component: FillInBlanksQuiz }
  ];

  // XP/Level up system
  const handleAnswer = (isCorrect, xpReward) => {
    if (isCorrect) {
      const newXP = xp + xpReward;
      if (newXP >= 100) {
        setShowLevelUp(true);
        setTimeout(() => {
          setLevel(lvl => lvl + 1);
          setXP(newXP - 100);
          setShowLevelUp(false);
        }, 1800);
      } else {
        setXP(newXP);
      }
    }
    setLastResult({ isCorrect, xpReward });
    setShowResult(true);
  };

  const resetQuiz = () => {
    setShowResult(false);
    setLastResult(null);
    setXP(0);
    setLevel(1);
    setShowLevelUp(false);
  };

  // Get the quiz object for the selected type
  const getCurrentQuiz = () => {
    switch (currentQuizType) {
      case 'multipleChoice':
        return quizzesArr.find(q => q.type === 'multipleChoice');
      case 'dragAndDrop':
        return quizzesArr.find(q => q.type === 'dragAndDrop');
      case 'fillInBlanks':
        return quizzesArr.find(q => q.type === 'fillInBlanks');
      default:
        return quizzesArr[0];
    }
  };

  const CurrentQuizComponent = quizTypes.find(type => type.id === currentQuizType)?.component;
  const currentQuiz = getCurrentQuiz();

  if (!lesson || !currentQuiz) {
    return (
      <Card className="p-6 text-center mt-7 bg-white dark:bg-gray-900 border-0 shadow-lg">
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          No quizzes found for this course.
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 mt-7 transition-colors duration-500">
      <LevelUpCharacter show={showLevelUp} xp={100} level={level + 1} />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Interactive Quiz</h2>
        <div className="flex flex-wrap gap-2 overflow-x-auto">
          {quizTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setCurrentQuizType(type.id)}
              className={`px-3 py-1 text-xs sm:text-sm rounded-lg font-medium transition-colors ${
                currentQuizType === type.id
                  ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200'
                  : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      {CurrentQuizComponent && currentQuiz && (
        <CurrentQuizComponent 
          quiz={currentQuiz} 
          onAnswer={handleAnswer}
          key={`${currentQuizType}-${showResult}-${level}-${xp}-${course.id}`} // Force re-render
        />
      )}
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
        <Button
          onClick={resetQuiz}
          variant="outline"
          icon={<RefreshCw size={16} />}
          className="w-full sm:w-auto"
        >
          Try Again
        </Button>
      </div>
      {/* Only render Modal if there is a result */}
      {showResult && lastResult && (
        <Modal
          isOpen={showResult}
          onClose={() => setShowResult(false)}
          title="Quiz Result"
          size="sm"
        >
          <div className={`
            text-center space-y-4 
            bg-white dark:bg-gray-900 
            rounded-xl p-4
            transition-colors duration-300
          `}>
            <div className={`text-4xl sm:text-6xl ${lastResult.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {lastResult.isCorrect ? '🎉' : '😔'}
            </div>
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-semibold">
                {lastResult.isCorrect ? 'Excellent!' : 'Not quite right'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-base">
                {lastResult.isCorrect 
                  ? `You earned ${lastResult.xpReward} XP!` 
                  : 'Keep practicing to improve!'
                }
              </p>
            </div>
            <div className="text-md text-pink-700 dark:text-pink-300 font-bold">
              XP: <span className="text-yellow-500">{xp}</span> / 100
              <span className="ml-2">| Level: <span className="text-fuchsia-600 dark:text-yellow-300">{level}</span></span>
            </div>
            <Button onClick={() => setShowResult(false)}>
              Continue Learning
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default QuizSystem;