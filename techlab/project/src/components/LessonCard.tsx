import React, { useState } from 'react';
import { CheckCircle, Clock, Star, Play, BookOpen } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  color: string;
  topics: string[];
}

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  onComplete: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, isCompleted, onComplete }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  const startLesson = () => {
    if (isCompleted) return;
    
    setIsStarted(true);
    // Симуляция прогресса урока
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Легко': return 'text-green-700 bg-green-100 border-green-200';
      case 'Средне': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'Сложно': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white border border-gray-100">
      {/* Header with gradient */}
      <div className={`${lesson.color} p-6 relative`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(lesson.difficulty)}`}>
              {lesson.difficulty}
            </span>
            {isCompleted && (
              <div className="bg-green-500 rounded-full p-1">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            )}
          </div>

          <h3 className="text-2xl font-bold text-white mb-3 group-hover:scale-105 transition-transform">
            {lesson.title}
          </h3>
          
          <div className="flex items-center space-x-4 text-white/90 mb-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{lesson.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">{lesson.topics.length} тем</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-6 leading-relaxed">
          {lesson.description}
        </p>

        {/* Topics */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Что изучим:</h4>
          <div className="flex flex-wrap gap-2">
            {lesson.topics.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        {isStarted && progress < 100 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Прогресс</span>
              <span className="text-sm text-gray-500">{progress}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full h-2 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action button */}
        <button
          onClick={startLesson}
          disabled={isStarted && progress < 100}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
            isCompleted
              ? 'bg-green-100 text-green-700 border-2 border-green-200 cursor-default'
              : isStarted && progress < 100
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transform hover:scale-105 shadow-lg hover:shadow-xl'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="h-5 w-5" />
              <span>Урок завершен</span>
            </>
          ) : isStarted && progress < 100 ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Изучаем...</span>
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              <span>Начать урок</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};