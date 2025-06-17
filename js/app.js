// Глобальные переменные
let currentSection = 'home';
let completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
let userStats = JSON.parse(localStorage.getItem('userStats')) || {
    totalTimeSpent: 0,
    streakDays: 3,
    codesWritten: 15
};
let currentLanguage = 'python';
let currentQuizQuestion = 0;
let quizScore = 0;
let quizAnswered = [];

// Данные уроков
const lessons = [
    {
        id: 1,
        title: "Что такое программирование?",
        description: "Узнай, что такое код и как работают компьютеры",
        difficulty: "Легко",
        duration: "10 мин",
        color: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
        topics: ["Основы", "Алгоритмы", "Логика"],
        content: `
            <h4>Урок 1: Что такое программирование?</h4>
            <p>Программирование - это процесс создания инструкций для компьютера.</p>
            <p>Компьютеры понимают только специальный язык - код.</p>
            <div class="alert alert-info">
                <strong>Интересный факт:</strong> Первая программа была написана в 1843 году!
            </div>
            <h5>Основные понятия:</h5>
            <ul>
                <li><strong>Алгоритм</strong> - пошаговая инструкция</li>
                <li><strong>Код</strong> - текст программы</li>
                <li><strong>Программа</strong> - готовое приложение</li>
            </ul>
        `
    },
    {
        id: 2,
        title: "Первые команды",
        description: "Изучи основные команды программирования",
        difficulty: "Легко",
        duration: "15 мин",
        color: "linear-gradient(135deg, #10b981, #059669)",
        topics: ["Python", "Синтаксис", "Переменные"],
        content: `
            <h4>Урок 2: Первые команды Python</h4>
            <p>Python - один из самых простых языков программирования для изучения.</p>
            <h5>Команда print()</h5>
            <p>Команда <code>print()</code> выводит текст на экран:</p>
            <pre><code>print("Привет, мир!")</code></pre>
            <h5>Переменные</h5>
            <p>Переменные хранят данные:</p>
            <pre><code>name = "Анна"
age = 12
print(f"Меня зовут {name}, мне {age} лет")</code></pre>
        `
    },
    {
        id: 3,
        title: "Циклы и условия",
        description: "Научись создавать логические конструкции",
        difficulty: "Средне",
        duration: "20 мин",
        color: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
        topics: ["Циклы", "Условия", "Логика"],
        content: `
            <h4>Урок 3: Циклы и условия</h4>
            <h5>Условия (if)</h5>
            <p>Условия позволяют программе принимать решения:</p>
            <pre><code>age = 12
if age >= 10:
    print("Ты можешь изучать программирование!")
else:
    print("Подрасти еще немного")</code></pre>
            <h5>Циклы (for)</h5>
            <p>Циклы повторяют действия:</p>
            <pre><code>for i in range(5):
    print(f"Число: {i}")</code></pre>
        `
    },
    {
        id: 4,
        title: "Создаем игру",
        description: "Применяем знания для создания простой игры",
        difficulty: "Сложно",
        duration: "30 мин",
        color: "linear-gradient(135deg, #f59e0b, #d97706)",
        topics: ["Проект", "Игры", "Практика"],
        content: `
            <h4>Урок 4: Создаем игру "Угадай число"</h4>
            <p>Давайте создадим простую игру!</p>
            <pre><code>import random

number = random.randint(1, 10)
guess = int(input("Угадай число от 1 до 10: "))

if guess == number:
    print("Поздравляю! Ты угадал!")
else:
    print(f"Не угадал. Было число {number}")</code></pre>
            <div class="alert alert-success">
                <strong>Поздравляем!</strong> Ты создал свою первую игру!
            </div>
        `
    },
    {
        id: 5,
        title: "Работа с данными",
        description: "Изучи списки, словари и структуры данных",
        difficulty: "Средне",
        duration: "25 мин",
        color: "linear-gradient(135deg, #6366f1, #4f46e5)",
        topics: ["Данные", "Списки", "Словари"],
        content: `
            <h4>Урок 5: Работа с данными</h4>
            <h5>Списки</h5>
            <p>Списки хранят несколько значений:</p>
            <pre><code>fruits = ["яблоко", "банан", "апельсин"]
print(fruits[0])  # яблоко
fruits.append("груша")
print(len(fruits))  # 4</code></pre>
            <h5>Словари</h5>
            <p>Словари хранят пары ключ-значение:</p>
            <pre><code>student = {
    "name": "Анна",
    "age": 12,
    "grade": 6
}
print(student["name"])  # Анна</code></pre>
        `
    },
    {
        id: 6,
        title: "Создание веб-страницы",
        description: "Основы HTML и CSS для создания сайтов",
        difficulty: "Средне",
        duration: "35 мин",
        color: "linear-gradient(135deg, #ec4899, #db2777)",
        topics: ["HTML", "CSS", "Веб-разработка"],
        content: `
            <h4>Урок 6: Создание веб-страницы</h4>
            <h5>HTML - структура страницы</h5>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Моя страница&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Привет, мир!&lt;/h1&gt;
    &lt;p&gt;Это моя первая веб-страница!&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            <h5>CSS - стили страницы</h5>
            <pre><code>h1 {
    color: blue;
    text-align: center;
}
p {
    font-size: 18px;
    color: green;
}</code></pre>
        `
    }
];

