import {generateSectionTeams, generateSectionRound, generateSectionTime, generateSectionDictionaries} from './teams.js';
import {generateFooter, generateHeader} from './main.js';

window.onload = () => {
    generateHeader();
    generateFooter();

    generateSectionTeams();
    generateSectionRound();
    generateSectionTime();
    generateSectionDictionaries();
};