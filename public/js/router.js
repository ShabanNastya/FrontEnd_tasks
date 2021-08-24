import {
    generateFooter,
    generateHeader, 
    generateMainContainer,
    generateMainPage,
} from './main.js';
import { generateSettings } from './settings.js';
import { generateStatistics } from './statistics.js';
import { generateRules } from './rules.js';
import { generateDictionary } from './dictionary.js';

export const ROUTS = {
    main: '/main',
    game: '/game',
    dictionary: '/dictionary',
    rules: '/rules',
    statistics: '/statistics',
    root: '/',
};

export const MAP_ROUTS = {
    [ROUTS.main]: 'Main page',
    [ROUTS.game]: 'Game page',
    [ROUTS.dictionary]: 'Dictionary page',
    [ROUTS.rules]: 'Rules page',
    [ROUTS.statistics]: 'Statistics page',
};

export const navigateTo = url => {
    history.pushState(null, null, url);

    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');

    if (!footer) {
        generateFooter();
    }

    if (main) {
        main.remove();
    }

    history.pushState(null, null, url);

    generateMainContainer();

    if (header) {
        header.remove();
    }

    generateHeader(url);

    switch (url) {
        case ROUTS.root:
        case ROUTS.main:
            console.log(url);
            generateMainPage();
            break;
        case ROUTS.game: 
            generateSettings();
            break;
        case ROUTS.statistics:
            generateStatistics();
            break;
        case ROUTS.rules:
            generateRules();
            break;
        case ROUTS.dictionary:
            generateDictionary();
            break;
    }
};
