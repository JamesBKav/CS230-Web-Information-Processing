var timeInSecs;
var ticker;
var isPaused = false;
var format;


function startTimer(secs){
    timeInSecs = parseInt(secs);
    ticker = setInterval(tick, 1000);
}

function tick(){
    if(!isPaused && timeInSecs > 0){
        timeInSecs--;
    } else if(timeInSecs === 0){
        clearInterval(ticker);
        alert("have a break dumbahh");
    }

    var mins = Math.floor(timeInSecs / 60);
    var secs = timeInSecs % 60;

    if(mins < 1){
        document.getElementById("timer").classList.add("tlow");
    }else{
        document.getElementById("timer").classList.remove("tlow");
    }

    format = (mins < 10 ? "0" : "")+mins+":" + (secs < 10 ? "0" : "") + secs;
    document.getElementById("timer").innerHTML = format;
}

function stop(){
    clearInterval(ticker)
    timeInSecs = 25*60
    document.getElementById("timer").innerHTML = "25:00";
    isPaused = false;
    document.getElementById("timer").classList.remove("tlow");
}

// if it is paused: paused=true, if not paused: paused  = false;
function pause(){
    isPaused = !isPaused;
    document.getElementById("pause").innerText = isPaused ? "Resume" : "Pause";

    if(!isPaused){
        ticker = setInterval(tick, 1000);
    }else{
        clearInterval(ticker);
    }
}
document.getElementById("pause").addEventListener('click',pause);