// Вопросы для викторины
const quizQuestions = [
    {
        question: "Что выведет команда print('Привет, мир!')?",
        options: ["Привет, мир!", "print('Привет, мир!')", "Ошибка", "Ничего"],
        correct: 0,
        explanation: "Команда print() выводит текст на экран без кавычек."
    },
    {
        question: "Как правильно создать переменную с именем 'возраст' и значением 10?",
        options: ["возраст = 10", "10 = возраст", "print(возраст = 10)", "возраст(10)"],
        correct: 0,
        explanation: "Переменная создается так: имя = значение."
    },
    {
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
        question: "Какой результат выражения 5 + 3 * 2?",
        options: ["16", "11", "10", "13"],
        correct: 1,
        explanation: "Сначала выполняется умножение: 3 * 2 = 6, затем сложение: 5 + 6 = 11."
    },
    {
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

// Примеры кода
const codeExamples = {
    hello: {
        python: `# Привет! Это твой первый код на Python
print("Привет, мир!")
print("Меня зовут CodeKids")
print("Я изучаю программирование!")`,
        html: `<!DOCTYPE html>
<html>
<head>
    <title>Привет, мир!</title>
</head>
<body>
    <h1>Привет, мир!</h1>
    <p>Это моя первая веб-страница!</p>
</body>
</html>`
    },
    math: {
        python: `# Математические операции
a = 10
b = 5

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")`,
        html: `<!DOCTYPE html>
<html>
<head>
    <title>Калькулятор</title>
</head>
<body>
    <h1>Простой калькулятор</h1>
    <p>10 + 5 = 15</p>
    <p>10 - 5 = 5</p>
    <p>10 × 5 = 50</p>
    <p>10 ÷ 5 = 2</p>
</body>
</html>`
    },
    loop: {
        python: `# Цикл от 1 до 5
for i in range(1, 6):
    print(f"Число: {i}")
    
print("Цикл завершен!")
print("Отлично!")`,
        html: `<!DOCTYPE html>
<html>
<head>
    <title>Список чисел</title>
</head>
<body>
    <h1>Числа от 1 до 5</h1>
    <ul>
        <li>Число: 1</li>
        <li>Число: 2</li>
        <li>Число: 3</li>
        <li>Число: 4</li>
        <li>Число: 5</li>
    </ul>
    <p>Список завершен!</p>
</body>
</html>`
    },
    html: {
        html: `<!DOCTYPE html>
<html>
<head>
    <title>Моя первая страница</title>
    <style>
        body { 
            font-family: Arial; 
            text-align: center; 
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 50px;
        }
        h1 { 
            color: #fff; 
            font-size: 3em;
            margin-bottom: 20px;
        }
        p {
            font-size: 1.2em;
            margin: 20px 0;
        }
        .container {
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌟 Привет, мир! 🌟</h1>
        <p>Это моя первая веб-страница!</p>
        <p>Я изучаю веб-разработку в CodeKids!</p>
        <button onclick="alert('Привет от JavaScript!')">Нажми меня!</button>
    </div>
</body>
</html>`
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateStats();
    showTelegramToast();
});

// Инициализация приложения
function initializeApp() {
    // Загружаем уроки
    loadLessons();
    
    // Загружаем достижения
    loadAchievements();
    
    // Инициализируем графики
    setTimeout(() => {
        initCharts();
    }, 1000);
    
    // Обновляем статистику
    updateStats();
    
    console.log('CodeKids приложение инициализировано');
}

// Показать секцию
function showSection(sectionName) {
    // Показываем спиннер
    showLoading();
    
    setTimeout(() => {
        // Скрываем все секции
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('d-none');
        });
        
        // Показываем нужную секцию
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.remove('d-none');
        }
        
        // Обновляем активную ссылку в навигации
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        currentSection = sectionName;
        
        // Специальные действия для разных секций
        if (sectionName === 'quiz') {
            initQuiz();
        } else if (sectionName === 'progress') {
            updateProgressSection();
        } else if (sectionName === 'admin') {
            updateAdminSection();
        }
        
        hideLoading();
    }, 300);
}

