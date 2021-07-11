import {generateBoxRightOne, generateBoxLeft, generateBoxRightThird} from './rules.js';
import {generateFooter, generateHeader} from './main.js';

window.onload = () => {
    generateHeader();
    generateFooter();

    generateBoxRightOne();
    generateBoxLeft();
    generateBoxRightThird();
};