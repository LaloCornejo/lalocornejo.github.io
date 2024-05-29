// Used in: index.html

console.log("Cursor.js loaded");

const cursor = document.querySelector(".cursor");

import { mobileCheck } from "./isMobile.js";

if (!mobileCheck()) {
  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;

  let speed = .7;

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
        cursor.style.scale = "1.25";
      });
      item.addEventListener("mouseout", () => {
        cursor.style.scale = "1";
      });
    });
  }
} else {
  cursor.style.display = "none";
}
