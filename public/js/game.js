import { ROUTERS } from './router.js';
import Storage from './storage.js';
import createElement from './helper.js';
import { timer, clearTimer } from './timer.js';
import { playAudio, stopAudio } from './utils.js';

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

  if (currentRound === COUNT_ROUNDS && currentTeamNumber === 0) {
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
      const section = document.querySelector('section');
      section.remove();
    
      if (currentTeamNumber === teams.length - 1) {
        localStorage.setItem('currentTeam', 0);
        localStorage.setItem('currentRound', currentRound + 1);
      } else {
        localStorage.setItem('currentTeam', currentTeamNumber + 1);
      }

      playAudio('../audio/time.mp3');
      const loadGameSection = createElement({ tagName: 'section', classNames: 'game-load', children: [title, subtitle, startBtn]});
      main.append(loadGameSection);

      const game = new Game(team, numberWords, time);

      const timeCountdown = 5;
      const startTimer = timer(timeCountdown, 'game-load', 'Get ready!', game, game.startGame);
      startTimer();
    });
  }
}

export class Game {
  constructor(team, numberWords, time) {
    this.team = team;
    this.numberWords = numberWords;
    this.time = time;

    this.guessedWords = [];
    this.skippedWords = [];
    
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.update = this.update.bind(this);

    this.targetBCR = null;
    this.target = null;
    this.startX = 0;
    this.currentX = 0;
    this.screenX = 0;
    this.targetX = 0;
    this.draggingCard = false;
  };

  startGame() {
    stopAudio();
    this.generateGameArea();

    const startTimer = timer(this.time, 'timer-container', '', this, this.finishGame);
    startTimer();
    playAudio('../audio/start.mp3');

    this.addEventListeners();

    requestAnimationFrame(this.update);
  }

  generateGameArea() {
    const main = document.querySelector('main');
    const section = document.querySelector('section');
    section.remove();

    const skippedElement = createElement({ tagName: 'p', classNames: 'guessed-label', textContent: '→' });
    const guessedElement = createElement({ tagName: 'p', classNames: 'skipped-label', textContent: '←' });
    const scoreContainer = createElement({ tagName: 'div', classNames: 'score-container', children: [guessedElement, skippedElement] });
    const timerContainer = createElement({ tagName: 'div', classNames: 'timer-container' });
    const cards = createElement({ tagName: 'div', classNames: 'cards' });
    const cardsContainer = createElement({ tagName: 'div', classNames: 'card-container', children: [cards, scoreContainer] });
    const gameSection = createElement({ tagName: 'section', classNames: 'game-container', children: [timerContainer, cardsContainer]});
    main.append(gameSection);
  
    this.gameWords = this.team.words.splice(0, this.numberWords);

    this.gameWords.forEach((word) => {
      cards.insertAdjacentHTML('beforeend', `<custom-card word=${word}></custom-card>`);
    });

    this.cards = [...document.querySelectorAll('custom-card')];
  }

  finishGame() {
    const main = document.querySelector('main');
    const section = document.querySelector('section');
    section.remove();
    this.removeEventListener();

    const guessedTitle = createElement({ tagName: 'h3', textContent: `Guessed: ${this.guessedWords.length}` });
    const guessedContainer = createElement({ tagName: 'div', classNames: 'guessed-words', children: [guessedTitle] });

    const skippedTitle = createElement({ tagName: 'h3', textContent: `Skipped: ${this.skippedWords.length}` });
    const skippedContainer = createElement({ tagName: 'div', classNames: 'skipped-words', children: [skippedTitle] });
    
    const btnContinue = createElement({ tagName: 'button', classNames: 'continue-btn', textContent: 'Continue' });
    const btnContainer = createElement({ tagName: 'div', classNames: 'btn-container', children: [btnContinue] });

    const sectionResult = createElement({ tagName: 'section', classNames: 'game-result', children: [guessedContainer, skippedContainer, btnContainer] });
    main.append(sectionResult);

    this.guessedWords.forEach((word) => {
      guessedContainer.insertAdjacentHTML('beforeend', `<p><span>✓</span>${word}</p>`);
    });

    this.skippedWords.forEach((word) => {
      skippedContainer.insertAdjacentHTML('beforeend', `<p><span>✗</span>${word}</p>`);
    });

    btnContinue.addEventListener('click', () => {
      generateGame();
    });
  }

  addEventListeners () {
    document.addEventListener('touchstart', this.onStart);
    document.addEventListener('touchmove', this.onMove);
    document.addEventListener('touchend', this.onEnd);

    document.addEventListener('mousedown', this.onStart);
    document.addEventListener('mousemove', this.onMove);
    document.addEventListener('mouseup', this.onEnd);
  }

