"use strict";
import { firebaseConfig } from "../js/firebase.js";
import { DatabaseHelper } from "../js/databaseHelper.js";

document.addEventListener("DOMContentLoaded", () => {
  firebase.initializeApp(firebaseConfig);
  const databaseHelper = new DatabaseHelper(firebase.database(), "dictionaries/");

  const btnAddDictionary = document.querySelector(".add-dictionaries"),
    btnRemoveDictionary = document.querySelector(".dictionaries-remove"),
    inputDictionary = document.querySelector(".dictionaries"),
    selectDictionary = document.querySelector(".dictionaries-select"),
    btnAddWord = document.querySelector(".add-word"),
    inputWord = document.querySelector(".riddle-word"),
    wordsList = document.querySelector(".list");

  let dictionariesNames = [];
  let currentDictionary = {};
  getDictionariesNames();

  function getDictionariesNames() {
   databaseHelper.getDictionariesNames()
    .then((result) => 
    {
      dictionariesNames = result;
      dictionariesNames.forEach((name) => {
        const el = document.createElement("option");
        el.textContent = name;
        el.value = name;
        el.id = name;
        selectDictionary.appendChild(el);
      });
    });
  }

  btnAddDictionary.addEventListener("click", () => {
    if (inputDictionary.value != "") {
      databaseHelper.addDictionary(inputDictionary.value);
      dictionariesNames.push(inputDictionary.value);
      const el = document.createElement("option");
      el.textContent = inputDictionary.value;
      el.value = inputDictionary.value;
      el.id = inputDictionary.value;
      selectDictionary.appendChild(el);
      inputDictionary.value = "";
    } else {
      alert("Enter the name of the dictionary");
    }
  });

  selectDictionary.addEventListener("change", () => {
    if (selectDictionary.value != "Select a dictionary") {
      databaseHelper.getDictionaryWords(selectDictionary.value)
      .then((result) => 
      {
        currentDictionary = result;
        drawWords();
      });
    }
    else {
      alert("Enter the name of the dictionary");
    }
  });
 
  function drawWords() {
    document.querySelectorAll(".list-item").forEach((item) => {
      item.remove();
    });
    for (let key in currentDictionary) {
      if (typeof currentDictionary[key]["word"] === "string") {
        wordsList.insertAdjacentHTML(
          "beforeend",
          `        
                  <section class="list-item">
                  <p class="list-text" value="${currentDictionary[key]["word"]}">${currentDictionary[key]["word"]}</p>
                  <input class="list-word-old" value="${currentDictionary[key]["word"]}">
                  <button class="list-remove">Delete</button>
                  <button class="list-update">Update</button>
                </section>`
        );
      }
    }
  }

  function drawWord(word) {
    wordsList.insertAdjacentHTML(
      "beforeend",
      `        
                <section class="list-item">
                <p class="list-text" value="${word}">${word}</p>
                <input class="list-word-old" value="${word}">
                <button class="list-remove">Delete</button>
                <button class="list-update">Update</button>
              </section>`
    );
  }

  btnAddWord.addEventListener("click", () => {
    if (selectDictionary.value != "Выберите словарь" && inputWord.value != "") {
      databaseHelper.addWord(selectDictionary.value, inputWord.value)
      drawWord(inputWord.value);
      inputWord.value = "";
      databaseHelper.getDictionaryWords(selectDictionary.value)
        .then((result) => 
        {
          currentDictionary = result;
        });
    } else {
      alert("First select a dictionary and enter a word");
    }
  });

  btnRemoveDictionary.addEventListener("click", () => {
    if (selectDictionary.value != "Выберите словарь") {
      databaseHelper.removeDictionary(selectDictionary.value);
      selectDictionary.removeChild(selectDictionary.querySelector("#" + selectDictionary.value));
      const oldItems = document.querySelectorAll(".list-item");
      oldItems.forEach((item) => {
        item.remove();
      });
    } else {
      alert("First select a dictionary");
    }
  });

  wordsList.addEventListener("click", (e) => {
    const btn = e.target;
    if (btn && btn.classList.contains("list-remove")) {
      let wordsItem;
      wordsItem = btn.parentElement.querySelector(".list-text");
      for (let key in currentDictionary) {
        if (currentDictionary[key]["word"] == wordsItem.textContent) {
          databaseHelper.removeWord(selectDictionary.value, key);
          break;
        }
      }
      btn.parentElement.remove();
    } else if (btn && btn.classList.contains("list-update")) {
      let oldWord, newWord;
      oldWord = btn.parentElement.querySelector(".list-text");
      newWord = btn.parentElement.querySelector(".list-word-old");
      for (let key in currentDictionary) {
        if (currentDictionary[key]["word"] == oldWord.textContent) {
          databaseHelper.updateWord(selectDictionary.value, key, newWord.value);
          currentDictionary[key]["word"] = newWord.value;
          btn.parentElement.querySelector(".list-word-old").innerHTML = newWord.value;
          btn.parentElement.querySelector(".list-text").innerHTML = newWord.value;
          break;
        }
      }
    }
  });
});