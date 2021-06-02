"use strict";

document.addEventListener("DOMContentLoaded", (event) => {
  const listStatistics =  document.querySelector(".statistics");
  let statisticsArray;

  function loadData() {
    statisticsArray = JSON.parse(localStorage.getItem("statistics") || "[]");
  }

  function drawStatistics() {
    if (statisticsArray.length == 0) {
      listStatistics.insertAdjacentHTML(
        "beforeend",
        `        
            <h1 class="statistics-text">
            You don't have statistics
            </h1>       
            `
      );
    } else {
      for (let i = 0; i < statisticsArray.length; i++) {
        listStatistics.insertAdjacentHTML(
          "beforeend",
          `        
                <h2 class="statistics-text">
                  ${statisticsArray[i]}
                </h2>       
                `
        );
      }
    }
  }

  loadData();
  drawStatistics();
});