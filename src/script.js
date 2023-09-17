"use strict";

const hourField = document.querySelector(".hour");
const minField = document.querySelector(".min");
const secField = document.querySelector(".sec");
const daysField = document.querySelector(".day");
const hour = document.querySelector(".hours");
const min = document.querySelector(".minutes");
const sec = document.querySelector(".seconds");
const day = document.querySelector(".days");
const btnStart = document.querySelector(".start-btn");
const btnReset = document.querySelector(".reset-btn");
const btnResume = document.querySelector(".resume-btn");
const btnStop = document.querySelector(".stop-btn");
const btnTiming = document.querySelector(".btn-timing");
const btnTimerSubmit = document.querySelector(".btn-timer-submit");
const btnCancel = document.querySelector(".btn-cancel");
const overlay = document.querySelector(".overlay");
const timerBlock = document.querySelector(".timer-block");

let timeInSec;

const hideOverlay = function () {
  overlay.classList.add("hidden");
};

const calcTimerToSeconds = function () {
  const [numDay, numHour, numMin, numSec] = [
    day.value,
    hour.value,
    min.value,
    sec.value,
  ].map((value) => +value);

  timeInSec = numDay * 86400 + numHour * 3600 + numMin * 60 + numSec * 1;

  daysField.textContent = `${day.value.padStart(2, 0)}`;
  hourField.textContent = `${hour.value.padStart(2, 0)}`;
  minField.textContent = `${min.value.padStart(2, 0)}`;
  secField.textContent = `${sec.value.padStart(2, 0)}`;
};

// countdown function
const countDown = function () {
  let totalMin = Math.floor(timeInSec / 60);
  let totalHour = Math.floor(totalMin / 60);

  let setDay = String(Math.floor(totalHour / 24)).padStart(2, 0);
  let setHour = String(Math.floor(totalHour % 24)).padStart(2, 0);
  let setMin = String(Math.floor(totalMin % 60)).padStart(2, 0);
  let setSec = String(Math.floor(timeInSec % 60)).padStart(2, 0);

  daysField.textContent = setDay;
  hourField.textContent = setHour;
  minField.textContent = setMin;
  secField.textContent = setSec;
  console.log(daysField, hourField, minField, secField);
};

btnTiming.addEventListener("click", () => {
  overlay.classList.remove("hidden");
});

btnCancel.addEventListener("click", () => {
  hideOverlay();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideOverlay();
  }
});

btnTimerSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  calcTimerToSeconds();
  hideOverlay();
  btnStart.classList.remove("hidden");
});

let timerCount;
btnStart.addEventListener("click", (e) => {
  timerCount = setInterval(function () {
    --timeInSec;
    countDown();
    if (timeInSec === 0) {
      clearInterval(timerCount);
    }
  }, 1000);

  btnStart.classList.add("hidden");
  btnStop.classList.remove("hidden");
  btnTiming.classList.add("hidden");
});

btnStop.addEventListener("click", (e) => {
  clearInterval(timerCount);
  btnStop.classList.add("hidden");
  btnResume.classList.remove("hidden");
});

btnResume.addEventListener("click", (e) => {
  timerCount = setInterval(function () {
    countDown();
    if (timeInSec > 0) {
      --timeInSec;
    } else if (timeInSec === 0) {
      clearInterval(timerCount);
    }
  }, 1000);

  btnResume.classList.add("hidden");
  btnStop.classList.remove("hidden");
});

btnReset.addEventListener("click", (e) => {
  clearInterval(timerCount);

  timeInSec = 0;
  countDown();

  btnResume.classList.add("hidden");
  btnStop.classList.add("hidden");
  btnTiming.classList.remove("hidden");
});
