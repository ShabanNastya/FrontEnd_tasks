let timerInterval = null;

function timer(time, elementClass, textAfter = '', object, objectMethod){
  const FULL_DASH_ARRAY = 283;
  const WARNING_THRESHOLD = 0;
  const ALERT_THRESHOLD = 0;

  const COLOR_CODES = {
    info: {
      color: 'green',
    },
    warning: {
      color: 'orange',
      threshold: WARNING_THRESHOLD,
    },
    alert: {
      color: 'red',
      threshold: ALERT_THRESHOLD,
    }
  };

  const TIME_LIMIT = time;
  let timePassed = 0;
  let timeLeft = TIME_LIMIT;
  const remainingPathColor = COLOR_CODES.info.color;

  function formatTime(secTime) {
    let seconds = secTime;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${seconds}`;
  }


  document.querySelector(`.${elementClass}`).innerHTML = `
  <div class="timer">
    <svg class="timer-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="timer-circle">
        <circle class="timer-elapsed" cx="50" cy="50" r="45"></circle>
        <path
          id="timer-path-remaining"
          stroke-dasharray="283"
          class="timer-path ${remainingPathColor}"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span id="timer-label" class="timer-label">${formatTime(
      timeLeft
    )}</span>
    <div>${textAfter}</div>
  </div>
  `;

  function onTimesUp() {
    clearInterval(timerInterval);
    const fnEndOfTime = objectMethod.bind(object);
    fnEndOfTime();
  }

  function setRemainingPathColor(remainingTime) {
    const { alert, warning, info } = COLOR_CODES;

    if (remainingTime <= alert.threshold) {
      document
        .getElementById('timer-path-remaining')
        .classList.remove(warning.color);
      document
        .getElementById('timer-path-remaining')
        .classList.add(alert.color);
    } else if (remainingTime <= warning.threshold) {
      document
        .getElementById('timer-path-remaining')
        .classList.remove(info.color);
      document
        .getElementById('timer-path-remaining')
        .classList.add(warning.color);
    }
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }

  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById('timer-path-remaining')
      .setAttribute('stroke-dasharray', circleDasharray);
  }
  
  return function startTimer() {
    timerInterval = setInterval(() => {
      timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById('timer-label').innerHTML = formatTime(
        timeLeft
      );
      setCircleDasharray();
      setRemainingPathColor(timeLeft);
      if (timeLeft === 0) {
        onTimesUp();
      }
    }, 1000);
  }
}

function clearTimer(){
  clearInterval(timerInterval);
}

export { timer, clearTimer };