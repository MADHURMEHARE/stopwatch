let startTime, updatedTime, difference, timerInterval;
let running = false;
let lapTimes = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startStopButton.addEventListener('click', () => {
    if (running) {
        clearInterval(timerInterval);
        startStopButton.textContent = 'Start';
    } else {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 10);
        startStopButton.textContent = 'Stop';
    }
    running = !running;
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    running = false;
    startStopButton.textContent = 'Start';
    difference = 0;
    updateDisplay();
    lapTimes = [];
    displayLaps();
});

lapButton.addEventListener('click', () => {
    if (running) {
        lapTimes.push(difference);
        displayLaps();
    }
});

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    display.textContent = 
        (hours < 10 ? "0" : "") + hours + ":" + 
        (minutes < 10 ? "0" : "") + minutes + ":" + 
        (seconds < 10 ? "0" : "") + seconds;
}

function displayLaps() {
    lapsContainer.innerHTML = '';
    lapTimes.forEach((lap, index) => {
        let lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${index + 1}: ${(lap / 1000).toFixed(2)} s`;
        lapsContainer.appendChild(lapElement);
    });
}
