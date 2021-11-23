(function () {
  const _ = (window.ImmersiveAnimation = () => ({
    entities: [
      [
        {
          forwardStartTime: 0,
          forwardEndTime: 4000,
          backwardStartTime: 0,
          backwardEndTime: 4000,
          endWidth: 50,
          startWidth: 100,
          element: document.querySelector("#circleId"),
          step: (isForward, progress, { element, endWidth, startWidth }) => {
            if (isForward) {
              // larger to smaller
              const distance = startWidth - progress * (startWidth - endWidth);
              element.style.width = `${distance}px`;
              element.style.height = `${distance}px`;
            } else {
              // smaller to larger
              const distance = endWidth + progress * (startWidth - endWidth);
              element.style.width = `${distance}px`;
              element.style.height = `${distance}px`;
            }
          },
        },
        {
          forwardStartTime: 1000,
          forwardEndTime: 4000,
          backwardStartTime: 0,
          backwardEndTime: 2000,
          endOpacity: 1,
          startOpacity: 0,
          endY: 100,
          startY: 0,
          element: document.querySelector("#panel0"),
          step: (
            isForward,
            progress,
            { element, startOpacity, endOpacity, startY, endY }
          ) => {
            if (isForward) {
              // fade in, scroll up
              // const opacity = startOpacity + (progress * (endOpacity - startOpacity))
              const opacity =
                startOpacity + progress * (endOpacity - startOpacity);
              const bottom = startY + progress * (endY - startY);
              element.style.opacity = `${opacity}`;
              element.style.bottom = `${bottom}px`;
            } else {
              // fade out, scroll down
              const opacity =
                endOpacity - progress * (endOpacity - startOpacity);
              const bottom = endY - progress * (endY - startY);
              element.style.opacity = `${opacity}`;
              element.style.bottom = `${bottom}px`;
            }
          },
        },
      ],
    ],
    curstage: 0,
    curdirection: "forward",
    totalTime: 4000,
  }));
})();

const immersiveAnimation = ImmersiveAnimation();

function runAnimation(isForward, immersiveAnimation) {
  const startTime = new Date().getTime();

  const step = () => {
    const curTime = new Date().getTime();
    const timeElapsed = curTime - startTime;
    const progress = timeElapsed / immersiveAnimation.totalTime;
    immersiveAnimation.entities[immersiveAnimation.curstage].forEach(
      (entity) => {
        // if (
        //   isForward &&
        //   (entity.forwardStartTime > timeElapsed ||
        //     entity.forwardEndTime < timeElapsed)
        // )
        //   return;
        // else if (
        //   !isForward &&
        //   (entity.backwardStartTime > timeElapsed ||
        //     entity.backwardEndTime < timeElapsed)
        // )
        //   return;
        const entityProgress =
          progress * timeElapsed /
          (isForward
            ? entity.forwardEndTime - entity.forwardStartTime
            : entity.backwardEndTime - entity.backwardStartTime);
        entity.step(isForward, progress, entity);
        // entity.step(isForward, entityProgress, entity);
      }
    );
    if (progress >= 1) {
      immersiveAnimation.curstage = isForward
        ? immersiveAnimation.curstage++
        : immersiveAnimation.curstage--;
      return;
    }
    requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
}

window.addEventListener("keypress", (event) => {
  console.log("keypressing listening");
  if (event.key === "k") {
    // forward
    // if(immersiveAnimation.curstage === immersiveAnimation.entities.length) return
    runAnimation(true, immersiveAnimation);
  } else if (event.key === "j") {
    // backward
    // if(immersiveAnimation.curstage === 0) return
    runAnimation(false, immersiveAnimation);
  }
});