// Загрузка уроков
function loadLessons() {
    const container = document.getElementById('lessonsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    lessons.forEach(lesson => {
        const isCompleted = completedLessons.includes(lesson.id);
        const card = document.createElement('div');
        card.className = 'col-lg-4 col-md-6 mb-4';
        
        card.innerHTML = `
            <div class="card lesson-card ${isCompleted ? 'completed' : ''}" style="background: ${lesson.color};">
                <div class="card-body text-white">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <span class="badge bg-light text-dark">${lesson.difficulty}</span>
                        ${isCompleted ? '<i class="fas fa-check-circle fa-lg"></i>' : ''}
                    </div>
                    <h5 class="card-title">${lesson.title}</h5>
                    <p class="card-text">${lesson.description}</p>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <small><i class="fas fa-clock me-1"></i>${lesson.duration}</small>
                        <small><i class="fas fa-book me-1"></i>${lesson.topics.length} тем</small>
                    </div>
                    <div class="mb-3">
                        ${lesson.topics.map(topic => `<span class="badge bg-light text-dark me-1">${topic}</span>`).join('')}
                    </div>
                    <button class="btn btn-light w-100" onclick="${isCompleted ? 'viewLesson(' + lesson.id + ')' : 'startLesson(' + lesson.id + ')'}">
                        <i class="fas fa-${isCompleted ? 'eye' : 'play'} me-2"></i>
                        ${isCompleted ? 'Просмотреть урок' : 'Начать урок'}
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Начать урок
function startLesson(lessonId) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    
    // Показываем модальное окно с содержимым урока
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${lesson.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    ${lesson.content}
                    <div class="progress mt-4">
                        <div class="progress-bar" role="progressbar" style="width: 0%" id="lessonProgress"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-primary" onclick="completeLesson(${lessonId})" id="completeBtn" disabled>
                        Завершить урок
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Симуляция прогресса урока
    let progress = 0;
    const progressBar = modal.querySelector('#lessonProgress');
    const completeBtn = modal.querySelector('#completeBtn');
    
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            completeBtn.disabled = false;
            completeBtn.classList.add('pulse');
        }
    }, 800);
    
    // Удаляем модальное окно после закрытия
    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
}

// Просмотреть урок
function viewLesson(lessonId) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-check-circle me-2"></i>${lesson.title} (Завершен)
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    ${lesson.content}
                    <div class="alert alert-success mt-4">
                        <i class="fas fa-trophy me-2"></i>
                        <strong>Поздравляем!</strong> Вы успешно завершили этот урок!
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">
                        <i class="fas fa-check me-2"></i>Понятно
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
}

// Завершить урок
function completeLesson(lessonId) {
    if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        userStats.totalTimeSpent += 15;
        userStats.codesWritten += 1;
        
        // Сохраняем в localStorage
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
        localStorage.setItem('userStats', JSON.stringify(userStats));
        
        // Обновляем интерфейс
        updateStats();
        loadLessons();
        
        // Показываем уведомление
        showNotification('Урок завершен!', 'Поздравляем с успешным завершением урока!', 'success');
        
        // Закрываем модальное окно
        const modal = bootstrap.Modal.getInstance(document.querySelector('.modal.show'));
        if (modal) modal.hide();
    }
}

// Обновление статистики
function updateStats() {
    // Главная страница
    const totalCodesEl = document.getElementById('totalCodes');
    const totalTimeEl = document.getElementById('totalTime');
    const streakDaysEl = document.getElementById('streakDays');
    
    if (totalCodesEl) totalCodesEl.textContent = userStats.codesWritten + '+';
    if (totalTimeEl) totalTimeEl.textContent = userStats.totalTimeSpent + '+';
    if (streakDaysEl) streakDaysEl.textContent = userStats.streakDays;
    
    // Страница уроков
    const completedLessonsEl = document.getElementById('completedLessons');
    const studyTimeEl = document.getElementById('studyTime');
    const currentStreakEl = document.getElementById('currentStreak');
    
    if (completedLessonsEl) completedLessonsEl.textContent = completedLessons.length;
    if (studyTimeEl) studyTimeEl.textContent = userStats.totalTimeSpent;
    if (currentStreakEl) currentStreakEl.textContent = userStats.streakDays;
}

// Редактор кода
function switchLanguage(language) {
    currentLanguage = language;
    
    // Обновляем активную вкладку
    document.querySelectorAll('[id$="Tab"]').forEach(tab => {
        tab.classList.remove('btn-primary', 'btn-warning');
        tab.classList.add('btn-outline-primary', 'btn-outline-warning');
    });
    
    const activeTab = document.getElementById(language + 'Tab');
    if (activeTab) {
        activeTab.classList.remove('btn-outline-primary', 'btn-outline-warning');
        activeTab.classList.add(language === 'python' ? 'btn-primary' : 'btn-warning');
    }
    
    // Загружаем пример кода для выбранного языка
    loadExample('hello');
}

function loadExample(exampleName) {
    const example = codeExamples[exampleName];
    if (!example) return;
    
    const codeEditor = document.getElementById('codeEditor');
    if (codeEditor) {
        codeEditor.value = example[currentLanguage] || example.python || example.html;
    }
    
    // Очищаем вывод
    const output = document.getElementById('output');
    if (output) {
        output.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-play fa-2x opacity-50 mb-3"></i>
                <div>Нажми "Запустить" чтобы увидеть результат твоего кода!</div>
            </div>
        `;
    }
}

