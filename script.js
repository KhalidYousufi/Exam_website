// Quiz Questions
const questions = [
    {
        question: "پایتخت ایران کدام شهر است؟",
        options: ["اصفهان", "تهران", "شیراز", "مشهد"],
        correct: 1
    },
    {
        question: "کدام یک از موارد زیر یک زبان برنامه‌نویسی است؟",
        options: ["HTML", "Python", "CSS", "JSON"],
        correct: 1
    },
    {
        question: "فرمول آب شیمیایی چیست؟",
        options: ["CO2", "H2O", "O2", "NaCl"],
        correct: 1
    },
    {
        question: "کدام سیاره بزرگ‌ترین سیاره منظومه شمسی است؟",
        options: ["زمین", "مریخ", "مشتری", "زحل"],
        correct: 2
    },
    {
        question: "عدد π (پی) تقریباً برابر با چند است؟",
        options: ["3.14", "2.71", "1.41", "4.13"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

// Start Quiz
function startQuiz() {
    document.getElementById('welcome-page').classList.add('hidden');
    document.getElementById('quiz-page').classList.remove('hidden');
    document.getElementById('total-questions').textContent = questions.length;
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    
    // Update progress bar
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    document.getElementById('progress-percent').textContent = Math.round(progress);
    
    // Clear previous options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    // Create options
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option-item';
        optionDiv.innerHTML = `
            <label class="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300">
                <input type="radio" name="option" value="${index}" class="w-5 h-5 text-blue-600 focus:ring-blue-500" onchange="selectOption(${index})">
                <span class="mr-4 text-gray-700 font-medium">${option}</span>
            </label>
        `;
        optionsContainer.appendChild(optionDiv);
    });
    
    // Reset selected option
    selectedOption = null;
    document.getElementById('error-message').classList.add('hidden');
    
    // Update button text
    const nextBtn = document.getElementById('next-btn');
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = 'پایان آزمون';
    } else {
        nextBtn.textContent = 'بعدی';
    }
}

// Select Option
function selectOption(index) {
    selectedOption = index;
    document.getElementById('error-message').classList.add('hidden');
    
    // Update visual selection
    const options = document.querySelectorAll('.option-item label');
    options.forEach((option, i) => {
        if (i === index) {
            option.classList.add('border-blue-500', 'bg-blue-50');
            option.classList.remove('border-gray-200');
        } else {
            option.classList.remove('border-blue-500', 'bg-blue-50');
            option.classList.add('border-gray-200');
        }
    });
}

// Next Question
function nextQuestion() {
    if (selectedOption === null) {
        document.getElementById('error-message').classList.remove('hidden');
        return;
    }
    
    // Check answer
    if (selectedOption === questions[currentQuestionIndex].correct) {
        score++;
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// Show Result
function showResult() {
    document.getElementById('quiz-page').classList.add('hidden');
    document.getElementById('result-page').classList.remove('hidden');
    
    const percentage = (score / questions.length) * 100;
    document.getElementById('score-display').textContent = score + ' / ' + questions.length;
    document.getElementById('score-detail').textContent = percentage + '% صحیح';
    
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    
    if (percentage >= 80) {
        resultIcon.className = 'w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6';
        resultIcon.innerHTML = `
            <svg class="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        `;
        resultTitle.textContent = 'آفرین! عالی بود';
        resultTitle.className = 'text-3xl font-bold mb-4 text-green-600';
        resultMessage.textContent = 'شما با موفقیت آزمون را گذراندید. عملکرد بسیار خوبی داشتید!';
    } else if (percentage >= 60) {
        resultIcon.className = 'w-24 h-24 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-6';
        resultIcon.innerHTML = `
            <svg class="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
        `;
        resultTitle.textContent = 'خوب بود!';
        resultTitle.className = 'text-3xl font-bold mb-4 text-blue-600';
        resultMessage.textContent = 'شما آزمون را با موفقیت پشت سر گذاشتید. با تمرین بیشتر می‌توانید بهتر شوید.';
    } else {
        resultIcon.className = 'w-24 h-24 bg-orange-100 rounded-full mx-auto flex items-center justify-center mb-6';
        resultIcon.innerHTML = `
            <svg class="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
        `;
        resultTitle.textContent = 'نیاز به تلاش بیشتر';
        resultTitle.className = 'text-3xl font-bold mb-4 text-orange-600';
        resultMessage.textContent = 'شما نیاز به تمرین بیشتری دارید. نگران نباشید، با تمرین می‌توانید بهتر شوید!';
    }
}

// Restart Quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    
    document.getElementById('result-page').classList.add('hidden');
    document.getElementById('welcome-page').classList.remove('hidden');
}
