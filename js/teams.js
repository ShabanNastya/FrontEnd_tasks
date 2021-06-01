"use strict";
import { firebaseConfig } from "./firebase.js";
import { DatabaseHelper } from "./databaseHelper.js";

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mobile-menu"),
    addCountRound = document.querySelector(".round-btn-add"),
    subCountRound = document.querySelector(".round-btn-sub"),
    textRound = document.querySelector(".round-text"),
    addRoundTime = document.querySelector(".time-btn-add"),
    subRoundTime = document.querySelector(".time-btn-sub"),
    textTime = document.querySelector(".time-text"),
    addTeam = document.querySelector(".teams-btn-add"),
    teamDiv = document.querySelector(".teams-form"),
    selectDict = document.querySelector(".dictionaries-option"),
    btnSubmit = document.querySelector(".game-btn");

  firebase.initializeApp(firebaseConfig);
  const databaseHelper = new DatabaseHelper(
    firebase.database(),
    "dictionaries/"
  );

  let countRound;
  let timeRound;
  let arrayWords = [];

  LoadSettings();
  getDictionariesNames();
  function LoadSettings() {
    timeRound = JSON.parse(localStorage.getItem("timeRound") || "60");
    countRound = JSON.parse(localStorage.getItem("countRound") || "5");
    textTime.innerHTML = timeRound;
    textRound.innerHTML = countRound;
  }

  function getDictionariesNames() {
   databaseHelper.getDictionariesNames()
    .then((result) => 
    {
      result.forEach((name) => {
        const el = document.createElement("option");
        el.textContent = name;
        el.value = name;
        el.id = name;
        selectDict.appendChild(el);
      });
    });
  }

  addCountRound.addEventListener("click", () => {
    countRound++;
    textRound.innerHTML = countRound;
  });

  subCountRound.addEventListener("click", () => {
    if (countRound <= 1) {
      alert("The number of rounds must be less than 0");
    } else {
      countRound--;
      textRound.innerHTML = countRound;
    }
  });

  addRoundTime.addEventListener("click", () => {
    timeRound = timeRound + 30;
    textTime.innerHTML = timeRound;
  });

  subRoundTime.addEventListener("click", () => {
    if (timeRound <= 30) {
      alert("Time per round cannot be less than 30 seconds");
    } else {
      timeRound = timeRound - 30;
      textTime.innerHTML = timeRound;
    }
  });

  addTeam.addEventListener("click", (e) => {
    teamDiv.insertAdjacentHTML(
      "beforeend",
      `
      <section class="teams-item">
        <input class="teams-name"/>
        <button class="teams-btn-remove">Удалить</button>
      </section>
      `
    );
  });

  teamDiv.addEventListener("click", (e) => {
    const btn = e.target;
    if (btn && btn.classList.contains("teams-btn-remove")) {
      btn.parentElement.remove();
    }
  });

  selectDict.addEventListener("change", () => {
    if (selectDict.value != "Выберите словарь") {
      databaseHelper.getDictionaryWords(selectDict.value)
      .then((result) => 
      {
          let i = 0;
          arrayWords = []
          for (let key in result) {
            if (typeof result[key]["word"] === "string") {
                arrayWords.push(result[key]["word"]);
                i++;
            }
          }
          drawWords();
      });
    } else {
      alert("Enter the name of the dictionary");
    }
  });

  function drawWords() {
    const oldItems = document.querySelectorAll(".dictionaries-list");
    oldItems.forEach((item) => {
      item.remove();
    });
    document.querySelector(".dictionaries").insertAdjacentHTML(
      "beforeend",
      `        
      <section class="dictionaries-list"></section>       
      `
    );

    let example = "";
    for (let i = 0; i < arrayWords.length && i < 3; i++) {
      example += arrayWords[i];
      if (i != 2) {
        example += ", ";
      }
    }

    document.querySelector(".dictionaries-list").insertAdjacentHTML(
      "beforeend",
      `        
      <h3 class="dictionaries-example">
        ${example}
      </h3>       
      `
    );
  }

  btnSubmit.addEventListener("click", (e) => {
    const teams = teamDiv.querySelectorAll(".teams-name");
    let teamsArray = [];
    let isValid = true;
    teams.forEach((item) => {
      if (item.value != "") {
        teamsArray.push(item.value);
      } else if (isValid) {
        isValid = false;
        alert("Enter team names");
        return;
      }
    });
    if (selectDict.value != "Выберите словарь") {
      if (isValid) {
        localStorage.setItem("timeRound", JSON.stringify(timeRound));
        localStorage.setItem("countRound", JSON.stringify(countRound));
        localStorage.setItem("arrayWords", JSON.stringify(arrayWords));
        localStorage.setItem("teamsArray", JSON.stringify(teamsArray));
        document.location = "game.html";
      }
    } else {
      alert("Enter the name of the dictionary");
    }
  });
});
