//                   Autor: LÆLÖ
//                   Date: 20240302

/*---+---+---+---+---+---+---+---+
 | D | A | R | K | M | O | D | E |
 +---+---+---+---+---+---+---+---*/

import { goBack } from "./History.js";
import { mobileCheck } from "./isMobile.js";

const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.contains("light-theme")
    ? enableDarkMode()
    : enableLightMode();
});

function enableDarkMode() {
  document.body.classList.remove("light-theme");
  document.body.classList.add("dark-theme");
  themeToggle.setAttribute("aria-label", "Switch to light theme");
  window.localStorage.setItem("theme", "dark");
  console.log("dark");
}

function enableLightMode() {
  document.body.classList.remove("dark-theme");
  document.body.classList.add("light-theme");
  themeToggle.setAttribute("aria-label", "Switch to dark theme");
  window.localStorage.setItem("theme", "light");
  console.log("light");
}

function setThemePreference() {
  if (window.localStorage.getItem("theme") == "light") {
    enableLightMode();
    return;
  }
  enableDarkMode();
}
document.onload = setThemePreference();


const loader = document.querySelector(".loader");

const SideBar = document.querySelector(".sideBar");

window.onload = () => {
  setTimeout(() => {
    loader.classList.add("loader-hidden");
    loader.addEventListener("transitionend", () => {
      if (document.body.contains(loader)) {
        document.body.removeChild(loader);
      }
    });
  }, 1000);
};

// -=================== SideBar ===================-
document.addEventListener("mousemove", setCords);

let selected = false;

function setCords(e) {
  if (!mobileCheck()) {
    if ((e.clientX < 50) & (e.clientX > 0) && selected === false) {
      SideBar.classList.remove("sideBarInnactive");
      SideBar.classList.add("sideBarActive");
      selected = true;
    } else if (e.clientX > 500 && selected === true) {
      SideBar.classList.remove("sideBarActive");
      SideBar.classList.add("sideBarInnactive");
      selected = false;
    }
  } else {
    if ((e.clientX < 40) & (e.clientX > 0) && selected === false) {
      SideBar.classList.remove("sideBarInnactive");
      SideBar.classList.add("sideBarActive");
      selected = true;
    } else if (e.clientX > 300 && selected === true) {
      SideBar.classList.remove("sideBarActive");
      SideBar.classList.add("sideBarInnactive");
      selected = false;
    }
  }
}

const back = document.querySelector("#back");

back.addEventListener("click", () => {
  goBack();
});

const version = document.querySelector("#versionTxt");
version.innerHTML = "v2.0.1"