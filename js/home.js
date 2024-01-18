import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { auth, db } from "./FirebaseConfig.js";
import { loginCk } from "./loginCk.js";

import "./Auth.js";
import "./logout.js";

const front = document.querySelector(".Front");
const word = document.querySelector("#word");
const wrapper = document.querySelector(".wrapper");

const login = document.querySelector(".Login");
const closebx = document.querySelector(".icon-close");
const logoutButton = document.querySelector(".btnloggout");
const loggedInPage = document.querySelector(".LoggedInPage");


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