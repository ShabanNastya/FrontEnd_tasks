import createElement from './helper.js';

function generateStatistics() {
    const textStatistics = createElement({tagName: 'h1', classNames: 'statistics-text', textContent: 'Ваша статистика'});
    const mainStatistics = createElement({tagName: 'main', classNames: 'statistics'});
    const divStatistics = createElement({tagName: 'div', classNames: 'field', children: [textStatistics, mainStatistics]});

    document.body.append(divStatistics);
}


export {
    generateStatistics,
};