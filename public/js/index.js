import {
    generateFooter,
    generateHeader, 
    generateMainContainer
} from './main.js';
import { generateSettings } from './game.js';
import { generateStatistics } from './statistics.js';
import { generateRules } from './rules.js';
import { generateDictionary } from './dictionary.js';
import { ROUTERS } from './router.js';

const navigateTo = url => {
    history.pushState(null, null, url);
};


window.onload = () => {
    const { pathname } = window.location;

    switch (pathname) {
        case ROUTERS.root:
        case ROUTERS.main:
            navigateTo(ROUTERS.main);
            generateMainContainer();
            break;
        case ROUTERS.game: 
            generateSettings();
            navigateTo(ROUTERS.game);
            break;
        case ROUTERS.statistics:
            navigateTo(ROUTERS.statistics);
            generateStatistics();
            break;
        case ROUTERS.rules:
            navigateTo(ROUTERS.statistics);
            generateRules();
            break;
        case ROUTERS.dictionary:
            navigateTo(ROUTERS.statistics);
            generateDictionary();
            break;
    }

    generateHeader(pathname);
    generateFooter();
};