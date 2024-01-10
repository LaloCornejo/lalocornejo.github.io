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

const SideBar = document.querySelector(".sideBar");

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

// -=================== SideBar ===================-
document.addEventListener("mousemove", setCords);

let selected = false;

function setCords(e) {
  if(!isMobile) {
    if( e.clientX < 40 & e.clientX > 0 && selected === false) {
      SideBar.classList.remove("sideBarInnactive");
      SideBar.classList.add("sideBarActive");
      selected = true;
    }else if (e.clientX > 400 && selected === true) {
      SideBar.classList.remove("sideBarActive");
      SideBar.classList.add("sideBarInnactive");
      selected = false;
    }
  }else {
    if( e.clientX < 40 & e.clientX > 0 && selected === false) {
      SideBar.classList.remove("sideBarInnactive");
      SideBar.classList.add("sideBarActive");
      selected = true;
  }else if (e.clientX > 300 && selected === true) {
      SideBar.classList.remove("sideBarActive");
      SideBar.classList.add("sideBarInnactive");
      selected = false;
    }
  }
}

// -=================== Clock ===================-

let time = document.querySelector("#current-time");

setInterval(() => {
  let d = new Date();
  time.innerHTML = d.toLocaleTimeString( "en-US", { hour: 'numeric', minute: 'numeric', hour12: true });
})

// -=================== Login ===================-

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