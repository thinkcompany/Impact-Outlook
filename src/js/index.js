import { executeWhenReady, modalFocusTrap } from "./_utils.js";

const ioHome = () => {
  const container = document.querySelector(".io-hero");
  const animationClass = "io-is-animating";

  const handleHeroAnimation = () => {
    container.classList.toggle(animationClass);
  };

  container.addEventListener("click", handleHeroAnimation);
};


executeWhenReady(() => {
  ioHome();
});