import React from 'react';
import { Code, Home, BookOpen, Play, BarChart3 } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: 'home' | 'lessons' | 'code' | 'quiz' | 'progress') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'home', label: 'Главная', icon: Home },
    { id: 'lessons', label: 'Уроки', icon: BookOpen },
    { id: 'code', label: 'Редактор кода', icon: Code },
    { id: 'quiz', label: 'Викторина', icon: Play },
    { id: 'progress', label: 'Прогресс', icon: BarChart3 },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-800">CodeKids</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as any)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="md:hidden">
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};