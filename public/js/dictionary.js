import createElement from './helper.js';
import Storage from './storage.js';

function generateDictionaryContainer() {
    const inputDict = createElement({tagName: 'input', classNames: 'new-dictionary', attrs: [
        ['placeholder','New dictionary'],
    ]});
    const btnDictAdd = createElement({tagName: 'button', classNames: 'add-dictionaries', textContent: '+'});
    const btnRemove = createElement({tagName: 'button', classNames: 'dictionaries-remove', textContent: 'Remove'});

    const addDictionaries = createElement({tagName: 'div', classNames: 'position', children:[inputDict, btnDictAdd]});
    const chooseDictionaries = createElement({tagName: 'div', classNames: 'select-container position', children: [btnRemove]});
  
    const divDictContainer = createElement({tagName: 'div', classNames: 'crud-container', children:[addDictionaries, chooseDictionaries]});

    const main = document.querySelector('main');
    main.append(divDictContainer);
}

async function generateSelectContainer() {
    const selectContainer = document.querySelector('.select-container');
    
    const optionDictionaries = createElement({tagName: 'option', textContent: 'Select a dictionary', attrs: [
        ['value','Select a dictionary'],
    ]});
    const select = createElement({tagName: 'select', classNames: 'dictionaries-select', children: [optionDictionaries]});

    const listDictionaries = await Storage.getDictionaries();
    listDictionaries.forEach(dictionary => {
        const option = createElement({tagName: 'option', textContent: dictionary.name, attrs: [
            ['value', dictionary.id],
        ]});

        select.append(option);
    });

    selectContainer.prepend(select);

    addSelectListener();
}

function addSelectListener() {
    const select = document.querySelector('select');

    select.addEventListener('change', async (event) => {
        const { value } = event.target;

        const wordsContainerElement = document.querySelector('.words-container');

        if (wordsContainerElement) {
            wordsContainerElement.remove();
        }

        if (value !== 'Select a dictionary') { 
            const dictionary = await Storage.getDictionaryById(value);
            const crudContainer = document.querySelector('.crud-container');

            const inputWord = createElement({tagName: 'input', classNames: 'new-word', attrs:[
                ['placeholder','New word'],
            ]});
            const btnWordAdd = createElement({tagName: 'button', classNames: 'add-word', textContent: '+'});
            const addWordDictionaries = createElement({tagName: 'div', classNames: 'position', children: [inputWord, btnWordAdd]});
            const removeInput = createElement({tagName: 'input', classNames: 'list-words', attrs: [
                ['list', 'words-list'],
            ]});
            const datalist = createElement({tagName: 'datalist'});
            datalist.id = 'words-list';
            const btnRemoveWord = createElement({tagName: 'button', classNames: 'word-remove', textContent: 'Remove'});
            const words = createElement({tagName: 'div', classNames: 'remove-words position', children: [removeInput, datalist, btnRemoveWord]});
            const wordsContainer = createElement({tagName: 'div', classNames: 'words-container', children: [addWordDictionaries, words]});
            crudContainer.append(wordsContainer);

            dictionary.words.forEach((word) => {
                const option = createElement({tagName: 'option', textContent: word, attrs: [
                    ['value', word],
                ]});
        
                datalist.append(option);
            });

            addNewWordListener();
            removeWordBtnListener();
        }
    });

}

function removeBtnListener() {
    const removeBtn = document.querySelector('.dictionaries-remove');
    
    removeBtn.addEventListener('click', async () => {
        const select = document.querySelector('select');
        const removedValue = select.options[select.selectedIndex].value;
        
        if (removedValue !== 'Select a dictionary') {
            await Storage.removeDictionary(removedValue);
            select.remove();
            generateSelectContainer();

            const wordsContainerElement = document.querySelector('.words-container');

            if (wordsContainerElement) {
                wordsContainerElement.remove();
            }
        }
    });
}

function addNewWordListener() {
    const addWordBtn = document.querySelector('.add-word');

    addWordBtn.addEventListener('click', async () => {
        const select = document.querySelector('select');
        const dictionaryId = select.options[select.selectedIndex].value;
        const newWordInput = document.querySelector('.new-word');
        const newWord = newWordInput.value;
        
        if (newWord) {
            const { words } = await Storage.getDictionaryById(dictionaryId);

            const inputRemove = document.querySelector('.list-words');
            inputRemove.value = '';
            
            const datalist = document.querySelector('datalist');
            const option = createElement({tagName: 'option', textContent: newWord, attrs: [
                ['value', newWord],
            ]});
            datalist.append(option);


            await Storage.updateWords(dictionaryId, [...words, newWord]);

            newWordInput.value = '';
        }
    });
}

function removeWordBtnListener() {
    const removeBtn = document.querySelector('.word-remove');

    removeBtn.addEventListener('click', async () => {
        const select = document.querySelector('select');
        const dictionaryId = select.options[select.selectedIndex].value;
        const inputRemove = document.querySelector('.list-words');
        const removedValue = inputRemove.value;
        
        if (removedValue) {
            const { words } = await Storage.getDictionaryById(dictionaryId);
            const removedInd = words.findIndex((word) => word === removedValue);
            
            if (removedInd !== -1) {
                words.splice(removedInd, 1);

                const outdatedDatalist = document.querySelector('datalist');
                outdatedDatalist.remove();
    
                const datalist = createElement({tagName: 'datalist'});
                datalist.id = 'words-list';
                inputRemove.insertAdjacentElement('afterEnd', datalist);
    
                words.forEach((word) => {
                    const option = createElement({tagName: 'option', textContent: word, attrs: [
                        ['value', word],
                    ]});
            
                    datalist.append(option);
                });
    
                await Storage.updateWords(dictionaryId, words);
    
                inputRemove.value = '';
            }         
        }
    });
}

function addDictionaryBtnListener() {
    const addBtn = document.querySelector('.add-dictionaries');

    addBtn.addEventListener('click', async () => {
        const select = document.querySelector('select');
        const addInput = document.querySelector('.new-dictionary');
        const newValue = addInput.value;

        if (newValue) {
            await Storage.addDictionary(newValue);
            addInput.value = '';

            select.remove();
            generateSelectContainer();

            const wordsContainerElement = document.querySelector('.words-container');

            if (wordsContainerElement) {
                wordsContainerElement.remove();
            }
        }
    });
}


async function generateDictionary() {
    generateDictionaryContainer();

    await generateSelectContainer();

    removeBtnListener();
    addDictionaryBtnListener();
}

export {
    generateDictionary,
};