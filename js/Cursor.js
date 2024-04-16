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


  const Hover = document.querySelectorAll(".Hover");
  if (Hover) {
    Hover.forEach((item) => {
      item.addEventListener("mouseover", () => {
        cursor.style.scale = "1.2";
      });
      item.addEventListener("mouseout", () => {
        cursor.style.scale = "1";
      });
    });
  }
} else {
  cursor.style.display = "none";
}