function runCode() {
    const codeEditor = document.getElementById('codeEditor');
    const output = document.getElementById('output');
    const runButton = document.getElementById('runButton');
    
    if (!codeEditor || !output || !runButton) return;
    
    const code = codeEditor.value;
    
    // Показываем индикатор загрузки
    runButton.innerHTML = '<div class="spinner-border spinner-border-sm me-2"></div>Выполняется...';
    runButton.disabled = true;
    
    setTimeout(() => {
        try {
            let result = '';
            
            if (currentLanguage === 'html') {
                result = 'HTML код готов! Откройте в браузере чтобы увидеть результат.';
                
                // Создаем превью HTML
                const htmlPreview = document.createElement('div');
                htmlPreview.innerHTML = `
                    <div class="mt-3">
                        <h6>Превью:</h6>
                        <iframe srcdoc="${code.replace(/"/g, '&quot;')}" 
                                style="width: 100%; height: 200px; border: 1px solid #ccc; border-radius: 5px;">
                        </iframe>
                    </div>
                `;
                output.innerHTML = result;
                output.appendChild(htmlPreview);
            } else {
                // Простая симуляция Python-кода
                const lines = code.split('\n');
                
                for (const line of lines) {
                    if (line.trim().startsWith('print(')) {
                        const match = line.match(/print\((.*)\)/);
                        if (match) {
                            let content = match[1];
                            
                            // Обработка f-строк
                            if (content.includes('f"') || content.includes("f'")) {
                                content = content.replace(/f["'](.*)["']/, '$1');
                                content = content.replace(/\{(\w+)\}/g, (_, varName) => {
                                    // Простая замена переменных
                                    const varMap = {
                                        'name': 'юный программист',
                                        'a': '10', 'b': '5',
                                        'a + b': '15', 'a - b': '5',
                                        'a * b': '50', 'a / b': '2'
                                    };
                                    return varMap[varName] || varName;
                                });
                            } else {
                                // Убираем кавычки
                                content = content.replace(/^["']|["']$/g, '');
                            }
                            
                            result += content + '\n';
                        }
                    }
                }
                
                // Обработка циклов
                if (code.includes('for i in range(')) {
                    const rangeMatch = code.match(/range\((\d+)(?:,\s*(\d+))?\)/);
                    if (rangeMatch) {
                        const start = rangeMatch[2] ? parseInt(rangeMatch[2]) : parseInt(rangeMatch[1]);
                        const end = rangeMatch[2] ? parseInt(rangeMatch[1]) : 0;
                        
                        for (let i = (rangeMatch[2] ? end : 0); i < start; i++) {
                            if (code.includes('print(f"Число: {i}")')) {
                                result += `Число: ${i}\n`;
                            }
                        }
                    }
                }
                
                if (!result.trim()) {
                    result = 'Код выполнен успешно! 🎉\nДобавь команду print() чтобы увидеть результат.';
                }
                
                output.innerHTML = `<pre>${result}</pre>`;
            }
            
            // Обновляем статистику
            userStats.codesWritten++;
            localStorage.setItem('userStats', JSON.stringify(userStats));
            updateStats();
            
        } catch (error) {
            output.innerHTML = '<span class="text-danger">Ошибка в коде. Проверь синтаксис! 🐛</span>';
        }
        
        // Восстанавливаем кнопку
        runButton.innerHTML = '<i class="fas fa-play"></i> Запустить';
        runButton.disabled = false;
    }, 1000);
}

function resetCode() {
    loadExample('hello');
}

function saveCode() {
    const codeEditor = document.getElementById('codeEditor');
    if (!codeEditor) return;
    
    const code = codeEditor.value;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-code.${currentLanguage === 'html' ? 'html' : 'py'}`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Код сохранен!', 'Файл успешно загружен на ваш компьютер.', 'success');
}

// Викторина
function initQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    quizAnswered = new Array(quizQuestions.length).fill(false);
    showQuizQuestion();
}

function showQuizQuestion() {
    const container = document.getElementById('quizContainer');
    if (!container) return;
    
    const question = quizQuestions[currentQuizQuestion];
    
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <div class="progress mb-3">
                    <div class="progress-bar" style="width: ${((currentQuizQuestion + 1) / quizQuestions.length) * 100}%"></div>
                </div>
                <div class="d-flex justify-content-between">
                    <span>Вопрос ${currentQuizQuestion + 1} из ${quizQuestions.length}</span>
                    <span class="text-primary">Очки: ${quizScore}/${quizQuestions.length}</span>
                </div>
            </div>
            <div class="card-body">
                <h4 class="mb-4">${question.question}</h4>
                <div class="d-grid gap-3" id="quizOptions">
                    ${question.options.map((option, index) => `
                        <button class="btn btn-outline-primary text-start quiz-option" onclick="selectAnswer(${index})">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <div id="quizExplanation" class="mt-4 d-none">
                    <div class="alert alert-info">
                        <strong>Объяснение:</strong> ${question.explanation}
                    </div>
                    <button class="btn btn-primary w-100" onclick="nextQuestion()">
                        ${currentQuizQuestion < quizQuestions.length - 1 ? 'Следующий вопрос' : 'Завершить викторину'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function selectAnswer(answerIndex) {
    const question = quizQuestions[currentQuizQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const explanation = document.getElementById('quizExplanation');
    
    // Отключаем все кнопки
    options.forEach(option => option.disabled = true);
    
    // Показываем правильный/неправильный ответ
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.remove('btn-outline-primary');
            option.classList.add('btn-success');
            option.innerHTML = '<i class="fas fa-check me-2"></i>' + option.textContent;
        } else if (index === answerIndex && index !== question.correct) {
            option.classList.remove('btn-outline-primary');
            option.classList.add('btn-danger');
            option.innerHTML = '<i class="fas fa-times me-2"></i>' + option.textContent;
        }
    });
    
    // Обновляем счет
    if (answerIndex === question.correct) {
        quizScore++;
    }
    
    quizAnswered[currentQuizQuestion] = true;
    
    // Показываем объяснение
    explanation.classList.remove('d-none');
}

function nextQuestion() {
    if (currentQuizQuestion < quizQuestions.length - 1) {
        currentQuizQuestion++;
        showQuizQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    const container = document.getElementById('quizContainer');
    if (!container) return;
    
    const percentage = (quizScore / quizQuestions.length) * 100;
    let message, messageClass;
    
    if (percentage >= 80) {
        message = "Отлично! Ты настоящий программист! 🏆";
        messageClass = "text-success";
    } else if (percentage >= 60) {
        message = "Хорошо! Продолжай изучать! 📚";
        messageClass = "text-primary";
    } else {
        message = "Неплохо! Повтори материал и попробуй еще раз! 💪";
        messageClass = "text-warning";
    }
    
    container.innerHTML = `
        <div class="card">
            <div class="card-body text-center">
                <i class="fas fa-trophy fa-4x text-warning mb-4"></i>
                <h2 class="mb-4">Викторина завершена!</h2>
                <div class="mb-4">
                    <h1 class="display-4 text-primary">${quizScore}/${quizQuestions.length}</h1>
                    <p class="lead ${messageClass}">${message}</p>
                </div>
                <div class="row justify-content-center mb-4">
                    <div class="col-auto">
                        <h6>Твои результаты:</h6>
                        <div class="d-flex gap-2">
                            ${quizAnswered.map((answered, index) => `
                                <div class="badge ${answered ? 'bg-success' : 'bg-secondary'} rounded-circle" style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">
                                    ${index + 1}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="initQuiz()">
                    <i class="fas fa-redo me-2"></i>Пройти еще раз
                </button>
            </div>
        </div>
    `;
    
    // Если результат хороший, засчитываем как завершенный урок
    if (percentage >= 60) {
        userStats.totalTimeSpent += 10;
        localStorage.setItem('userStats', JSON.stringify(userStats));
        updateStats();
    }
}

// Прогресс
function updateProgressSection() {
    const completionPercentage = Math.round((completedLessons.length / lessons.length) * 100);
    
    // Обновляем статистику
    const progressLessons = document.getElementById('progressLessons');
    const progressTime = document.getElementById('progressTime');
    const progressStreak = document.getElementById('progressStreak');
    const progressCodes = document.getElementById('progressCodes');
    const overallProgress = document.getElementById('overallProgress');
    const progressPercentage = document.getElementById('progressPercentage');
    
    if (progressLessons) progressLessons.textContent = `${completedLessons.length}/${lessons.length}`;
    if (progressTime) progressTime.textContent = `${userStats.totalTimeSpent} мин`;
    if (progressStreak) progressStreak.textContent = userStats.streakDays;
    if (progressCodes) progressCodes.textContent = userStats.codesWritten;
    if (overallProgress) overallProgress.style.width = completionPercentage + '%';
    if (progressPercentage) progressPercentage.textContent = completionPercentage + '%';
}

// Достижения
function loadAchievements() {
    const achievements = [
        {
            title: "Первые шаги",
            description: "Завершил первый урок",
            icon: "fas fa-star",
            unlocked: completedLessons.length >= 1,
            color: "warning"
        },
        {
            title: "Ученик",
            description: "Завершил 2 урока",
            icon: "fas fa-book",
            unlocked: completedLessons.length >= 2,
            color: "primary"
        },
        {
            title: "Программист",
            description: "Завершил 3 урока",
            icon: "fas fa-code",
            unlocked: completedLessons.length >= 3,
            color: "info"
        },
        {
            title: "Мастер кода",
            description: "Завершил все уроки",
            icon: "fas fa-trophy",
            unlocked: completedLessons.length >= lessons.length,
            color: "success"
        },
        {
            title: "Марафонец",
            description: "3 дня подряд обучения",
            icon: "fas fa-calendar",
            unlocked: userStats.streakDays >= 3,
            color: "danger"
        },
        {
            title: "Кодер",
            description: "Написал 10+ программ",
            icon: "fas fa-bolt",
            unlocked: userStats.codesWritten >= 10,
            color: "dark"
        }
    ];
    
    const container = document.getElementById('achievementsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    achievements.forEach(achievement => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-3';
        
        col.innerHTML = `
            <div class="card achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'} h-100">
                <div class="card-body text-center">
                    <div class="mb-3">
                        <i class="${achievement.icon} fa-2x ${achievement.unlocked ? 'text-' + achievement.color : 'text-muted'}"></i>
                    </div>
                    <h6 class="card-title">${achievement.title}</h6>
                    <p class="card-text small">${achievement.description}</p>
                    ${achievement.unlocked ? 
                        '<span class="badge bg-success">✓ Получено</span>' : 
                        '<span class="badge bg-secondary">Заблокировано</span>'
                    }
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

// Админ панель
function updateAdminSection() {
    // Здесь можно добавить логику для обновления админ панели
    console.log('Админ панель обновлена');
}

function addCourse() {
    const name = document.getElementById('courseName').value;
    const description = document.getElementById('courseDescription').value;
    const difficulty = document.getElementById('courseDifficulty').value;
    
    if (!name || !description) {
        showNotification('Ошибка', 'Заполните все поля', 'danger');
        return;
    }
    
    // Здесь можно добавить логику сохранения курса
    showNotification('Курс добавлен!', `Курс "${name}" успешно добавлен`, 'success');
    
    // Очищаем форму
    document.getElementById('courseName').value = '';
    document.getElementById('courseDescription').value = '';
    document.getElementById('courseDifficulty').value = 'Легко';
}

// Графики
function initCharts() {
    // График пользователей
    const userCtx = document.getElementById('userChart');
    if (userCtx) {
        new Chart(userCtx, {
            type: 'line',
            data: {
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
                datasets: [{
                    label: 'Активные пользователи',
                    data: [120, 150, 180, 200, 230, 247],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // График аналитики
    const analyticsCtx = document.getElementById('analyticsChart');
    if (analyticsCtx) {
        new Chart(analyticsCtx, {
            type: 'bar',
            data: {
                labels: ['Python', 'HTML/CSS', 'JavaScript', 'Scratch', 'Робототехника'],
                datasets: [{
                    label: 'Популярность курсов',
                    data: [85, 70, 60, 45, 55],
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6',
                        '#ef4444'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
}

// Telegram интеграция
function showTelegramToast() {
    setTimeout(() => {
        const toast = new bootstrap.Toast(document.getElementById('telegramToast'));
        toast.show();
    }, 3000);
}

function connectTelegram() {
    // Симуляция подключения к Telegram боту
    showNotification('Telegram подключен!', 'Теперь вы будете получать уведомления в Telegram', 'success');
    
    // Скрываем toast
    const toast = bootstrap.Toast.getInstance(document.getElementById('telegramToast'));
    if (toast) toast.hide();
    
    // Здесь можно добавить реальную логику подключения к Telegram API
    console.log('Подключение к Telegram боту...');
}

// Утилиты
function showLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.remove('d-none');
    }
}

function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.add('d-none');
    }
}

function showNotification(title, message, type = 'info') {
    // Создаем toast уведомление
    const toastContainer = document.createElement('div');
    toastContainer.className = 'position-fixed top-0 end-0 p-3';
    toastContainer.style.zIndex = '1060';
    
    const toastId = 'toast-' + Date.now();
    toastContainer.innerHTML = `
        <div id="${toastId}" class="toast" role="alert">
            <div class="toast-header">
                <i class="fas fa-${type === 'success' ? 'check-circle text-success' : type === 'danger' ? 'exclamation-circle text-danger' : 'info-circle text-primary'} me-2"></i>
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    document.body.appendChild(toastContainer);
    
    const toast = new bootstrap.Toast(document.getElementById(toastId));
    toast.show();
    
    // Удаляем элемент после скрытия
    document.getElementById(toastId).addEventListener('hidden.bs.toast', () => {
        document.body.removeChild(toastContainer);
    });
}

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Ошибка приложения:', e.error);
    showNotification('Ошибка', 'Произошла ошибка в приложении', 'danger');
});

// Сохранение данных при закрытии страницы
window.addEventListener('beforeunload', function() {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
    localStorage.setItem('userStats', JSON.stringify(userStats));
});