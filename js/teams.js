import createElement from "./helper.js";

function generateMainPage() {

    const mainText = createElement({tagName: 'div', classNames: 'mainText'});

    const menu = createElement({tagName: 'nav', classNames: 'navbar mobile-menu'});

    // document.body.append(header);
}

const TEAMS = [
    { placeholder: 'Котики' },
    { placeholder: 'Пуфики' },
];

//????????????
function generateSectionTeams() {
    const textTeams = createElement({tagName: 'h1', classNames: 'teams-container', textContent: 'Команды:'});

    const sectionTeams = createElement({tagName: 'section', classNames: 'teams-item'});
    const articleTeams = createElement({tagName: 'article', classNames: 'teams-container teams-form', children: [sectionTeams]});


    TEAMS.forEach((team) => {
        const inputTeams = createElement({ tagName: 'input', classNames: 'teams-name',
        attrs:[
            ['placeholder', 'Котики'],
        ]
        });
        sectionTeams.append(inputTeams);
    });
    const btnAddTeams = createElement({tagName: 'button', classNames: 'teams-btn-add', textContent: 'Добавить команду'});



    document.body.append(textTeams);
    document.body.append(articleTeams);
    document.body.append(btnAddTeams);
}

function generateSectionRound() {
    const textRound = createElement({tagName: 'h1', classNames: 'teams-container', textContent: 'Количество раундов:'});
    const pRound = createElement({tagName: 'p', classNames: 'teams-container round-text', textContent: '100'});
    const btnAddRound = createElement({tagName: 'button', classNames: 'round-btn-add', textContent: 'Добавить'});
    const btnSubRound = createElement({tagName: 'button', classNames: 'round-btn-sub', textContent: 'Отнять'});
    const btnTeams = createElement({tagName: 'div', classNames: 'teams-btn', children: [btnAddRound, btnSubRound]});
    const sectionRound = createElement({tagName: 'section', classNames: 'round', children: [pRound, btnTeams]});
    const divCountRound = createElement({tagName: 'div', classNames: 'count-round', children: [textRound, sectionRound]});

    document.body.append(divCountRound);
}

function generateSectionTime() {
    const textRoundTime = createElement({tagName: 'h1', classNames: 'teams-container time-round', textContent: 'Время на раунд:'});
    const pRoundTime = createElement({tagName: 'p', classNames: 'teams-container time-text', textContent: '100'});
    const btnAddTime = createElement({tagName: 'button', classNames: 'time-btn-add', textContent: 'Увеличить'});
    const btnSubTime = createElement({tagName: 'button', classNames: 'time-btn-sub', textContent: 'Уменьшить'});
    const btnTeams = createElement({tagName: 'div', classNames: 'teams-btn', children: [btnAddTime, btnSubTime]});
    const sectionRoundTime = createElement({tagName: 'section', classNames: 'time-round-section', children: [pRoundTime, btnTeams]});
    const divCountRoundTime = createElement({tagName: 'div', classNames: 'time-round', children: [textRoundTime, sectionRoundTime]});

    document.body.append(divCountRoundTime);
}

function generateSectionDictionaries() {
    const btnGame = createElement({tagName: 'button', classNames: 'game-btn', textContent: 'Играть'});

    const textDictionaries = createElement({tagName: 'h1', classNames: 'dictionaries set-words', textContent: 'Набор слов'});
    const sectionDictionariesOption = createElement({tagName: 'section', classNames: 'dictionaries dictionaries-option'});
    const sectionDictionariesList = createElement({tagName: 'section', classNames: 'dictionaries dictionaries-list'});

    //document.body.append(divDictionaries);
    document.body.append(textDictionaries);
    document.body.append(btnGame);
}

export {
    generateSectionTeams,
    generateSectionRound,
    generateSectionTime,
    generateSectionDictionaries,
};