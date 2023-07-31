const body = document.querySelector("#page-body");
const animationToggleButton = document.querySelector("#page-animation-toggle");

// Persist animation on/off state to new pages from cookie
const getAnimationState = () => {
  if (document.cookie === "animation=off") {
    body.classList.remove("page__animation--enabled");
    animationToggleButton.innerText = "Enable Animation";
  } else {
    body.classList.add("page__animation--enabled");
    animationToggleButton.innerText = "Disable Animation";
  }
};

window.onload = getAnimationState();

// Toggle animation on/off state
const toggleAnimation = () => {
  body.classList.add("page__animation--transitioning");
  setTimeout(() => {
    body.classList.remove("page__animation--transitioning");
  }, 1600);
  if (body.classList.contains("page__animation--enabled")) {
    document.cookie = "animation=off";
    body.classList.remove("page__animation--enabled");
    animationToggleButton.innerText = "Enable Animation";
  } else {
    document.cookie = "animation=on";
    body.classList.add("page__animation--enabled");
    animationToggleButton.innerText = "Disable Animation";
  }
};
