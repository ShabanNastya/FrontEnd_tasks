import createElement from './helper.js';

const TEAMS = [
    { placeholder: 'Cats' },
    { placeholder: 'Bees' },
];

function generateSectionTeams() {
    const textTeams = createElement({tagName: 'h1', textContent: 'Teams:'});
    
    const articleTeams = createElement({tagName: 'article', classNames: 'teams-form'});
    
    TEAMS.forEach((team) => {
        const sectionTeams = createElement({tagName: 'section', classNames: 'teams-item'});
        const inputTeams = createElement({ tagName: 'input', classNames: 'teams-name',
        attrs:[
            ['placeholder', team.placeholder],
        ]
        });
        sectionTeams.append(inputTeams);
        articleTeams.append(sectionTeams);
    });
    const btnAddTeams = createElement({tagName: 'button', classNames: 'teams-btn-add', textContent: 'Add a team'});

    const section = createElement({tagName: 'section', classNames: 'teams-container', children: [textTeams, articleTeams, btnAddTeams]});

    const main = document.querySelector('main');
    main.append(section);
}

function generateSectionRound() {
    const sectionTeams = document.querySelector('.teams-container');

    const textRound = createElement({tagName: 'h1', textContent: 'Number of words in the round:'});
    const pRound = createElement({tagName: 'p', classNames: 'round-text', textContent: '2'});
    const btnAddRound = createElement({tagName: 'button', classNames: 'round-btn-add', textContent: 'Add'});
    const btnSubRound = createElement({tagName: 'button', classNames: 'round-btn-sub', textContent: 'Sub'});
    const btnTeams = createElement({tagName: 'div', classNames: 'teams-btn', children: [btnAddRound, btnSubRound]});
    const sectionRound = createElement({tagName: 'section', classNames: 'round', children: [pRound, btnTeams]});
    const divCountRound = createElement({tagName: 'div', classNames: 'count-round', children: [textRound, sectionRound]});

    sectionTeams.append(divCountRound);
}

function generateSectionTime() {
    const sectionTeams = document.querySelector('.teams-container');

    const textRoundTime = createElement({tagName: 'h1', textContent: 'Time for the round:'});
    const pRoundTime = createElement({tagName: 'p', classNames: 'teams-container time-text', textContent: '100'});
    const btnAddTime = createElement({tagName: 'button', classNames: 'time-btn-add', textContent: 'Increase'});
    const btnSubTime = createElement({tagName: 'button', classNames: 'time-btn-sub', textContent: 'Decrease'});
    const btnTeams = createElement({tagName: 'div', classNames: 'teams-btn', children: [btnAddTime, btnSubTime]});
    const sectionRoundTime = createElement({tagName: 'section', classNames: 'time-round-section', children: [pRoundTime, btnTeams]});
    const divCountRoundTime = createElement({tagName: 'div', classNames: 'time-round', children: [textRoundTime, sectionRoundTime]});

    sectionTeams.append(divCountRoundTime);
}

function generateSectionDictionaries() {
    const sectionTeams = document.querySelector('.teams-container');

    const btnGame = createElement({tagName: 'button', classNames: 'game-btn', textContent: 'Play'});

    const textDictionaries = createElement({tagName: 'h1', classNames: 'set-words', textContent: 'Set of words'});
    
    const options = ['q', 'r'];
    
    const selectDictionary = createElement({tagName: 'select', classNames: 'dictionaries-list'});

    options.forEach((item, index) => {
        const sectionDictionariesOption = createElement({
            tagName: 'option', 
            classNames: 'dictionaries-option', 
            textContent: item, attrs: [
                ['value', item ],
                ['selected', index === 0],
            ],
        });

        selectDictionary.append(sectionDictionariesOption);
    })

    
    const container = createElement({tagName: 'div', children: [textDictionaries, selectDictionary]});

    sectionTeams.append(container);
    sectionTeams.append(btnGame);
}

function addEvents () {
    const btnAdd = document.querySelector('.teams-btn-add');
    const articleTeams = document.querySelector('.teams-form');

    btnAdd.addEventListener('click', () => {
        const inputTeams = createElement({ tagName: 'input', classNames: 'teams-name',
        attrs:[
            ['placeholder', 'Type new team...'],
        ]
        });

        const deleteBtn = createElement({ tagName: 'button', classNames: 'teams-btn-remove', textContent: 'Remove' });

        const sectionTeam = createElement({ tagName: 'section', classNames: 'teams-item', children: [inputTeams, deleteBtn] });
        
        articleTeams.append(sectionTeam);

        deleteBtn.addEventListener('click', () => {
            sectionTeam.remove();
        });
    });
}

function addNumberRound() {
    const btnAdd = document.querySelector('.round-btn-add');
    const pNumber = document.querySelector('.round-text');

    btnAdd.addEventListener('click', () => {
        pNumber.textContent++;
    });
}

function subNumberRound() {
    const btnSub = document.querySelector('.round-btn-sub');
    const pNumber = document.querySelector('.round-text');

    btnSub.addEventListener('click', () => {
        if(pNumber.textContent > 1){
            pNumber.textContent--;
        }
    });
}

function addTimeRound() {
    const btnAdd = document.querySelector('.time-btn-add');
    const pNumber = document.querySelector('.time-text');

    btnAdd.addEventListener('click', () => {
        pNumber.textContent = +pNumber.textContent + 30;
    });
}

function subTimeRound() {
    const btnSub = document.querySelector('.time-btn-sub');
    const pNumber = document.querySelector('.time-text');

    btnSub.addEventListener('click', () => {
        if (pNumber.textContent > 10){
            pNumber.textContent = pNumber.textContent - 30;
        }
    });
}


function generateSettings() {
    generateSectionTeams();
    generateSectionRound();
    generateSectionTime();
    generateSectionDictionaries();

    addEvents();
    addNumberRound();
    subNumberRound();
    addTimeRound();
    subTimeRound();
}

export {
    generateSettings,
};