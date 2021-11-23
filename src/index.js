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
          element: document.querySelector('#circleId'),
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
          element: document.querySelector('#panel0'),
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
      [
        {
          forwardStartTime: 1000,
          forwardEndTime: 4000,
          backwardStartTime: 0,
          backwardEndTime: 2000,
          endOpacity: 0,
          startOpacity: 1,
          endY: 200,
          startY: 100,
          element: document.querySelector('#panel0'),
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
        {
          forwardStartTime: 1000,
          forwardEndTime: 4000,
          backwardStartTime: 0,
          backwardEndTime: 2000,
          endOpacity: 1,
          startOpacity: 0,
          endY: 100,
          startY: 0,
          element: document.querySelector('#panel1'),
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
      [
        {
          forwardStartTime: 1000,
          forwardEndTime: 4000,
          backwardStartTime: 0,
          backwardEndTime: 2000,
          endOpacity: 0,
          startOpacity: 1,
          endY: 200,
          startY: 100,
          element: document.querySelector('#panel1'),
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
    cursubstage: 'start',
    totalTime: 4000,
    isAnimating: null,
    userSkips: null,
  }));
})();

const immersiveAnimation = ImmersiveAnimation();

function runAnimation(isForward, immersiveAnimation) {
  const startTime = new Date().getTime();

  const step = () => {
    const curTime = new Date().getTime();
    const timeElapsed = curTime - startTime;
    let progress = timeElapsed / immersiveAnimation.totalTime;
    if (immersiveAnimation.userSkips !== null) {
      if (isForward) {
        progress = 0;
        if (immersiveAnimation.userSkips === 'forward') progress = 1;
      } else {
        // backward
        progress = 0;
        if (immersiveAnimation.userSkips === 'backward') progress = 1;
      }
    }
    immersiveAnimation.entities[immersiveAnimation.curstage].forEach(
      (entity) => {
        entity.step(isForward, progress, entity);
      }
    );
    if (progress >= 1 || immersiveAnimation.userSkips !== null) {
      immersiveAnimation.userSkips = null;
      immersiveAnimation.isAnimating = false;
      if (isForward) {
        immersiveAnimation.cursubstage = 'end';
      } else {
        immersiveAnimation.cursubstage = 'start';
      }
      return;
    }
    requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
}

window.addEventListener('keypress', (event) => {
  if (event.key === 'k') {
    if (immersiveAnimation.isAnimating) {
      immersiveAnimation.userSkips = 'forward';
      return;
    }
    // forward
    if (immersiveAnimation.cursubstage === 'end') {
      if (
        immersiveAnimation.curstage ===
        immersiveAnimation.entities.length - 1
      )
        return;
      immersiveAnimation.curstage++;
      immersiveAnimation.cursubstage = 'start';
    }
    immersiveAnimation.isAnimating = true;
    runAnimation(true, immersiveAnimation);
  } else if (event.key === 'j') {
    if (immersiveAnimation.isAnimating) {
      immersiveAnimation.userSkips = 'backward';
      return;
    }
    // backward
    if (immersiveAnimation.cursubstage === 'start') {
      if (immersiveAnimation.curstage === 0) return;
      immersiveAnimation.curstage--;
      immersiveAnimation.cursubstage = 'end';
    }
    immersiveAnimation.isAnimating = true;
    runAnimation(false, immersiveAnimation);
  }
});
