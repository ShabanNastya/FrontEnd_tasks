import {
    generateFooter,
    generateHeader, 
    generateMainContainer,
    generateMainPage,
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

    if (pathname === ROUTERS.root) {
        generateHeader(ROUTERS.main);
    } else {
        generateHeader(pathname);
    }

    generateMainContainer();
    generateFooter();

    switch (pathname) {
        case ROUTERS.root:
        case ROUTERS.main:
            navigateTo(ROUTERS.main);
            generateMainPage();
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
            navigateTo(ROUTERS.rules);
            generateRules();
            break;
        case ROUTERS.dictionary:
            navigateTo(ROUTERS.dictionary);
            generateDictionary();
            break;
    }
};