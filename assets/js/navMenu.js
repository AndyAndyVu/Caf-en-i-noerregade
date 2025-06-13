const navMenuButton = document.querySelector(".menuButton");
const menuContainer = document.querySelector(".menuContainer");
const menuBlur = document.querySelector(".menuOnActiveBlur");
const menuButtons = document.querySelector(".menu-toggle");

navMenuButton.addEventListener("click", () => {
  menuContainer.classList.toggle("menuContainerActive");
  menuBlur.classList.toggle("blurActive");
  menuButtons.classList.toggle("menu-toggleZIndex");
});
  