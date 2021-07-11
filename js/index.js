import {generateFooter, generateHeader, generateMainContainer} from './main.js';
import {ROUTERS} from "./router";
window.onload = () => {
    const location = window.location.href;
    console.log(location);

    //switch (location) {


    generateHeader();
    generateMainContainer();
    generateFooter();
};