const timerDisplay = document.querySelector("#timer");
const start = document.querySelector("#start");
const pause = document.querySelector("#pause");
const reset = document.querySelector("#reset");
const lap =document.querySelector("#lapse");
const lapDisplay = document.querySelector("#list");

let msec = 0;
let sec = 0;
let min = 0;
let hr=0;

let timerId = null;

start.addEventListener('click', function(){

    if(timerId != null){
        clearInterval(timerId);
    }
    timerId = setInterval(startTimer,10);
    lap.disabled=false;
})


pause.addEventListener('click', function(){

    clearInterval(timerId);
    lap.disabled=true;
    start.innerHTML="RESUME";
})

reset.addEventListener('click', function(){
    clearInterval(timerId);
    timerId = null;
    msec = 0;
    sec = 0;
    min = 0;
    hr=0;
    timerDisplay.innerHTML = `00:00:00:00`;
    lapDisplay.innerHTML='';
    start.innerHTML="START"
})

lap.addEventListener('click', function(){
    let lapTime = timerDisplay.innerHTML;
    let li = document.createElement('li');
    li.textContent = lapTime;
    lapDisplay.appendChild(li);
})



function startTimer(){
    // console.log("timer start");
    msec++;
    if(msec == 100){
        msec = 0;
        sec++;
        if(sec==60){
            sec=0;
            min++;
            if(min==60){
                min=0;
                hr++;
            }
        }
    }

    let msecStr = msec < 10 ? `0${msec}` : msec;
    let secStr = sec < 10 ? `0${sec}` : sec;
    let minStr = min < 10 ? `0${min}` : min;
    let hrStr = hr < 10 ? `0${hr}` : hr;

    timerDisplay.innerHTML = `${hrStr}:${minStr}:${secStr}:${msecStr}`;
}