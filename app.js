let initialTime = 1800;
let restTime = 300;

function returnFormatedTime(time) {
  return `${Math.trunc(time / 60)} : ${
    time % 60 < 10 ? `0${time % 60}` : time % 60
  }`;
}

const displayWork = document.querySelector(".work-display-time");
const displayTime = document.querySelector(".pause-display-time");

displayWork.textContent = returnFormatedTime(initialTime);
displayTime.textContent = returnFormatedTime(restTime);

const startPauseBtn = document.querySelector(".start-btn");
startPauseBtn.addEventListener("click", togglePomodoro);

let currentInterval = false;
let timerID;
function togglePomodoro() {
  handlePlayPause();

  if (currentInterval) return;
  currentInterval = true;

  initialTime--;
  displayWork.textContent = returnFormatedTime(initialTime);
  handleClassAnimate({ work: true, rest: false });

  timerID = setInterval(handleTicks, 1000);
}

let pause = true;
function handlePlayPause() {
  if (startPauseBtn.firstElementChild.src.includes("play")) {
    startPauseBtn.firstElementChild.src = "ressources/pause.svg";
    pause = false;
  } else {
    startPauseBtn.firstElementChild.src = "ressources/play.svg";
    pause = true;
  }
}

function handleClassAnimate(itemState) {
  for (const item in itemState) {
    if (itemState[item]) {
      document.querySelector(`.${item}`).classList.add("active");
    } else {
      document.querySelector(`.${item}`).classList.remove("active");
    }
  }
}

const cycles = document.querySelector(".cycles");
let cyclesNumber = 0;

function handleTicks() {
  if (!pause && initialTime > 0) {
    initialTime--;

    displayWork.textContent = returnFormatedTime(initialTime);
    handleClassAnimate({ work: true, rest: false });
  } else if (!pause && initialTime === 0 && restTime > 0) {
    restTime--;
    displayTime.textContent = returnFormatedTime(restTime);
    handleClassAnimate({ work: false, rest: true });
  } else {
    initialTime = 1799;
    restTime = 300;
    displayWork.textContent = returnFormatedTime(initialTime);
    displayTime.textContent = returnFormatedTime(restTime);
    cyclesNumber++;
    cyclesNumber.textContent = `Cycle(s) : ${cyclesNumber}`;
  }
}

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", reset);

function reset() {
  initialTime = 1800;
  restTime = 300;
  displayWork.textContent = returnFormatedTime(initialTime);
  displayTime.textContent = returnFormatedTime(restTime);

  handleClassAnimate({ work: false, rest: false });
  startPauseBtn.firstElementChild.src = "ressources/play.svg";
  cycles.textContent = "Cycle(s) : 0";

  clearInterval(timerID);
  currentInterval = false;
}
