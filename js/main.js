//                   Autor: LÆLÖ
//                   Date: 20231220

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// import {
//   getDocs,
//   collection,
// } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

import { auth, db } from "./FirebaseConfig.js";
import { loginCk } from "./loginCk.js";

import "./Auth.js";
import "./logout.js";

export function isMobile() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 900
  );
}

const loader = document.querySelector(".loader");

const menu = document.querySelector(".menu");
const nav = document.querySelector(".navapps");
let selected = false;
const navcontainer = document.querySelector(".nav");

const front = document.querySelector(".Front");
const word = document.querySelector("#word");
const wrapper = document.querySelector(".wrapper");

const login = document.querySelector(".Login");
const closebx = document.querySelector(".icon-close");
const logoutButton = document.querySelector(".btnloggout");
const loggedInPage = document.querySelector(".LoggedInPage");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("loader-hidden");
    loader.addEventListener("transitionend", () => {
      if (document.body.contains(loader)) {
        document.body.removeChild(loader);
      }
      login.classList.remove("hidden");
      wrapper.classList.remove("hidden");
    });
  }, 300);
});

navcontainer.addEventListener("mouseenter", (event) => {
  try {
    selected = true;
    menu.classList.remove("menu-no-selected");
    menu.classList.add("menu-selected");
    setTimeout(() => {
      nav.classList.add("active-menu");
      nav.classList.remove("innactive-menu");
      console.log("menuIn");
    }, 75);
  } catch (error) {
    console.log(error);
  }
});

navcontainer.addEventListener("mouseleave", () => {
  try {
    setTimeout(() => {
      nav.classList.add("innactive-menu");
      nav.classList.remove("active-menu");
      console.log("menuOut");
    }, 200);
    setTimeout(() => {
      menu.classList.remove("menu-selected");
      menu.classList.add("menu-no-selected");
      selected = false;
    }, 275);
  } catch (error) {
    console.log(error);
  }
});

// if (isMobile()) {
  // menu.addEventListener("touchstart", () => {
    // if (!selected) {
      // try {
        // menu.classList.remove("menu-no-selected");
        // menu.classList.add("menu-selected");
        // setTimeout(() => {
          // nav.classList.add("active-menu");
          // nav.classList.remove("innactive-menu");
          // console.log("menuIn");
          // selected = true;
        // }, 75);
      // } catch (error) {
        // console.log(error);
      // }
    // } else {
      // try {
        // setTimeout(() => {
          // nav.classList.add("innactive-menu");
          // nav.classList.remove("active-menu");
          // console.log("menuOut");
        // }, 200);
        // setTimeout(() => {
          // menu.classList.remove("menu-selected");
          // menu.classList.add("menu-no-selected");
          // selected = false;
        // }, 275);
      // } catch (error) {
        // console.log(error);
      // }
    // }
  // });
// 
  // window.addEventListener("touchstart", () => {
    // if (selected) {
      // try {
        // setTimeout(() => {
          // nav.classList.add("innactive-menu");
          // nav.classList.remove("active-menu");
          // console.log("menuOut");
        // }, 200);
        // setTimeout(() => {
          // menu.classList.remove("menu-selected");
          // menu.classList.add("menu-no-selected");
          // selected = false;
        // }, 275);
      // } catch (error) {
        // console.log(error);
      // }
    // }
  // });
// }

window.addEventListener("click", () => {
    if (front.classList.contains("active-page") && selected) {
      try {
        setTimeout(() => {
          nav.classList.add("innactive-menu");
          nav.classList.remove("active-menu");
          console.log("menuOut");
        }, 200);
        setTimeout(() => {
          menu.classList.remove("menu-selected");
          menu.classList.add("menu-no-selected");
          selected = false;
        }, 275);
      } catch (error) {
        console.log(error);
      }
    }
});

login.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});

closebx.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});

word.addEventListener("click", () => {
  if (selected) {
    setTimeout(() => {
      front.classList.remove("active-page");
      front.classList.add("innactive-page");
      login.classList.remove("innactive-page");
      login.classList.add("active-page");
    }, 400);
  } else {
    front.classList.remove("active-page");
    front.classList.add("innactive-page");
    login.classList.remove("innactive-page");
    login.classList.add("active-page");
  }
});

function startApp(user) {
  // Your code for the startApp function
}

auth.onAuthStateChanged(async (user) => {
  loginCk(user);
  if (user) {
    startApp(user);
    login.classList.remove("active-page");
    login.classList.add("innactive-page");
    logoutButton.classList.remove("logged-out");
    loggedInPage.classList.remove("logged-out");
  }
});