  removeEventListener () {
    document.removeEventListener('touchstart', this.onStart);
    document.removeEventListener('touchmove', this.onMove);
    document.removeEventListener('touchend', this.onEnd);

    document.removeEventListener('mousedown', this.onStart);
    document.removeEventListener('mousemove', this.onMove);
    document.removeEventListener('mouseup', this.onEnd);
  }

  onStart (evt) {
    if (this.target)
      return;

    if (!evt.target.closest('custom-card'))
      return;

    this.target = evt.target.nodeName === 'CUSTOM-CARD' ? evt.target : evt.target.closest('custom-card');
    this.targetBCR = this.target.getBoundingClientRect();

    this.startX = evt.pageX || evt.touches[0].pageX;
    this.currentX = this.startX;

    this.draggingCard = true;
    this.target.style.willChange = 'transform';

    evt.preventDefault();
  }

  onMove (evt) {
    if (!this.target)
      return;

    this.currentX = evt.pageX || evt.touches[0].pageX;
  }

  onEnd () {
    if (!this.target)
      return;

    this.targetX = 0;
    let screenX = this.currentX - this.startX;

    stopAudio();

    const word = this.target.getAttribute('word');

    if (this.cards.length) {
      if (screenX > 0) {
        playAudio('../audio/guessed.mp3');
        this.team.guessed += 1;
        this.guessedWords.push(word);
      } else {
        playAudio();
        this.team.skipped += 1;
        playAudio('../audio/skipped.mp3');
        this.skippedWords.push(word);
      }
    }

    const threshold = this.targetBCR.width * 0.35;
    if (Math.abs(screenX) > threshold) {
      this.targetX = (screenX > 0) ?
           this.targetBCR.width :
          -this.targetBCR.width;
    }

    this.draggingCard = false;
  }

  update () {
    requestAnimationFrame(this.update);

    if (!this.target)
      return;

    if (!this.target.closest('custom-card'))
      return;

    if (this.draggingCard) {
      this.screenX = this.currentX - this.startX;
    } else {
      this.screenX += (this.targetX - this.screenX) / 4;
    }

    const normalizedDragDistance =
        (Math.abs(this.screenX) / this.targetBCR.width);
    const opacity = 1 - Math.pow(normalizedDragDistance, 3);

    this.target.style.transform = `translateX(${this.screenX}px)`;
    this.target.style.opacity = opacity;

    // User has finished dragging.
    if (this.draggingCard)
      return;

    const isNearlyAtStart = (Math.abs(this.screenX) < 0.1);
    const isNearlyInvisible = (opacity < 0.01);

    // If the card is nearly gone.
    if (isNearlyInvisible) {

      // Bail if there's no target or it's not attached to a parent anymore.
      if (!this.target || !this.target.parentNode)
        return;

      this.target.parentNode.removeChild(this.target);

      const targetIndex = this.cards.indexOf(this.target);
      this.cards.splice(targetIndex, 1);

      if (!this.cards.length) {
        localStorage.setItem(this.team.team_name, JSON.stringify(this.team));
        clearTimer();
        this.finishGame();
        return;
      }

      // Slide all the other cards.
      this.animateOtherCardsIntoPosition(targetIndex);

    } else if (isNearlyAtStart) {
      this.resetTarget();
    }
  }

  animateOtherCardsIntoPosition (startIndex) {
    // If removed card was the last one, there is nothing to animate.
    // Remove the target.
    if (startIndex === this.cards.length) {
      this.resetTarget();
      return;
    }

    const onAnimationComplete = evt => {
      const card = evt.target;
      card.removeEventListener('transitionend', onAnimationComplete);
      card.style.transition = '';
      card.style.transform = '';

      this.resetTarget();
    };

    // Set up all the card animations.
    for (let i = startIndex; i < this.cards.length; i++) {
      const card = this.cards[i];

      // Move the card down then slide it up.
      card.style.transform = `translateY(${this.targetBCR.height + 20}px)`;
      card.addEventListener('transitionend', onAnimationComplete);
    }

    // Now init them.
    requestAnimationFrame(_ => {
      for (let i = startIndex; i < this.cards.length; i++) {
        const card = this.cards[i];

        // Move the card down then slide it up, with delay according to "distance"
        card.style.transition = `transform 150ms cubic-bezier(0,0,0.31,1) ${i*50}ms`;
        card.style.transform = '';
      }
    });
  }

  resetTarget () {
    if (!this.target)
      return;

    this.target.style.willChange = 'initial';
    this.target.style.transform = 'none';
    this.target = null;
  }
}