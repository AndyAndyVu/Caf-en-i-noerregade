const navMenuButton = document.querySelector(".menuButton");
const menuContainer = document.querySelector(".menuContainer");
const menuBlur = document.querySelector(".menuOnActiveBlur");

navMenuButton.addEventListener("click", () => {
  menuContainer.classList.toggle("menuContainerActive");
  menuBlur.classList.toggle("blurActive");
});
