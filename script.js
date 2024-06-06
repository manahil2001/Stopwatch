
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;
let lapArray = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', resetTime);
lapBtn.addEventListener('click', addLap);

function startStop() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(getShowTime, 10);
    startStopBtn.textContent = 'Pause';
    startStopBtn.style.backgroundColor = '#dc3545';
    resetBtn.disabled = true;
    lapBtn.disabled = false;
    running = true;
  } else {
    clearInterval(tInterval);
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#28a745';
    resetBtn.disabled = false;
    lapBtn.disabled = true;
    running = false;
  }
}

function resetTime() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  lapCounter = 0;
  lapArray = [];
  display.textContent = '00:00:00.00';
  startStopBtn.textContent = 'Start';
  startStopBtn.style.backgroundColor = '#28a745';
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  laps.innezzrHTML = '';
}

function addLap() {
  lapCounter++;
  const lapTime = difference;
  lapArray.push(lapTime);
  const lapElement = document.createElement('div');
  lapElement.textContent = `Lap ${lapCounter}: ${formatTime(lapTime)}`;
  laps.appendChild(lapElement);
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  display.textContent = formatTime(difference);
}

function formatTime(time) {
  let milliseconds = Math.floor((time % 1000) / 10);
  let seconds = Math.floor((time % (1000 * 60)) / 1000);
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  hours = (hours < 10) ? '0' + hours : hours;

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
