import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

import { auth, db } from './Firebase.js'
import { loginCk } from "./loginCk.js";

/*
######                          #     #                      
#     #   ##   #####  #    #    ##   ##  ####  #####  ###### 
#     #  #  #  #    # #   #     # # # # #    # #    # #      
#     # #    # #    # ####      #  #  # #    # #    # #####  
#     # ###### #####  #  #      #     # #    # #    # #      
#     # #    # #   #  #   #     #     # #    # #    # #      
######  #    # #    # #    #    #     #  ####  #####  ###### 
*/

const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("click", () => { document.body.classList.contains("light-theme") ? enableDarkMode() : enableLightMode(); });

function enableDarkMode() {
  document.body.classList.remove("light-theme");
  document.body.classList.add("dark-theme");
  themeToggle.setAttribute("aria-label", "Switch to light theme");
  window.localStorage.setItem("theme", "dark");
  console.log('dark');
}

function enableLightMode() {
  document.body.classList.remove("dark-theme");
  document.body.classList.add("light-theme");
  themeToggle.setAttribute("aria-label", "Switch to dark theme");
  window.localStorage.setItem("theme", "light");
  console.log('light');
}

function setThemePreference() {
  if (window.localStorage.getItem("theme") == "dark") {
    enableDarkMode();
    return;
  }
  enableLightMode();
}
document.onload = setThemePreference();


//--------------------------------------------------------------------------------------------------------



/*
#       #######  #####  ### #     # 
#       #     # #     #  #  ##    # 
#       #     # #        #  # #   # 
#       #     # #  ####  #  #  #  # 
#       #     # #     #  #  #   # # 
#       #     # #     #  #  #    ## 
####### #######  #####  ### #     # 
*/

const wrapper = document.querySelector('.wrapper');
const loginButton = document.querySelector(".Login");
const closebx = document.querySelector('.icon-close');
const navtab = document.querySelector('.navtab');

loginButton.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
  console.log("login");
});

closebx.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
  console.log("close");
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginCk(user);
  } else {
    loginCk(user);
  }
});
