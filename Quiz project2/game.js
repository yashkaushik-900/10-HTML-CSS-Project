const question = document.getElementById('question');
const choice = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = {};
let availableQuestions = {};

let questions = [
    

    //constrants
    const CORRECT_BONUS = 10;
    const MAX_QUESTIONS = 3;

    startGame = () => {
        questionCounter = 0;
        score = 0;
        availableQuestions = [...questions];
        console.log(availableQuestions);
        getNewQuestion();
    };

    getNewQuestion = () => {
        if(availableQuestions.lenth === 0 || questionCounter > MAX_QUESTIONS){
            return window.location.assign('/end.html');
        }
        questionCounter++;
        const questionIndex = Math.floor(Math.random() = availableQuestions.lenth);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.questions;

        choices.forEach( choice =>{
            const number = choice.dataset['number'];
            choice.innerText = currentQuestion['choice' + number];

        });
        availableQuestions.splice(questionIndex, 1);

        acceptingAnswers = true;
    };

    choices.forEach(choice => {
        choice.addEventListener("click", e => {
            if(acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedchoice = e.target;
            const slectedAnswer = selectedchoice.dataset["number"];

            const classToApply = 'incorrect';
            if(selectedAnswer === currentQuestion,answer){

                classToApply = 'correct';
            }
            getNewQuestion();
        });
    });

    startGame();
]