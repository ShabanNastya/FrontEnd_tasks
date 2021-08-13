import createElement from "./helper.js";

function generateDictionary() {

    const inputDict = createElement({tagName: 'input', classNames: 'new-word', attrs: [
        ['placeholder','Name of the new dictionary'],
    ]});
    const btnDictAdd = createElement({tagName: 'button', classNames: 'add-dictionaries', textContent: '+'});


    const optionDictionaries = createElement({tagName: 'option', textContent: 'Select a dictionary', attrs: [
        ['value','Select a dictionary'],
    ]});
    const selectDictionaries = createElement({tagName: 'select', classNames: 'dictionaries-select', children: [optionDictionaries]});

    const btnDictRemove = createElement({tagName: 'button', classNames: 'dictionaries-remove', textContent: 'Remove'});

    const inputWord = createElement({tagName: 'input', classNames: 'riddle-word', attrs:[
        ['placeholder','New word'],
    ]});
    const btnWordAdd = createElement({tagName: 'button', classNames: 'add-word', textContent: '+'});


    const addDictionaries = createElement({tagName: 'div', classNames: 'position', children:[inputDict, btnDictAdd]});
    const chooseDictionaries = createElement({tagName: 'div', classNames: 'position', children:[selectDictionaries, btnDictRemove]});
    const addWordDictionaries = createElement({tagName: 'div', classNames: 'position', children:[inputWord,btnWordAdd]});
    const divDictContainer = createElement({tagName: 'div', classNames: 'crud-container', children:[addDictionaries, chooseDictionaries, addWordDictionaries]});
    const mainListDictionaries = createElement({tagName: 'div', classNames: 'list'});

    const main = document.querySelector('main');
    main.append(divDictContainer);
}

export {
    generateDictionary,
};