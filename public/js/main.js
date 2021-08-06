import createElement from './helper.js';
import { MAP_ROUTERS } from './router.js';

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
    const title = createElement({tagName: 'h1', classNames: 'heading', textContent: MAP_ROUTERS[pathname]});
    const nav = createElement({ tagName: 'nav', classNames: 'navbar mobile-menu'});
    nav.id = 'mobile-menu';
    const ul = createElement({tagName: 'ul', classNames: 'ul-menu' });

    PAGES.forEach((page) => {
        const link = createElement({tagName: 'a', classNames: 'a-menu', textContent: page.title, attrs: [
            ['href', page.route],
            ]});
        const li = createElement({ tagName: 'li', classNames: 'li-menu-item', children: [link]});

        ul.append(li);
    });


    // header.append(imageLogo);
    // header.append(title);
    // header.append(nav);

    nav.append(ul);

    const header = createElement({tagName: 'header', classNames: 'header', children: [imageLogo, title, nav]});

    document.body.prepend(header);
}

function generateMainContainer(){
    //br????????
    console.log(window.location.href);
    const textSubtitle = createElement({tagName: 'h2'});
    textSubtitle.insertAdjacentHTML('afterbegin', `It's not just a game!<br>It's <span class="home__item">Alias!</span>`);

   // const spanAlias = createElement({tagName: 'span', classNames: 'home__item', textContent: 'It\'s Alias'});
    const textAds = createElement({tagName: 'p', classNames: 'main-text', textContent: 'Alias is a fun word explanation game that is played in teams of 2 or more people.'});
    //const aGame = createElement({tagName: 'a', classNames: 'a-game', attrs: 'teams.html'});
    const playBtn =  createElement({tagName: 'button', classNames: 'a-game', textContent: 'Let\'s play'});

    const mainText = createElement({tagName: 'div', classNames: 'main-text', children: [textSubtitle, textAds, playBtn]});
    //picture????
    const mainImage = createElement({
        tagName: 'img',
        classNames: 'image-alias',
        attrs:[
            ['alt', 'alias-cards'],
            ['src','images/small-logo.png'],
        ]});

    const mainContainer = createElement({tagName: 'div', classNames: 'main-container', children: [mainText, mainImage]});

    document.body.append(mainContainer);
}

function generateFooter() {
    const textCopyright = createElement({tagName: 'h3', textContent: '@ Copyright Шабан Анастасия'});
    const contactUs = createElement({tagName: 'h2', textContent: 'Contact Us'});

    //?????btn a
    const btnGooglePlay = createElement({tagName: 'a', classNames: 'btn-google-play', attrs:[
        ['href','https://play.google.com/store/apps/details?id=com.inetstd.android.alias'],
        ]});
    console.log(btnGooglePlay);

    //const contacts = createElement({tagName: 'h2', textContent: 'Contact Us'});
    const footer = createElement({tagName: 'footer', classNames: 'footer', children: [textCopyright,btnGooglePlay]});

    //document.body.append(btnGooglePlay);
    document.body.append(footer);
}

export {
    generateHeader,

    generateMainContainer,
    generateFooter,
};

console.log('prepared');
