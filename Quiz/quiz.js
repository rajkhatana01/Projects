const quizData = [
    {
        quesId: 1,
        question: "Which language is commonly used for styling web pages?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: "CSS"
    },
    {
        quesId: 2,
        question: "Which programming language is primarily used for web development?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: "JavaScript"
    },
    {
        quesId: 3,
        question: "Which of the following is a backend programming language?",
        options: ["CSS", "HTML", "Java", "Bootstrap"],
        answer: "Java"
    },
    {
        quesId: 4,
        question: "Which language is commonly used for data science and machine learning?",
        options: ["C", "JavaScript", "Python", "PHP"],
        answer: "Python"
    },
    {
        quesId: 5,
        question: "Which programming language is known for its use in Android app development?",
        options: ["Swift", "Java", "C#", "Ruby"],
        answer: "Java"
    },
    {
        quesId: 6,
        question: "Which of the following is a statically typed language?",
        options: ["JavaScript", "Python", "Java", "Ruby"],
        answer: "Java"
    },
    {
        quesId: 7,
        question: "Which language is used for database management?",
        options: ["C++", "SQL", "Python", "Go"],
        answer: "SQL"
    },
    {
        quesId: 8,
        question: "Which language is often used for scripting in web development?",
        options: ["Java", "C++", "PHP", "Swift"],
        answer: "PHP"
    },
    {
        quesId: 9,
        question: "Which programming language is commonly used for system programming?",
        options: ["Python", "C", "JavaScript", "HTML"],
        answer: "C"
    },
    {
        quesId: 10,
        question: "Which of the following is a frontend framework?",
        options: ["Django", "React", "Node.js", "Laravel"],
        answer: "React"
    }
];

let currIndex = 0;
let score = 0;
let totalTime = 10 * 60;
let quesTime = 60;
let timeInterval;
let quesInterval;

let userAnswerList = [];

let quesDisp = document.querySelector(".quesDisplay");
let optionDiv = document.querySelector(".options");
let container = document.querySelector(".container");
let submitBtn = document.querySelector("#btn");
let startBtn = document.querySelector("#start");
let timerDisplay = document.querySelector("#time");
let quesTimerDisplay = document.querySelector("#quesTime");
let resultDiv = document.querySelector("#result");
let restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", () => {
    currIndex = 0;
    score = 0;
    totalTime = 10 * 60;
    quesTime = 60;
    userAnswerList = [];
    startBtn.style.display = "block";
    resultDiv.style.display = "none";
    restartBtn.style.display = "none";
});

startBtn.addEventListener("click", () => {
    container.style.display = "block";
    startBtn.style.display = "none";
    displayQues();
    startTimer();
});

function startTimer(){
    updateTimer();
    timeInterval = setInterval(() => {
        totalTime--;
        updateTimer();
        if (totalTime <= 0) {
            clearInterval(timeInterval);
            quizOver();
        }
    }, 1000);
}

function updateTimer(){
    const minutes = Math.floor(totalTime / 60);
    const secs = totalTime % 60;
    timerDisplay.innerHTML = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateQuesTimer(){
    const minutes = Math.floor(quesTime / 60);
    const secs = quesTime % 60;
    quesTimerDisplay.innerHTML = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function quesTimer(){
    clearInterval(quesInterval);
    quesTime = 60;
    updateQuesTimer();
    quesInterval = setInterval(() => {
        quesTime--;
        updateQuesTimer();
        if (quesTime <= 0) {
            clearInterval(quesInterval);
            currIndex++;
            displayQues();
        }
    }, 1000);
}

function displayQues(){

    if(currIndex < quizData.length){
        quesTimer();

        quesDisp.innerHTML = `${quizData[currIndex].quesId}. ` + quizData[currIndex].question;
        optionDiv.innerHTML = "";

        quizData[currIndex].options.forEach(option => {
            let label = document.createElement("label");
            label.innerHTML = `<input type="radio" name="option" value="${option}"> ${option}`;
            optionDiv.appendChild(label);
        });
    } else {
        quizOver();
    }
}

function submitQuiz(){
    let selectedOption = document.querySelector("input[name='option']:checked");

    if(!selectedOption){
        alert("Please select an answer before submitting or going to next question!");
        return;
    }

    let userAnswer = selectedOption.value;
    if(quizData[currIndex].answer === userAnswer){
        score += 10;
        userAnswerList.push(userAnswer + `✅`);
    } else {
        userAnswerList.push(userAnswer + `❌`);
    }

    currIndex++;

    if(currIndex < quizData.length){
        displayQues();
    } else {
        quizOver();
    }
}

function quizOver(){
    clearInterval(timeInterval);
    clearInterval(quesInterval);

    let currTime = timerDisplay.innerHTML;
    timerDisplay.innerHTML = "00:00";
    container.style.display = "none";
    resultDiv.style.display = "block";
    restartBtn.style.display = "block";

    resultDiv.innerHTML = `<h2>Quiz Over!</h2>`;
    resultDiv.innerHTML += `<p>Your final score: <strong>${score}</strong></p>`;
    resultDiv.innerHTML += `<p>Time left: <strong>${currTime}</strong></p>`;
    resultDiv.innerHTML += `<h3>Correct Answers:</h3>`;

    quizData.forEach((q, index) => {
        resultDiv.innerHTML += `<p><strong>Q${index + 1}:</strong> ${q.question}<br><strong>Correct Answer: </strong>${q.answer}<br><strong>Your Answer: </strong>${userAnswerList[index] || "You have not answered this question!"}</p>`;
    });
}

submitBtn.addEventListener("click", submitQuiz);
