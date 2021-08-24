import createElement from './helper.js';
import { MAP_ROUTS, navigateTo, ROUTS } from './router.js';

const PAGES = [
    { title: 'Main', route: '/main' },
    { title: 'Game', route: '/game' },
    { title: 'Dictionary', route: '/dictionary'},
    { title: 'Rules', route: '/rules'},
    { title: 'Statistics', route: '/statistics'},
];

function generateHeader(pathname) {
    const imageLogo = createElement({
        tagName: 'img',
        classNames: 'logo',
        attrs: [
            ['src', 'images/logo.png'],
            ['alt', 'logo'],
        ]
    });
    const title = createElement({tagName: 'h1', classNames: 'heading', textContent: MAP_ROUTS[pathname]});
    const nav = createElement({ tagName: 'nav', classNames: 'navbar mobile-menu'});
    nav.id = 'mobile-menu';
    const ul = createElement({tagName: 'ul', classNames: 'ul-menu' });

    PAGES.forEach((page) => {
        const li = createElement({ tagName: 'li', classNames: 'li-menu-item a-menu', textContent: page.title });

        li.addEventListener('click', () => {
            navigateTo(page.route);
        });

        ul.append(li);
    });
    nav.append(ul);

    const header = createElement({tagName: 'header', classNames: 'header', children: [imageLogo, title, nav]});

    document.body.prepend(header);
}

function generateMainPage() {
    const textSubtitle = createElement({tagName: 'h2'});
    textSubtitle.insertAdjacentHTML('afterbegin', `It's not just a game!<br>It's <span class="home__item">Alias!</span>`);

    const textAds = createElement({tagName: 'p', classNames: 'main-text', textContent: 'Alias is a fun word explanation game that is played in teams of 2 or more people.'});

    const playBtn =  createElement({tagName: 'button', classNames: 'a-game', textContent: 'Let\'s play', attrs:[
        'href', 'teams.html',
    ],});
    
    const mainText = createElement({tagName: 'div', classNames: 'main-text', children: [textSubtitle, textAds, playBtn]});
    const mainContainer = createElement({tagName: 'div', classNames: 'main-container', children: [mainText]});

    mainContainer.insertAdjacentHTML('beforeend',
        `<picture>
            <source media="(min-width: 750px)" srcset="images/logo.png" class="image-alias">
            <source media="(min-width: 550px)" srcset="images/medium-logo.png" class="image-alias">
            <img src="images/small-logo.png" class="image-alias" alt="alias-cards">
        </picture>`
    );

    const main = document.querySelector('main');
    main.append(mainContainer);

    playBtn.addEventListener('click', () => {
        navigateTo(ROUTS.game);
    });
}

function generateFooter() {
    const textCopyright = createElement({tagName: 'h3', classNames: 'text-copyright', textContent: '@ Copyright Shaban Anastasiya'});
    
    const contactUs = createElement({tagName: 'h2', textContent: 'Contact Us'});
    const iGooglePlay = createElement({tagName: 'i', classNames: 'fab fa-google-play'});
    const aGooglePlay = createElement({tagName: 'a', classNames: 'google-play-link', children: [iGooglePlay], attrs: [
        ['href', 'https://play.google.com/store/apps/details?id=com.inetstd.android.alias'],
    ]});
    const iFacebook = createElement({tagName: 'i', classNames: 'fab fa-facebook'});
    const aFacebook = createElement({tagName: 'a', classNames: 'facebook-link', children: [iFacebook], attrs: [
        ['href', 'https://www.facebook.com/Homegameby'],
    ]});
    const iTwitch = createElement({tagName: 'i', classNames: 'fab fa-twitch'});
    const aTwitch = createElement({tagName: 'a', classNames: 'twitch-link', children: [iTwitch], attrs: [
        ['href', 'https://m.twitch.tv/'],
    ]});
    const contacts = createElement({tagName: 'div', classNames: 'contacts', children: [contactUs, aGooglePlay, aFacebook, aTwitch]})
    const footer = createElement({tagName: 'footer', classNames: 'footer', children: [textCopyright, contacts]});
    document.body.append(footer);
}

function generateMainContainer() {
    const main = createElement({ tagName: 'main' });
    document.body.prepend(main);
}

export {
    generateHeader,
    generateMainContainer,
    generateMainPage,
    generateFooter,
};