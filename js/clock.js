const clock = document.querySelector(".clock");
const clockSize = 450;
const radius = clockSize / 2;

for (let i = 0; i < 60; i++) {
  const angle = i * 6;
  const tick = document.createElement("div");
  tick.classList.add("tick");

  const tickLine = document.createElement("div");
  tickLine.classList.add("tick-line");

  if (i % 15 === 0) {
    tick.classList.add("long");
  } else if (i % 5 === 0) {
    tick.classList.add("medium");
  } else {
    tick.classList.add("short");
  }

  tick.style.transform = `rotate(${angle}deg)`;
  tick.appendChild(tickLine);
  clock.appendChild(tick);

  if (i % 5 === 0) {
    const number = document.createElement("div");
    number.classList.add("number");
    let hourNumber = i / 5 === 0 ? 12 : i / 5;
    number.textContent = hourNumber;

    const numRadius = radius * 0.8;
    const numX = radius + numRadius * Math.sin((angle * Math.PI) / 180);
    const numY = radius - numRadius * Math.cos((angle * Math.PI) / 180);

    number.style.left = `${50 + 40 * Math.sin((angle * Math.PI) / 180)}%`;
    number.style.top = `${50 - 40 * Math.cos((angle * Math.PI) / 180)}%`;
    number.style.transform = `translate(-50%, -50%)`;

    clock.appendChild(number);
  }
}

const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");
const body = document.body;

let currentSecondAngle = 0;
let prevSecond = null;

function setClock(init = false) {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  if (init) {
    currentSecondAngle = seconds * 6;
  } else {
    if (prevSecond !== null) {
      let diff = seconds - prevSecond;
      if (diff === 1 || diff === -59) {
        currentSecondAngle += 6;
      } else if (diff !== 0) {
        currentSecondAngle = seconds * 6;
      }
    }
  }
  prevSecond = seconds;

  secondHand.style.transform = `translateX(-50%) rotate(${currentSecondAngle}deg)`;

  const minuteDegrees = minutes * 6 + seconds * 0.1;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;

  const hourDegrees = (hours % 12) * 30 + minutes * 0.5 + seconds * (0.5 / 60);
  hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
}

setClock(true);

setInterval(() => setClock(false), 200);