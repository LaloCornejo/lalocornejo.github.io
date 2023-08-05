//Autor: LÆLÖ 
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

import { auth, db } from './FirebaseConfig.js'
import { loginCk } from "./loginCk.js";

import './Auth.js'
import './logout.js'

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
