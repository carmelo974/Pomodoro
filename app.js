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

function togglePomodoro() {
  handlePlayPause();
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
