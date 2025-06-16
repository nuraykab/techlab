import React from 'react';
import { ArrowRight, Play, Users, Award, Code2 } from 'lucide-react';

interface HeroProps {
  onStartLearning: () => void;
  userStats: {
    totalTimeSpent: number;
    streakDays: number;
    codesWritten: number;
  };
}

export const Hero: React.FC<HeroProps> = ({ onStartLearning, userStats }) => {
  const features = [
    {
      icon: Play,
      title: "Интерактивное обучение",
      description: "Учись программировать через игры, задания и практические проекты",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Code2,
      title: "Реальный код",
      description: "Пиши настоящий код в безопасной и дружелюбной среде",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Award,
      title: "Система достижений",
      description: "Получай награды и отслеживай свой прогресс в обучении",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Сообщество",
      description: "Учись вместе с другими детьми и делись своими проектами",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center text-white mb-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              CodeKids 🚀
            </h1>
            <p className="text-2xl md:text-3xl mb-6 text-gray-200">
              Изучай программирование весело и легко!
            </p>
            <p className="text-lg mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Интерактивная платформа для обучения детей основам программирования 
              через игры, задания и практические проекты. Начни свое путешествие в мир кода уже сегодня!
            </p>
            
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-blue-400 mb-2">{userStats.codesWritten}+</div>
                <div className="text-gray-300">Программ написано</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-green-400 mb-2">{userStats.totalTimeSpent}+</div>
                <div className="text-gray-300">Минут обучения</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-purple-400 mb-2">{userStats.streakDays}</div>
                <div className="text-gray-300">Дней подряд</div>
              </div>
            </div>

            <button
              onClick={onStartLearning}
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-5 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-3 mx-auto"
            >
              <span>Начать обучение!</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Готов стать программистом? 👨‍💻
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Присоединяйся к тысячам детей, которые уже изучают программирование с CodeKids
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onStartLearning}
                className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-lg"
              >
                Начать бесплатно 🎯
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Узнать больше
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};