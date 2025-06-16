import React from 'react';
import { Trophy, Target, Star, Award, BookOpen, Code, Calendar, Clock, Zap } from 'lucide-react';

interface ProgressTrackerProps {
  completedLessons: number[];
  totalLessons: number;
  userStats: {
    totalTimeSpent: number;
    streakDays: number;
    codesWritten: number;
  };
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  completedLessons, 
  totalLessons, 
  userStats 
}) => {
  const completionPercentage = Math.round((completedLessons.length / totalLessons) * 100);
  
  const achievements = [
    {
      id: 1,
      title: "Первые шаги",
      description: "Завершил первый урок",
      icon: Star,
      unlocked: completedLessons.length >= 1,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 border-yellow-200"
    },
    {
      id: 2,
      title: "Ученик",
      description: "Завершил 2 урока",
      icon: BookOpen,
      unlocked: completedLessons.length >= 2,
      color: "text-blue-500",
      bgColor: "bg-blue-50 border-blue-200"
    },
    {
      id: 3,
      title: "Программист",
      description: "Завершил 3 урока",
      icon: Code,
      unlocked: completedLessons.length >= 3,
      color: "text-purple-500",
      bgColor: "bg-purple-50 border-purple-200"
    },
    {
      id: 4,
      title: "Мастер кода",
      description: "Завершил все уроки",
      icon: Trophy,
      unlocked: completedLessons.length >= totalLessons,
      color: "text-green-500",
      bgColor: "bg-green-50 border-green-200"
    },
    {
      id: 5,
      title: "Марафонец",
      description: "3 дня подряд обучения",
      icon: Calendar,
      unlocked: userStats.streakDays >= 3,
      color: "text-orange-500",
      bgColor: "bg-orange-50 border-orange-200"
    },
    {
      id: 6,
      title: "Кодер",
      description: "Написал 10+ программ",
      icon: Zap,
      unlocked: userStats.codesWritten >= 10,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 border-indigo-200"
    }
  ];

  const stats = [
    {
      label: "Уроков завершено",
      value: completedLessons.length,
      total: totalLessons,
      icon: Target,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      textColor: "text-blue-600"
    },
    {
      label: "Время обучения",
      value: `${userStats.totalTimeSpent} мин`,
      icon: Clock,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      textColor: "text-green-600"
    },
    {
      label: "Дней подряд",
      value: userStats.streakDays,
      icon: Calendar,
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      textColor: "text-orange-600"
    },
    {
      label: "Программ написано",
      value: userStats.codesWritten,
      icon: Code,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      textColor: "text-purple-600"
    }
  ];

  const getMotivationalMessage = () => {
    if (completionPercentage === 100) {
      return {
        title: "🎉 Невероятно!",
        message: "Ты завершил все уроки! Теперь ты настоящий программист! Готов к новым вызовам?",
        bgColor: "from-green-400 via-blue-500 to-purple-600"
      };
    } else if (completionPercentage >= 75) {
      return {
        title: "🔥 Почти у цели!",
        message: "Осталось совсем немного! Ты делаешь потрясающие успехи!",
        bgColor: "from-orange-400 via-red-500 to-pink-600"
      };
    } else if (completionPercentage >= 50) {
      return {
        title: "💪 Отличная работа!",
        message: "Ты уже больше половины пути! Продолжай в том же духе!",
        bgColor: "from-purple-400 via-pink-500 to-red-500"
      };
    } else if (completionPercentage >= 25) {
      return {
        title: "🚀 Набираем обороты!",
        message: "Отличное начало! Каждый урок делает тебя сильнее!",
        bgColor: "from-blue-400 via-purple-500 to-pink-500"
      };
    } else {
      return {
        title: "🌟 Добро пожаловать!",
        message: "Впереди много интересного! Начни свое путешествие в мир программирования!",
        bgColor: "from-indigo-400 via-blue-500 to-purple-500"
      };
    }
  };

  const motivationalMessage = getMotivationalMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Твой прогресс</h2>
            <p className="text-xl text-gray-600">Отслеживай свои достижения и празднуй успехи!</p>
          </div>

          {/* Основная статистика */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center">
                    <div className={`${stat.color} p-4 rounded-xl mr-4 shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.textColor}`}>
                        {stat.value}
                        {stat.total && <span className="text-gray-400">/{stat.total}</span>}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Прогресс-бар */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Общий прогресс обучения</h3>
            <div className="relative">
              <div className="bg-gray-200 rounded-full h-6 shadow-inner">
                <div
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full h-6 transition-all duration-1000 shadow-lg relative overflow-hidden"
                  style={{ width: `${completionPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {completionPercentage}%
                </span>
                <p className="text-gray-600 mt-1">завершено</p>
              </div>
            </div>
          </div>

          {/* Достижения */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 text-center">🏆 Твои достижения</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      achievement.unlocked
                        ? `${achievement.bgColor} shadow-lg hover:shadow-xl`
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`inline-flex p-4 rounded-2xl mb-4 ${
                        achievement.unlocked 
                          ? 'bg-white shadow-lg transform hover:scale-110 transition-transform' 
                          : 'bg-gray-200'
                      }`}>
                        <Icon className={`h-8 w-8 ${
                          achievement.unlocked ? achievement.color : 'text-gray-400'
                        }`} />
                      </div>
                      <h4 className={`font-bold text-lg mb-2 ${
                        achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm mb-4 ${
                        achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                      {achievement.unlocked && (
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                          ✓ Получено
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Мотивационное сообщение */}
          <div className={`bg-gradient-to-r ${motivationalMessage.bgColor} text-white rounded-2xl p-8 text-center shadow-2xl`}>
            <h3 className="text-3xl font-bold mb-4">{motivationalMessage.title}</h3>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto">{motivationalMessage.message}</p>
            {completionPercentage < 100 && (
              <div className="mt-6">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 border border-white/30">
                  Продолжить обучение →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};