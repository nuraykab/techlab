import React, { useState } from 'react';
import { Play, RotateCcw, Lightbulb, Save, Share, Download } from 'lucide-react';

export const CodeEditor: React.FC = () => {
  const [code, setCode] = useState(`# Привет! Это твой первый код на Python
# Попробуй изменить текст и нажми "Запустить"

name = "юный программист"
print(f"Привет, {name}!")
print("Добро пожаловать в мир программирования!")

# Задание: добавь еще одну строку с print`);

  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('python');

  const examples = [
    {
      title: "Привет, мир!",
      code: `print("Привет, мир!")
print("Меня зовут CodeKids")
print("Я изучаю программирование!")`,
      language: "python"
    },
    {
      title: "Простая математика",
      code: `# Математические операции
a = 10
b = 5

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")`,
      language: "python"
    },
    {
      title: "Цикл с числами",
      code: `# Цикл от 1 до 5
for i in range(1, 6):
    print(f"Число: {i}")
    
print("Цикл завершен!")
print("Отлично!")`,
      language: "python"
    },
    {
      title: "Веб-страница",
      code: `<!DOCTYPE html>
<html>
<head>
    <title>Моя первая страница</title>
    <style>
        body { font-family: Arial; text-align: center; }
        h1 { color: purple; }
    </style>
</head>
<body>
    <h1>Привет, мир!</h1>
    <p>Это моя первая веб-страница!</p>
</body>
</html>`,
      language: "html"
    }
  ];

  const runCode = () => {
    setIsRunning(true);
    
    setTimeout(() => {
      try {
        if (activeTab === 'html') {
          setOutput('HTML код готов! Откройте в браузере чтобы увидеть результат.');
        } else {
          // Простая симуляция Python-кода
          let result = '';
          const lines = code.split('\n');
          
          for (const line of lines) {
            if (line.trim().startsWith('print(')) {
              const match = line.match(/print\((.*)\)/);
              if (match) {
                let content = match[1];
                content = content.replace(/^["']|["']$/g, '');
                if (content.includes('f"') || content.includes("f'")) {
                  content = content.replace(/f["'](.*)["']/, '$1');
                  content = content.replace(/\{(\w+)\}/g, (_, varName) => {
                    if (varName === 'name') return 'юный программист';
                    if (varName === 'a') return '10';
                    if (varName === 'b') return '5';
                    if (varName === 'a + b') return '15';
                    if (varName === 'a - b') return '5';
                    if (varName === 'a * b') return '50';
                    if (varName === 'a / b') return '2';
                    if (varName === 'i') return '1';
                    return varName;
                  });
                }
                result += content + '\n';
              }
            }
          }
          
          if (!result) {
            result = 'Код выполнен успешно! 🎉\nДобавь команду print() чтобы увидеть результат.';
          }
          
          setOutput(result);
        }
      } catch (error) {
        setOutput('Ошибка в коде. Проверь синтаксис! 🐛');
      }
      setIsRunning(false);
    }, 1000);
  };

  const resetCode = () => {
    const defaultExample = examples.find(ex => ex.language === activeTab) || examples[0];
    setCode(defaultExample.code);
    setOutput('');
  };

  const loadExample = (example: typeof examples[0]) => {
    setCode(example.code);
    setOutput('');
    setActiveTab(example.language);
  };

  const saveCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-code.${activeTab === 'html' ? 'html' : 'py'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Редактор кода</h2>
            <p className="text-xl text-gray-600">Пиши код, экспериментируй и создавай удивительные проекты!</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Примеры кода */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold mb-6 flex items-center text-gray-800">
                  <Lightbulb className="h-6 w-6 mr-3 text-yellow-500" />
                  Примеры кода
                </h3>
                <div className="space-y-4">
                  {examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => loadExample(example)}
                      className="w-full p-4 text-left bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all duration-300 border border-blue-100 hover:border-blue-200 hover:scale-105 hover:shadow-md group"
                    >
                      <div className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {example.title}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {example.language.toUpperCase()} • Нажми для загрузки
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Редактор и вывод */}
            <div className="lg:col-span-3 space-y-8">
              {/* Табы */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('python')}
                    className={`px-6 py-4 font-semibold transition-colors ${
                      activeTab === 'python'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    🐍 Python
                  </button>
                  <button
                    onClick={() => setActiveTab('html')}
                    className={`px-6 py-4 font-semibold transition-colors ${
                      activeTab === 'html'
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                    }`}
                  >
                    🌐 HTML
                  </button>
                </div>

                {/* Редактор кода */}
                <div className="bg-gray-900 text-white">
                  <div className="px-6 py-4 flex items-center justify-between border-b border-gray-700">
                    <span className="font-mono text-sm text-gray-300">
                      main.{activeTab === 'html' ? 'html' : 'py'}
                    </span>
                    <div className="flex space-x-3">
                      <button
                        onClick={saveCode}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600 transition-colors"
                      >
                        <Save className="h-4 w-4" />
                        <span>Сохранить</span>
                      </button>
                      <button
                        onClick={resetCode}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600 transition-colors"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span>Сброс</span>
                      </button>
                      <button
                        onClick={runCode}
                        disabled={isRunning}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 rounded-lg text-sm hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isRunning ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                        <span>{isRunning ? 'Выполняется...' : 'Запустить'}</span>
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-96 p-6 font-mono text-sm border-none resize-none focus:outline-none bg-gray-900 text-white placeholder-gray-400"
                    placeholder="Напиши свой код здесь..."
                    spellCheck={false}
                  />
                </div>
              </div>

              {/* Вывод результата */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
                  <span className="font-mono text-sm">Результат выполнения</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">Готов к работе</span>
                  </div>
                </div>
                <div className="p-6 bg-gray-900 text-green-400 font-mono text-sm min-h-40">
                  {output ? (
                    <pre className="whitespace-pre-wrap">{output}</pre>
                  ) : (
                    <div className="text-gray-500 flex items-center justify-center h-32">
                      <div className="text-center">
                        <Play className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <div>Нажми "Запустить" чтобы увидеть результат твоего кода!</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Подсказки */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">💡 Подсказки для юных программистов</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-700 mb-3">Python команды:</h4>
                <ul className="space-y-2 text-blue-600">
                  <li>• <code className="bg-blue-100 px-2 py-1 rounded font-mono">print("текст")</code> - вывести текст</li>
                  <li>• <code className="bg-blue-100 px-2 py-1 rounded font-mono">name = "Вася"</code> - создать переменную</li>
                  <li>• <code className="bg-blue-100 px-2 py-1 rounded font-mono">for i in range(5):</code> - цикл</li>
                  <li>• <code className="bg-blue-100 px-2 py-1 rounded font-mono">if x > 5:</code> - условие</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-3">HTML теги:</h4>
                <ul className="space-y-2 text-blue-600">
                  <li>• <code className="bg-blue-100 px-2 py-1 rounded font-mono">&lt;h1&gt;Заголовок&lt;/h1&gt;</code> - большой заголовок</li>
                  <li>• <code className="bg-blue-100 px-2 py-1 rounded font-mono">&lt;p&gt;Текст&lt;/p&gt;</code> - абзац</li>
                  <li>• <code className="bg-blue-100 px-2 py-1 rounded font-mono">&lt;button&gt;Кнопка&lt;/button&gt;</code> - кнопка</li>
                  <li>• <code className="bg-blue-100 px-2 py-1 rounded font-mono">&lt;img src="фото.jpg"&gt;</code> - картинка</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};