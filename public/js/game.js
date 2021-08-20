import { ROUTERS } from './router.js';
import Storage from './storage.js';
import createElement from './helper.js';

const COUNT_ROUNDS = 2;

export async function generateGame() {
  const teams = localStorage.getItem('teams').split(',');
  const currentTeamNumber = +localStorage.getItem('currentTeam');
  const currentRound = +localStorage.getItem('currentRound');
  const time = +localStorage.getItem('time');
  const numberWords = +localStorage.getItem('numberWords');
  const teamName = teams[currentTeamNumber];
  const team = JSON.parse(localStorage.getItem(teamName));
  
  const main = document.querySelector('main');
  const section = document.querySelector('section');
  section.remove();
 
  if (currentRound === COUNT_ROUNDS - 1 && currentTeamNumber === teams.length - 1) {
    const teamsList = teams.map((team) => JSON.parse(localStorage.getItem(team)));
    const winner = teamsList.reduce((acc, curr) => acc.guessed > curr.guessed ? acc : curr);

    const title = createElement({ tagName: 'h2', textContent: `Congratulations! You finish game!` });
    const subtitle = createElement({ tagName: 'h3', textContent: `Game statistics` });
    
    const tableBody = createElement({tagName: 'tBody'});
    const columnNames = ['Team name', 'Guessed', 'Skipped'];

    const headerRow = createElement({tagName: 'tr'});
    columnNames.forEach((name) => {
        const cell = createElement({tagName: 'th', textContent: name });
        headerRow.append(cell);
    });
    const table = createElement({tagName: 'table', classNames: 'table-statistics', children: [headerRow, tableBody]});

    teamsList.forEach((item) => {
        const cellTeamName = createElement({tagName: 'td', textContent: item.team_name});
        const cellGuessed = createElement({tagName: 'td', textContent: String(item.guessed)});
        const cellSkipped = createElement({tagName: 'td', textContent: String(item.skipped)});
        const row = createElement({tagName: 'tr', classNames: `${item.guessed === winner.guessed ? 'winner-row' : ''}`, children: [cellTeamName, cellGuessed, cellSkipped]});
        tableBody.append(row);
    });
    const statisticsBtn = createElement({ tagName: 'button', classNames: 'statistic-btn', textContent: 'Go to statistics'});
    const resultSection = createElement({ tagName: 'section', classNames: 'result-container', children: [title, subtitle, table, statisticsBtn]});
    main.append(resultSection);

    statisticsBtn.addEventListener('click', () => {
      location.href = ROUTERS.statistics;
    });
    
    await Storage.addStatistics(teamsList);
  } else {
    const title = createElement({ tagName: 'h2', textContent: `${teamName} team click to start game!` });
    const subtitle = createElement({ tagName: 'p', textContent: `Round ${currentRound + 1} / Game ${currentTeamNumber + 1}` });
    const startBtn = createElement({ tagName: 'button', classNames: 'start-btn', textContent: 'Click to start'});
    const startGameSection = createElement({ tagName: 'section', classNames: 'start-container', children: [title, subtitle, startBtn]});
    main.append(startGameSection);
  
    startBtn.addEventListener('click', () => {

    });
  }
}
  
// export class Game {
//   constructor(words = [], game, round, guessed, skipped) {
//     this.words = words;
//     this.game = game;
//     this.round = round;
//     this.guessed = guessed;
//     this.skipped = skipped;
//   };
// }