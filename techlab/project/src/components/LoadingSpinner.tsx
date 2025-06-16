import React from 'react';
import { Code } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
          <Code className="h-8 w-8 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Загружаем...</h3>
        <p className="text-gray-500">Подготавливаем для тебя лучший опыт обучения</p>
      </div>
    </div>
  );
};