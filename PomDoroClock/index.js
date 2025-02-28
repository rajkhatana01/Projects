const display = document.getElementById('display');
const sessionTime = document.getElementById('st');
const breakTime = document.getElementById('bt');

const sessionMinus = document.getElementById('sm');
const sessionPlus = document.getElementById('sp');
const breakMinus = document.getElementById('bm');
const breakPlus = document.getElementById('bp');

const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

const label = document.getElementById("label");

let sessionDuration = 10;
let breakDuration = 2;
let isRunning = false;
let isSession = true;
let timeLeft = sessionDuration * 60;
let timerInterval;

let seassionId=1;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    display.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    if(isSession){
        label.innerHTML=`Seassion ${seassionId}`;
        display.style.color = 'rgb(40, 134, 134)';
        display.style.borderColor = 'rgb(40, 134, 134)';
    }
    if(!isSession){
        label.innerHTML=`Break ${seassionId}`;
        display.style.color = 'rgba(255, 68, 0, 0.8)';
        display.style.borderColor = 'rgba(255, 68, 0, 0.8)';
    }
    if(timeLeft === 0  && isSession === false){
        seassionId++;
    }
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.textContent = 'Resume';

        if(isSession === true){
            timeLeft = sessionDuration * 60;
        }

        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                isSession = !isSession;
                isRunning = false;
                timeLeft = breakDuration * 60;
                updateDisplay();
                startTimer();
            }

        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    // pauseTimer();
    clearInterval(timerInterval);
    sessionDuration = 10;
    breakDuration = 2;
    isRunning = false;
    isSession = true;
    timeLeft = sessionDuration * 60;
    timerInterval = null;
    seassionId=1;
    startBtn.textContent = 'Start';
    sessionTime.textContent = `${sessionDuration < 10 ? '0' + sessionDuration + ' min' : sessionDuration + ' min' }`;
    breakTime.textContent = `${breakDuration < 10 ? '0' + breakDuration + ' min' : breakDuration + ' min' }`;
    updateDisplay();
    // display.innerHTML=`00:00`; 


}

function controlSessionTime(value) {
    sessionDuration = Math.max(1, sessionDuration + value);
    sessionTime.textContent = `${sessionDuration} min`;
    if (!isRunning && isSession) {
        timeLeft = sessionDuration * 60;
        updateDisplay();
    }
}

function controlBreakTime(value) {
    breakDuration = Math.max(1,breakDuration + value);
    breakTime.textContent = `${breakDuration} min`;
    if (!isRunning && !isSession) {
        timeLeft = breakDuration * 60;
        updateDisplay();
    }
}


sessionMinus.addEventListener('click', ()=> controlSessionTime(-1));
sessionPlus.addEventListener('click', ()=> controlSessionTime(1));
breakMinus.addEventListener('click', ()=> controlBreakTime(-1));
breakPlus.addEventListener('click', ()=> controlBreakTime(1));
 

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer); 

updateDisplay();

