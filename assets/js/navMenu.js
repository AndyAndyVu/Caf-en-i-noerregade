const navMenuButton = document.querySelector('.menuButton');
const menuContainer = document.querySelector('.menuContainer');

navMenuButton.addEventListener('click', () => {
    menuContainer.classList.toggle('menuContainerActive');
})