import { executeWhenReady, modalFocusTrap } from "./_utils.js";

const ioHome = () => {
  const container = document.querySelector(".io-hero");
  const outerRing = container.querySelector(".ring-outer");
  const animationClassA = "io-is-animating-a";
  const animationClassB = "io-is-animating-b";
  let isAnimating = false;
  let animationStep = 0;

  const handleHeroAnimationClick = () => {
    if (!isAnimating && animationStep === 0) {
      isAnimating = true;
      container.classList.add(animationClassA);
      animationStep = 1;
    } else if (!isAnimating && animationStep === 1) {
      isAnimating = true;
      container.classList.add(animationClassB);
      animationStep = 0;
    }
  };

  const handleAnimationEnd = (event) => {
    if (event.animationName === "ringUp") {
      console.log("animationend");
      container.classList.remove(animationClassA);
      isAnimating = false;

    } else if (event.animationName === "ringUpBack") {
      container.classList.remove(animationClassB);
      isAnimating = false;
    }
  };

  container.addEventListener("click", handleHeroAnimationClick);
  outerRing.addEventListener("animationend", (event) => {
    handleAnimationEnd(event);
  });

};


executeWhenReady(() => {
  ioHome();
});