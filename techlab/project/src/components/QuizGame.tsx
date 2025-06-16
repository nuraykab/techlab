import React, { useState } from 'react';
import { CheckCircle, XCircle, Trophy, RefreshCw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizGameProps {
  onComplete: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ onComplete }) => {
  const questions: Question[] = [
    {
      id: 1,
      question: "Что выведет команда print('Привет, мир!')?",
      options: ["Привет, мир!", "print('Привет, мир!')", "Ошибка", "Ничего"],
      correct: 0,
      explanation: "Команда print() выводит текст на экран без кавычек."
    },
    {
      id: 2,
      question: "Как правильно создать переменную с именем 'возраст' и значением 10?",
      options: ["возраст = 10", "10 = возраст", "print(возраст = 10)", "возраст(10)"],
      correct: 0,
      explanation: "Переменная создается так: имя = значение."
    },
    {
      id: 3,
      question: "Что такое цикл в программировании?",
      options: [
        "Ошибка в коде",
        "Повторение одних и тех же действий",
        "Способ вывода текста",
        "Математическая операция"
      ],
      correct: 1,
      explanation: "Цикл позволяет повторять код несколько раз."
    },
    {
      id: 4,
      question: "Какой результат выражения 5 + 3 * 2?",
      options: ["16", "11", "10", "13"],
      correct: 1,
      explanation: "Сначала выполняется умножение: 3 * 2 = 6, затем сложение: 5 + 6 = 11."
    },
    {
      id: 5,
      question: "Что означает 'отладка' в программировании?",
      options: [
        "Написание кода",
        "Поиск и исправление ошибок",
        "Запуск программы",
        "Сохранение файла"
      ],
      correct: 1,
      explanation: "Отладка - это процесс поиска и исправления ошибок в коде."
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsQuizComplete(true);
      if (score >= 3) {
        onComplete();
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(questions.length).fill(false));
    setIsQuizComplete(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return { message: "Отлично! Ты настоящий программист! 🏆", color: "text-green-600" };
    if (percentage >= 60) return { message: "Хорошо! Продолжай изучать! 📚", color: "text-blue-600" };
    return { message: "Неплохо! Повтори материал и попробуй еще раз! 💪", color: "text-orange-600" };
  };

  if (isQuizComplete) {
    const scoreMessage = getScoreMessage();
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Викторина завершена!</h2>
            
            <div className="mb-6">
              <div className="text-6xl font-bold text-purple-600 mb-2">
                {score}/{questions.length}
              </div>
              <p className={`text-lg ${scoreMessage.color} font-semibold`}>
                {scoreMessage.message}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Твои результаты:</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                      answeredQuestions[index] ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={resetQuiz}
              className="flex items-center space-x-2 mx-auto bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Пройти еще раз</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Прогресс-бар */}
          <div className="bg-purple-600 h-2">
            <div
              className="bg-purple-300 h-2 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-gray-500">
                Вопрос {currentQuestion + 1} из {questions.length}
              </span>
              <span className="text-sm font-medium text-purple-600">
                Очки: {score}/{questions.length}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              {question.question}
            </h2>

            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === null
                      ? 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                      : selectedAnswer === index
                      ? index === question.correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : index === question.correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showResult && (
                      <span>
                        {index === question.correct ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : selectedAnswer === index ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : null}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800">
                  <strong>Объяснение:</strong> {question.explanation}
                </p>
              </div>
            )}

            {showResult && (
              <button
                onClick={nextQuestion}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                {currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Завершить викторину'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};