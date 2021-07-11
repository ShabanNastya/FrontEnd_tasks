import {generateStatistics} from './statistics.js';
import {generateFooter, generateHeader} from './main.js';

window.onload = () => {
    generateHeader();
    generateFooter();

    generateStatistics();
};