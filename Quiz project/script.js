document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultsScreen = document.getElementById('results-screen');
    const startButton = document.getElementById('start-button');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const questionCounter = document.getElementById('question-counter');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const submitButton = document.getElementById('submit-button');
    const restartButton = document.getElementById('restart-button');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const correctAnswersSpan = document.getElementById('correct-answers');
    const incorrectAnswersSpan = document.getElementById('incorrect-answers');
    const unansweredQuestionsSpan = document.getElementById('unanswered-questions');
    const scorePercentageSpan = document.getElementById('score-percentage');
    const winnerMessage = document.getElementById('winner-message');
    const timeDisplay = document.getElementById('time-display');

    let currentQuestionIndex = 0;
    let userAnswers = new Array(questions.length).fill(null);
    let timerInterval;
    const TOTAL_TIME_SECONDS = 5 * 60; // 5 minutes
    let timeLeft = TOTAL_TIME_SECONDS;

    // Helper functions for screen management
    const showScreen = (screenId) => {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    };

    const startTimer = () => {
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                submitQuiz();
                return;
            }
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
    };

    const displayQuestion = () => {
        const question = questions[currentQuestionIndex];
        questionText.textContent = question.question;
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            
            // Mark option if already selected
            if (userAnswers[currentQuestionIndex] === option) {
                optionElement.classList.add('selected');
            }

            optionElement.addEventListener('click', () => selectOption(option));
            optionsContainer.appendChild(optionElement);
        });

        questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
        updateNavigationButtons();
    };

    const selectOption = (selectedOption) => {
        userAnswers[currentQuestionIndex] = selectedOption;
        
        // Update UI to show selected option
        document.querySelectorAll('.option').forEach(optionElement => {
            optionElement.classList.remove('selected');
        });
        const selectedElement = Array.from(optionsContainer.children).find(el => el.textContent === selectedOption);
        if (selectedElement) {
            selectedElement.classList.add('selected');
        }
    };

    const updateNavigationButtons = () => {
        prevButton.disabled = currentQuestionIndex === 0;
        nextButton.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
        submitButton.style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
    };

    const submitQuiz = () => {
        clearInterval(timerInterval);
        let correctCount = 0;
        let unansweredCount = 0;

        userAnswers.forEach((answer, index) => {
            if (answer === null) {
                unansweredCount++;
            } else if (answer === questions[index].correctAnswer) {
                correctCount++;
            }
        });

        const incorrectCount = questions.length - correctCount - unansweredCount;
        const scorePercentage = (correctCount / questions.length) * 100;

        // Display results
        totalQuestionsSpan.textContent = questions.length;
        correctAnswersSpan.textContent = correctCount;
        incorrectAnswersSpan.textContent = incorrectCount;
        unansweredQuestionsSpan.textContent = unansweredCount;
        scorePercentageSpan.textContent = `${scorePercentage.toFixed(2)}%`;

        if (scorePercentage >= 80) {
            winnerMessage.innerHTML = `🎉 Congratulations! You have passed the examination. Your score is excellent! 🎉`;
            winnerMessage.style.color = 'var(--success-color)';
        } else {
            winnerMessage.innerHTML = `You have completed the quiz. Keep practicing to improve!`;
            winnerMessage.style.color = 'var(--primary-color)';
        }

        showScreen('results-screen');
    };

    // Event Listeners
    startButton.addEventListener('click', () => {
        showScreen('quiz-screen');
        currentQuestionIndex = 0;
        userAnswers.fill(null);
        timeLeft = TOTAL_TIME_SECONDS;
        startTimer();
        displayQuestion();
    });

    prevButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        }
    });

    submitButton.addEventListener('click', () => {
        submitQuiz();
    });

    restartButton.addEventListener('click', () => {
        showScreen('welcome-screen');
    });

    // Initial state
    showScreen('welcome-screen');
});