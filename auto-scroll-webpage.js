(function (window, document) {
  let isScrolling, scrollInterval;
  let scrollSpeed = 5;
  let scrollDistance = document.body.scrollHeight;
  let scrollDelay = 1;

  const renderPrompt = function (error) {
    let promptContent =
      "Enter delay (in seconds), distance to scroll (in pixels) and the scroll scrollSpeed (in seconds).\n\nRun the script a second time with options 0 0 0 to reset the page.\n\nExample:\n\n1 800 5 or 1 50% 5";
    if (error) {
      promptContent = error + "\n\n" + promptContent;
    }
    let promptResponse = prompt(promptContent);
    if (promptResponse === null) {
      return;
    }
    if (promptResponse === "") {
      start([scrollDelay, scrollDistance, scrollSpeed]);
      return;
    }
    if (/\d{1,} \d{1,}%* \d{1,}/.test(promptResponse)) {
      start(promptResponse.split(" "));
      return;
    }
    return renderPrompt("Whoops. Input invalid: " + promptResponse);
  };

  function start(settings) {
    window.addEventListener("keydown", keyPressed);
    window.addEventListener("keyup", keyReleased, false);
    if (settings) {
      [scrollDelay, scrollDistance, scrollSpeed] = settings;
    }
    setTimeout(autoScroll, scrollDelay * 1000, scrollDistance.includes("%") ? scrollDistance.slice(0, -1) * 0.01 * (document.body.scrollHeight - window.innerHeight) : scrollDistance, scrollSpeed);
  }

  function autoScroll(scrollDistance, scrollSpeed) {
    let fps = 60;
    let startPosition = 0;
    let time = 0;
    let position = 0;
    let iterations = fps * scrollSpeed;
    let distance = scrollDistance - startPosition; // total distance
    let timeIncrement = scrollSpeed / iterations;

    function move() {
      time += timeIncrement;
      position = easeInOutQuad(time, startPosition, distance, scrollSpeed);
      if (position >= scrollDistance) {
        clearInterval(scrollInterval);
        window.scrollTo(0, scrollDistance);
        return;
      }
      window.scrollTo({ top: Math.round(position), left: 0, behavior: "instant" });
    }

    scrollInterval = setInterval(move, 1000 / fps);

    isScrolling = true;
  }

  function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return (c / 2) * t * t + b;
    } else {
      return (-c / 2) * (--t * (t - 2) - 1) + b;
    }
  }

  const keysPressed = [];
  function keyPressed(event) {
    keysPressed[event.keyCode] = true;
    const escKey = keysPressed[27];
    if (escKey) {
      if (isScrolling) {
        turnOff();
      } else {
        autoScroll();
      }
    }
  }
  function keyReleased(event) {
    delete keysPressed[event.keyCode];
  }
  function turnOff() {
    clearInterval(scrollInterval);
    isScrolling = false;
  }

  renderPrompt();
})(window, document);
