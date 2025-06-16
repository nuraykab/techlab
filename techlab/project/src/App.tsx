import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LessonCard } from './components/LessonCard';
import { CodeEditor } from './components/CodeEditor';
import { QuizGame } from './components/QuizGame';
import { ProgressTracker } from './components/ProgressTracker';
import { Footer } from './components/Footer';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'lessons' | 'code' | 'quiz' | 'progress'>('home');
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userStats, setUserStats] = useState({
    totalTimeSpent: 0,
    streakDays: 3,
    codesWritten: 12
  });

  const lessons = [
    {
      id: 1,
      title: "Что такое программирование?",
      description: "Узнай, что такое код и как работают компьютеры",
      difficulty: "Легко",
      duration: "10 мин",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      topics: ["Основы", "Алгоритмы", "Логика"]
    },
    {
      id: 2,
      title: "Первые команды",
      description: "Изучи основные команды программирования",
      difficulty: "Легко",
      duration: "15 мин",
      color: "bg-gradient-to-br from-green-400 to-green-600",
      topics: ["Python", "Синтаксис", "Переменные"]
    },
    {
      id: 3,
      title: "Циклы и условия",
      description: "Научись создавать логические конструкции",
      difficulty: "Средне",
      duration: "20 мин",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      topics: ["Циклы", "Условия", "Логика"]
    },
    {
      id: 4,
      title: "Создаем игру",
      description: "Применяем знания для создания простой игры",
      difficulty: "Сложно",
      duration: "30 мин",
      color: "bg-gradient-to-br from-orange-400 to-orange-600",
      topics: ["Проект", "Игры", "Практика"]
    },
    {
      id: 5,
      title: "Работа с данными",
      description: "Изучи списки, словари и структуры данных",
      difficulty: "Средне",
      duration: "25 мин",
      color: "bg-gradient-to-br from-indigo-400 to-indigo-600",
      topics: ["Данные", "Списки", "Словари"]
    },
    {
      id: 6,
      title: "Создание веб-страницы",
      description: "Основы HTML и CSS для создания сайтов",
      difficulty: "Средне",
      duration: "35 мин",
      color: "bg-gradient-to-br from-pink-400 to-pink-600",
      topics: ["HTML", "CSS", "Веб-разработка"]
    }
  ];

  const completeLesson = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      setUserStats(prev => ({
        ...prev,
        totalTimeSpent: prev.totalTimeSpent + 15,
        codesWritten: prev.codesWritten + 1
      }));
    }
  };

  const handleViewChange = (view: typeof currentView) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentView(view);
      setIsLoading(false);
    }, 300);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    switch (currentView) {
      case 'lessons':
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Интерактивные уроки</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Изучай программирование пошагово с нашими увлекательными уроками
                </p>
              </div>
              
              {/* Статистика прогресса */}
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{completedLessons.length}</div>
                  <div className="text-gray-600">Уроков завершено</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{userStats.totalTimeSpent}</div>
                  <div className="text-gray-600">Минут изучения</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{userStats.streakDays}</div>
                  <div className="text-gray-600">Дней подряд</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {lessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    isCompleted={completedLessons.includes(lesson.id)}
                    onComplete={() => completeLesson(lesson.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'code':
        return <CodeEditor />;
      case 'quiz':
        return <QuizGame onComplete={() => completeLesson(0)} />;
      case 'progress':
        return <ProgressTracker completedLessons={completedLessons} totalLessons={lessons.length} userStats={userStats} />;
      default:
        return <Hero onStartLearning={() => handleViewChange('lessons')} userStats={userStats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} setCurrentView={handleViewChange} />
      {renderContent()}
      <Footer />
    </div>
  );
}

export default App;