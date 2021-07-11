import createElement from "./helper.js";

function generateCrud() {

    const inputDict = createElement({tagName: 'input', classNames: 'dictionaries'});
    const btnDictAdd = createElement({tagName: 'button', classNames: 'add-dictionaries', textContent: '+'});


    const btnAddDictinaries = createElement({})
    const btnDictRemove = createElement({tagName: 'button', classNames: 'dictionaries-remove', textContent: 'Delete'});

    const inputWord = createElement({tagName: 'input', classNames: 'riddle-word'});
    const btnWordAdd = createElement({tagName: 'button', classNames: 'add-word', textContent: '+'});

    document.body.append(inputDict);
    document.body.append(btnDictAdd);
    document.body.append(btnDictRemove);
    document.body.append(inputWord);
    document.body.append(btnWordAdd);
}



export {
    generateCrud,
};