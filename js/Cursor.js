// Used in: index.html

const cursor = document.querySelector(".cursor");

import { mobileCheck } from "./isMobile.js";

if (!mobileCheck()) {
  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;

  let speed = 0.25;

  function animate() {
    let distX = mouseX - cursorX;
    let distY = mouseY - cursorY;

    cursorX = cursorX + distX * speed;
    cursorY = cursorY + distY * speed;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener("mousemove", (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;
  });

  const MainContainer = document.querySelector(".MainContainer");
  if (MainContainer) {
    MainContainer.addEventListener("mouseover", () => {
      const cursor = document.querySelector(".cursor");
      cursor.classList.add("hidden-cursor");
    });
    MainContainer.addEventListener("mouseleave", () => {
      const cursor = document.querySelector(".cursor");
      cursor.classList.remove("hidden-cursor");
    });
  }
} else {
  cursor.style.display = "none";
}
