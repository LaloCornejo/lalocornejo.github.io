//                   Autor: LÆLÖ 


/*
### #     # ######  ####### ######  #######  #####  
 #  ##   ## #     # #     # #     #    #    #     # 
 #  # # # # #     # #     # #     #    #    #       
 #  #  #  # ######  #     # ######     #     #####  
 #  #     # #       #     # #   #      #          # 
 #  #     # #       #     # #    #     #    #     # 
### #     # #       ####### #     #    #     #####  
*/


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
const front = document.querySelector('.Front');
const loginPage = document.querySelector('.Login');
const loginButton = document.querySelector(".Login");
const closebx = document.querySelector('.icon-close');
const word = document.querySelector('#word');

loginButton.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});

closebx.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});

word.addEventListener("click", () => {
  front.classList.remove("active-page");
  front.classList.add("innactive-page");
  loginPage.classList.remove("innactive-page");
  loginPage.classList.add("active-page");
  
});


onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginPage.classList.remove("active-page");
    loginPage.classList.add("innactive-page");
    loginCk(user);
  } else {
    //loginPage.classList.remove("innactive-page");
    //loginPage.classList.add("active-page");
    loginCk(user);
  }
});
