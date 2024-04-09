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

  const setCloneAnimation = (animationName) => {
    const cloneOuter = container.querySelector('.clone-outer');
    const cloneMiddle = container.querySelector('.clone-middle');

    // Setting the custom property
    cloneOuter.style.setProperty('--animation-name', animationName);
    cloneMiddle.style.setProperty('--animation-name', animationName);

    if (animationName === 'none') {
      // Remove class if animation should be stopped/reset
      cloneOuter.classList.remove('is-animating');
      cloneMiddle.classList.remove('is-animating');
    } else {
      // Add class to start animation
      cloneOuter.classList.add('is-animating');
      cloneMiddle.classList.add('is-animating');
    }
  };

  const handleHeroAnimationClick = () => {
    if (!isAnimating && animationStep === 0) {
      container.classList.remove(animationClassB);
      container.classList.add(animationClassA);
      isAnimating = true;
      animationStep = 1;
      setCloneAnimation("none");

      console.log("step 0 -> 1 | isAnimating", isAnimating);

    } else if (!isAnimating && animationStep === 1) {
      container.classList.add(animationClassB);
      isAnimating = true;
      animationStep = 0;

      console.log("step 1 -> 0 | isAnimating", isAnimating);
    }
  };

  const handleInitialAnimationEnd = (event) => {
    if (event.animationName === "outerRingUp") {
      container.classList.remove(animationClassA);
      container.classList.add(ringChangeClass);
      setCloneAnimation("outerRingReverse");
      isAnimating = false;
      console.log("initial animationend | step:", animationStep);
    }
  };

  const handleSecondaryAnimationEnd = (event) => {
    if (event.animationName === "fadeIn") {
      container.classList.remove(animationClassB);
      container.classList.remove(ringChangeClass);
      isAnimating = false;
      animationStep = 0;

      console.log("____animation step 2 complete_____");
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