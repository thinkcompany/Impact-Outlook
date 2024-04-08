import { executeWhenReady, modalFocusTrap } from "./_utils.js";

const ioHome = () => {
  const container = document.querySelector(".io-hero");
  const outerRing = container.querySelector(".ring-outer");
  const centerIcon = container.querySelector(".center-group");
  const animationClassA = "io-is-animating-a";
  const animationClassB = "io-is-animating-b";
  const ringChangeClass = "io-ring-change";
  let isAnimating = false;
  let animationStep = 0;

  const handleHeroAnimationClick = () => {
    console.log("animationStep", animationStep);
    console.log("isAnimating", isAnimating);
    if (!isAnimating && animationStep === 0) {
      isAnimating = true;
      container.classList.remove(animationClassB);
      container.classList.add(animationClassA);
      animationStep = 1;

    } else if (!isAnimating && animationStep === 1) {
      isAnimating = true;
      container.classList.add(animationClassB);
      animationStep = 0;
    }
  };

  const handleInitialAnimationEnd = (event) => {
    console.log("event.animationName", event.animationName);
    if (event.animationName === "outerRingUp") {
      container.classList.remove(animationClassA);
      container.classList.add(ringChangeClass);
      isAnimating = false;
    }
  };

  const handleSecondaryAnimationEnd = (event) => {
    if (event.animationName === "fadeIn") {
      console.log("end fadeIn");
      isAnimating = false;
      animationStep = 0;
      container.classList.remove(animationClassB);
      container.classList.remove(ringChangeClass);
    }
  };

  container.addEventListener("click", handleHeroAnimationClick);
  outerRing.addEventListener("animationend", (event) => {
    handleInitialAnimationEnd(event);
  });

  centerIcon.addEventListener("animationend", (event) => {
    handleSecondaryAnimationEnd(event);
  });

};


executeWhenReady(() => {
  ioHome();
});