import React from 'react';
import { Code, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold">CodeKids</span>
          </div>
          
          <p className="text-gray-300 mb-4">
            Интерактивная платформа для обучения детей программированию
          </p>
          
          <div className="flex items-center justify-center space-x-1 text-sm text-gray-400">
            <span>Создано с</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>в ТОО Techlab Digital Solutions</span>
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            © 2025 CodeKids. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
};