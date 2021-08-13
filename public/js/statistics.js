import createElement from './helper.js';
import Storage from './storage.js';

async function generateStatistics() {
    const statistics = await Storage.getStatistics();

    const tableBody = createElement({tagName: 'tBody'});
    const columnNames = ['Team name', 'Correct', 'Skipped', 'Game date'];

    const headerRow = createElement({tagName: 'tr'});
    columnNames.forEach((name) => {
        const cell = createElement({tagName: 'th', textContent: name });
        headerRow.append(cell);
    });
    const table = createElement({tagName: 'table', classNames: 'table-statistics', children: [headerRow, tableBody]});

    statistics.forEach((item) => {
        console.log(item.correct, item.skipped);
        const cellTeamName = createElement({tagName: 'td', textContent: item.team_name});
        const cellCorrect = createElement({tagName: 'td', textContent: String(item.correct)});
        const cellSkipped = createElement({tagName: 'td', textContent: String(item.skipped)});
        const cellDate = createElement({tagName: 'td', textContent: new Date(item.game_date).toLocaleString()});
        const row = createElement({tagName: 'tr', children: [cellTeamName, cellCorrect, cellSkipped, cellDate]});
        tableBody.append(row);
    });
    
    const textStatistics = createElement({tagName: 'h1', classNames: 'statistics-text', textContent: 'Your statistics'});
    const mainStatistics = createElement({tagName: 'div', classNames: 'statistics', children: [table]});
    const divStatistics = createElement({tagName: 'div', classNames: 'field', children: [textStatistics, mainStatistics]});

    const main = document.querySelector('main');
    main.append(divStatistics);
}


export {
    generateStatistics,
};