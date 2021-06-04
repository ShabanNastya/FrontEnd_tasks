"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const btnPlay = document.querySelector(".start"),
    stateWrapper = document.querySelector(".state"),
    timerShow = document.querySelector(".timer"),
    teamShow = document.querySelector(".teams-name"),
    card = document.querySelector(".container-card"),
    cardContainer = document.querySelector(".container"),
    wordText = card.querySelector(".current-word");

  let timerRound,
    countRound,
    wordsArray,
    teamsArray,
    startX = -1,
    teamsPointArray,
    roudWordArray;
  let currentTeam = 0,
    currentPoints = 0;
  LoadSettings();

  cardContainer.addEventListener("mouseup", mouseUp);
  card.addEventListener("mousedown", mouseDown);
  card.addEventListener("touchstart", touchStart);
  card.addEventListener("touchend", touchEnd);

  function LoadSettings() {
    timerRound = JSON.parse(localStorage.getItem("timeRound"));
    countRound = JSON.parse(localStorage.getItem("countRound"));
    wordsArray = JSON.parse(localStorage.getItem("arrayWords"));
    console.log(wordsArray);
    teamsArray = JSON.parse(localStorage.getItem("teamsArray"));
    timerShow.innerHTML = timerRound;
    teamShow.innerHTML = "Команда: " + teamsArray[currentTeam];
    wordText.innerHTML = wordsArray[getRandomInt(0, wordsArray.length)];
    teamsPointArray = getTeamsPointArray();
    roudWordArray = new Map();
    setBtnVisible();
  }

  function getTeamsPointArray() {
    let array = [];
    for (let i = 0; i < teamsArray.length; i++) {
      let temp = [];
      array.push(temp);
    }
    return array;
  }

  btnPlay.addEventListener("click", (e) => {
    startTimer();
  });

  function startTimer() {
    let timeTemp = timerRound;
    setBtnInvisible();
    const timer = setInterval(function () {
      let seconds = timeTemp % 60;
      let minutes = (timeTemp / 60) % 60;
      if (timeTemp <= 0) {
        clearInterval(timer);
        if (currentTeam + 1 < teamsArray.length) {
          currentPoints = currentTeam;
          nextRound();
          currentTeam++;
          teamShow.innerHTML = "Команда: " + teamsArray[currentTeam];
          return;
        } else {
          if (countRound > 1) {
            currentPoints = currentTeam;
            nextRound();
            countRound--;
            currentTeam = 0;
            teamShow.innerHTML = "Команда: " + teamsArray[currentTeam];
          } else {
            currentPoints = currentTeam;
            countRound--;
            drawRoundState();
          }
        }
      } else {
        if (minutes < 10) {
          minutes = "0" + minutes;
        }

        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        let strTimer = `${Math.trunc(minutes)}:${seconds}`;
        timerShow.innerHTML = strTimer;
      }
      --timeTemp;
    }, 1000);
  }

  function nextRound() {
    setBtnVisible();
    drawRoundState();
    timerShow.innerHTML = timerRound;
    wordText.innerHTML = wordsArray[getRandomInt(0, wordsArray.length)];
    roudWordArray = new Map();
  }

  function touchStart(event) {
    startX = event.changedTouches[event.changedTouches.length - 1].pageX;
  }

  function touchEnd(event) {
    let endX = event.changedTouches[event.changedTouches.length - 1].pageX;
    playCardAudio();
    if (startX < endX) {
      swapRight();
      pushNewWord(1);
      startX = -1;
      wordText.innerHTML = wordsArray[getRandomInt(0, wordsArray.length)];
    } else {
      swapLeft();
      pushNewWord(-1);
      startX = -1;
      wordText.innerHTML = wordsArray[getRandomInt(0, wordsArray.length)];
    }
  }

  function mouseDown(event) {
    startX = event.pageX;
  }

  function mouseUp(event) {
    if (startX != -1) {
      playCardAudio();
      let endX = event.pageX;
      if (startX < endX) {
        swapRight();
        pushNewWord(1);
        startX = -1;
        wordText.innerHTML = wordsArray[getRandomInt(0, wordsArray.length)];
      } else {
        swapLeft();
        pushNewWord(-1);
        startX = -1;
        wordText.innerHTML = wordsArray[getRandomInt(0, wordsArray.length)];
      }
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function setBtnVisible() {
    btnPlay.style.visibility = "visible";
    card.style.visibility = "hidden";
  }

  function setBtnInvisible() {
    btnPlay.style.visibility = "hidden";
    card.style.visibility = "visible";
  }

  function pushNewWord(point) {
    roudWordArray.set(wordText.textContent, point);
  }

  function drawEndGame() {
    stateWrapper.insertAdjacentHTML(
      "beforeend",
      `
      <div class="state-shadow">
        <div class="state-content">
        </div>
      </div>
     `
    );
    let statistics = JSON.parse(localStorage.getItem("statistics") || "[]");
    const date = new Date();
    let newGameState =
      date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes();
    for (let i = 0; i < teamsPointArray.length; i++) {
      newGameState +=
        "<br>" +
        "Команда " +
        teamsArray[i] +
        ": " +
        "Score: " +
        teamsPointArray[i] +
        ".";
      stateWrapper.querySelector(".state-content").insertAdjacentHTML(
        "beforeend",
        `
        <div class="state-item-end">
          <h4 class="state-text-end">Команда ${teamsArray[i]}: ${teamsPointArray[i]}</h4>
        </div>
      `
      );
    }
    statistics.push(newGameState);
    localStorage.setItem("statistics", JSON.stringify(statistics));
    stateWrapper.querySelector(".state-content").insertAdjacentHTML(
      "beforeend",
      `
          <button class="state-btn-end">Закончить</button>
      `
    );
  }

  function drawRoundState() {
    stateWrapper.insertAdjacentHTML(
      "beforeend",
      `
      <div class="state-shadow">
        <div class="state-content">
        </div>
      </div>
     `
    );
    for (var key of roudWordArray.keys()) {
      stateWrapper.querySelector(".state-content").insertAdjacentHTML(
        "beforeend",
        `
        <div class="state-item">
        <h4 class="state-text">${key}</h6>
          <input class="state-togglebtn" type="checkbox" 
          ${roudWordArray.get(key) == 1 ? "checked" : ""}>
        </div>
      `
      );
    }
    stateWrapper.querySelector(".state-content").insertAdjacentHTML(
      "beforeend",
      `
          <button class="state-btn-next">Continue</button>
      `
    );
  }

  stateWrapper.addEventListener("click", (e) => {
    const btn = e.target;
    let count = 0;
    if (btn && btn.classList.contains("state-btn-next")) {
      stateWrapper
        .querySelectorAll(".state-togglebtn")
        .forEach((element) => {
          if (element.checked) {
            count++;
          }
        });
      teamsPointArray[currentPoints] =
        Number(teamsPointArray[currentPoints]) + Number(count);
      btn.parentElement.parentElement.remove();
      if (countRound == 0) {
        drawEndGame();
      }
    }

    if (btn && btn.classList.contains("state-btn-end")) {
      document.location = "index.html";
    }
  });

  function playCardAudio() {
    const audio = new Audio();
    audio.src = "/images/sound.mp3";
    audio.play();
  }

  function deleteTempCard() {
    cardContainer.querySelector("#swapcard").remove();
  }

  function swapRight() {
    cardContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div id="swapcard" class="container-card">
        <p class="current-word">${wordText.textContent}</p>
      </div>
      `
    );
    let temp = cardContainer.querySelector("#swapcard");
    temp.classList.add("slide-right");
    setTimeout(deleteTempCard, 500);
  }

  function swapLeft() {
    cardContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div id="swapcard" class="container-card">
        <p class="current-word">${wordText.textContent}</p>
      </div>
      `
    );
    let temp = cardContainer.querySelector("#swapcard");
    temp.classList.add("slide-left");
    setTimeout(deleteTempCard, 500);
  }
});