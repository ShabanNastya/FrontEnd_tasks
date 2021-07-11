import createElement from "./helper.js";

function generateBoxRightOne() {
    const pRightStep = createElement({tagName: 'p', classNames: 'right-number', textContent: '1'});
    const pRightNumber = createElement({tagName: 'p', classNames: 'right-step', textContent: 'At the first stage, a playing field with a timer and an invitation to start the game will appear.\n' +
            '            The current team needs to choose from among its members who will explain and who will guess the words.\n' +
            '            The explaining player receives a device with a game (mobile, tablet or PC),\n' +
            '            takes a position where other players cannot see the screen and presses the button to start the round'});

    const divBoxRight = createElement({tagName: 'div', classNames: 'box-right', children: [pRightStep, pRightNumber]});
    document.body.append(divBoxRight);
}

function generateBoxLeft() {
    const pLeftStep = createElement({tagName: 'p', classNames: 'left-number', textContent: '2'});
    const pLeftNumber = createElement({tagName: 'p', classNames: 'left-step', textContent: 'The timer will start and the words to be explained will start showing.\n' +
            '            If the word is guessed, the player presses the button, after which the next word will appear.\n' +
            '            If there is a difficulty in explaining a word, you can skip it by pressing the corresponding button, but in this case,\n' +
            '            the team will receive a penalty point'});

    const divBoxLeft = createElement({tagName: 'div', classNames: 'box-left', children: [pLeftStep, pLeftNumber]});
    document.body.append(divBoxLeft);

}

function generateBoxRightThird() {
    const pRightStep = createElement({tagName: 'p', classNames: 'right-number', textContent: '3'});
    const pRightNumber = createElement({tagName: 'p', classNames: 'right-step', textContent: 'On the next screen, a list of words of the current round will appear, which the opposing team must check for errors and confirm the result.\n' +
            '            At this step, you can cancel the guessed word if a mistake was made, or protect the missed one if the player accidentally pressed the wrong button'});

    const divBoxRight = createElement({tagName: 'div', classNames: 'box-right', children: [pRightStep, pRightNumber], attrs: [
        ['style','margin-top: 290px'],
        ]});
    document.body.append(divBoxRight);
}

export {
    generateBoxRightOne,
    generateBoxLeft,
    generateBoxRightThird,
};