(function () {
    const menuButton = document.getElementById('menu-button'),
        nav = document.getElementById('mobile-menu')

    let isOpen = false

    menuButton.addEventListener('click', () =>{
        if (isOpen) {
            nav.classList.remove('show-menu')
        } else {
            nav.classList.add('show-menu')
        }
        isOpen = !isOpen
    });
})()
