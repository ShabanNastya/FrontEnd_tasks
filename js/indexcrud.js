import {generateCrud} from './crud.js';
import {generateFooter, generateHeader} from './main.js';

window.onload = () => {
    generateHeader();
    generateFooter();

    generateCrud();
};