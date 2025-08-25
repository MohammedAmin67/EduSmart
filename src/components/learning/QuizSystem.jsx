import React, { useState } from 'react';
import { Check, X, RefreshCw } from 'lucide-react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import { quizzes } from '../../data/mockData';

const MultipleChoiceQuiz = ({ quiz, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  console.log(showExplanation)

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setSubmitted(true);
      setShowExplanation(true);
      const isCorrect = selectedAnswer === quiz.correctAnswer;
      setTimeout(() => onAnswer(isCorrect, quiz.xpReward), 2000);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{quiz.question}</h3>
      
      <div className="space-y-3 mb-6">
        {quiz.options.map((option, index) => (
          <div key={index} className="relative">
            <label className={`
              flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
              ${selectedAnswer === index 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
              }
              ${submitted 
                ? index === quiz.correctAnswer 
                  ? 'border-green-500 bg-green-50' 
                  : index === selectedAnswer && index !== quiz.correctAnswer
                    ? 'border-red-500 bg-red-50'
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
                ${selectedAnswer === index ? 'border-blue-500' : 'border-gray-300'}
              `}>
                {selectedAnswer === index && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <span className="flex-1">{option}</span>
              {submitted && index === quiz.correctAnswer && (
                <Check className="text-green-500" size={20} />
              )}
              {submitted && index === selectedAnswer && index !== quiz.correctAnswer && (
                <X className="text-red-500" size={20} />
              )}
            </label>
          </div>
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
        <div className="space-y-3">
          <div className={`p-4 rounded-lg ${
            selectedAnswer === quiz.correctAnswer 
              ? 'bg-green-50 text-green-800' 
              : 'bg-red-50 text-red-800'
          }`}>
            <div className="font-semibold">
              {selectedAnswer === quiz.correctAnswer ? '🎉 Correct!' : '❌ Incorrect'}
            </div>
            <div className="text-sm mt-1">{quiz.explanation}</div>
          </div>
        </div>
      )}
    </Card>
  );
};

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
      setTimeout(() => onAnswer(isCorrect, quiz.xpReward), 2000);
    }
  };

  const availableItems = quiz.items.filter(item => 
    !Object.values(droppedItems).some(dropped => dropped?.id === item.id)
  );

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{quiz.question}</h3>
      
      {/* Draggable Items */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Drag these items:</h4>
        <div className="flex flex-wrap gap-2">
          {availableItems.map((item) => (
            <div
              key={item.id}
              draggable={!submitted}
              onDragStart={() => handleDragStart(item)}
              className={`
                px-4 py-2 bg-blue-100 text-blue-800 rounded-lg cursor-move border-2 border-blue-200
                ${!submitted ? 'hover:bg-blue-200 hover:shadow-md' : 'opacity-60'}
                transition-all duration-200
              `}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {/* Drop Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {quiz.dropZones.map((zone) => {
          const droppedItem = droppedItems[zone.id];
          const isCorrect = submitted && droppedItem?.id === zone.correctItemId;
          const isIncorrect = submitted && droppedItem && droppedItem.id !== zone.correctItemId;

          return (
            <div
              key={zone.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(zone)}
              className={`
                min-h-16 p-4 border-2 border-dashed rounded-lg flex items-center justify-center
                transition-all duration-200
                ${droppedItem 
                  ? submitted
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
            >
              {droppedItem ? (
                <div className="flex items-center space-x-2">
                  <span>{droppedItem.content}</span>
                  {submitted && (
                    <>
                      {isCorrect && <Check className="text-green-500" size={16} />}
                      {isIncorrect && <X className="text-red-500" size={16} />}
                    </>
                  )}
                </div>
              ) : (
                <span className="text-gray-500">{zone.label}</span>
              )}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <Button 
          onClick={handleSubmit}
          disabled={Object.keys(droppedItems).length !== quiz.dropZones.length}
          className="w-full"
        >
          Submit Answer
        </Button>
      ) : (
        <div className={`p-4 rounded-lg ${
          quiz.dropZones.every(zone => droppedItems[zone.id]?.id === zone.correctItemId)
            ? 'bg-green-50 text-green-800'
            : 'bg-red-50 text-red-800'
        }`}>
          <div className="font-semibold">
            {quiz.dropZones.every(zone => droppedItems[zone.id]?.id === zone.correctItemId)
              ? '🎉 Perfect Match!'
              : '❌ Some items are incorrect'
            }
          </div>
        </div>
      )}
    </Card>
  );
};

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
      setTimeout(() => onAnswer(isCorrect, quiz.xpReward), 2000);
    }
  };

  const renderTemplate = () => {
    const parts = quiz.template.split('____');
    const result = [];
    
    parts.forEach((part, index) => {
      result.push(
        <span key={`text-${index}`} className="text-gray-900">
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
                inline-block px-2 py-1 border-b-2 bg-transparent text-center min-w-20 focus:outline-none
                ${submitted
                  ? isCorrect
                    ? 'border-green-500 text-green-700'
                    : isIncorrect
                      ? 'border-red-500 text-red-700'
                      : 'border-gray-300'
                  : 'border-blue-400 focus:border-blue-600'
                }
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
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">{quiz.question}</h3>
      
      <div className="text-lg leading-relaxed mb-8 p-4 bg-gray-50 rounded-lg">
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
        <div className={`p-4 rounded-lg ${
          quiz.blanks.every(blank => answers[blank.id]?.toLowerCase().trim() === blank.correctAnswer.toLowerCase())
            ? 'bg-green-50 text-green-800'
            : 'bg-red-50 text-red-800'
        }`}>
          <div className="font-semibold">
            {quiz.blanks.every(blank => answers[blank.id]?.toLowerCase().trim() === blank.correctAnswer.toLowerCase())
              ? '🎉 All blanks filled correctly!'
              : '❌ Some answers are incorrect'
            }
          </div>
          {submitted && (
            <div className="text-sm mt-2">
              Correct answers: {quiz.blanks.map(blank => blank.correctAnswer).join(', ')}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

const QuizSystem = () => {
  const [currentQuizType, setCurrentQuizType] = useState('multipleChoice');
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  const quizTypes = [
    { id: 'multipleChoice', label: 'Multiple Choice', component: MultipleChoiceQuiz },
    { id: 'dragAndDrop', label: 'Drag & Drop', component: DragAndDropQuiz },
    { id: 'fillInBlanks', label: 'Fill in Blanks', component: FillInBlanksQuiz }
  ];

  const handleAnswer = (isCorrect, xpReward) => {
    setLastResult({ isCorrect, xpReward });
    setShowResult(true);
  };

  const resetQuiz = () => {
    setShowResult(false);
    setLastResult(null);
    // Force re-render by cycling through quiz type
    setCurrentQuizType(prev => prev);
  };

  const getCurrentQuiz = () => {
    switch (currentQuizType) {
      case 'multipleChoice': return quizzes.multipleChoice;
      case 'dragAndDrop': return quizzes.dragAndDrop;
      case 'fillInBlanks': return quizzes.fillInBlanks;
      default: return quizzes.multipleChoice;
    }
  };

  const CurrentQuizComponent = quizTypes.find(type => type.id === currentQuizType)?.component;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Interactive Quiz</h2>
        <div className="flex space-x-2">
          {quizTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setCurrentQuizType(type.id)}
              className={`px-3 py-1 text-sm rounded-lg font-medium transition-colors ${
                currentQuizType === type.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {CurrentQuizComponent && (
        <CurrentQuizComponent 
          quiz={getCurrentQuiz()} 
          onAnswer={handleAnswer}
          key={`${currentQuizType}-${showResult}`} // Force re-render
        />
      )}

      <div className="flex justify-center">
        <Button
          onClick={resetQuiz}
          variant="outline"
          icon={<RefreshCw size={16} />}
        >
          Try Again
        </Button>
      </div>

      {/* Result Modal */}
      <Modal
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        title="Quiz Result"
        size="sm"
      >
        {lastResult && (
          <div className="text-center space-y-4">
            <div className={`text-6xl ${lastResult.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {lastResult.isCorrect ? '🎉' : '😔'}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {lastResult.isCorrect ? 'Excellent!' : 'Not quite right'}
              </h3>
              <p className="text-gray-600">
                {lastResult.isCorrect 
                  ? `You earned ${lastResult.xpReward} XP!` 
                  : 'Keep practicing to improve!'
                }
              </p>
            </div>
            <Button onClick={() => setShowResult(false)}>
              Continue Learning
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default QuizSystem;