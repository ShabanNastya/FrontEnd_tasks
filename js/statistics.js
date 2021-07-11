import createElement from "./helper.js";

function generateMainPage() {

    const mainText = createElement({tagName: 'div', classNames: 'mainText'});

    const menu = createElement({tagName: 'nav', classNames: 'navbar mobile-menu'});


}

function generateStatistics() {
    const textStatistics = createElement({tagName: 'h1', classNames: 'statistics-text', textContent: 'Ваша статистика'});
    const mainStatistics = createElement({tagName: 'main', classNames: 'statistics'});
    const divStatistics = createElement({tagName: 'div', classNames: 'field', children: [textStatistics, mainStatistics]});

    document.body.append(divStatistics);
}


export {
    generateStatistics,
};