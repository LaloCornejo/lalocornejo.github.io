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
const loginButton = document.querySelector(".Login");
const closebx = document.querySelector('.icon-close');

loginButton.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});

closebx.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});

const login_hide = document.querySelector(".active-page");


onAuthStateChanged(auth, async (user) => {
  if (user) {
    login_hide.classList.remove("active-page");
    login_hide.classList.add("innactive-page");
    loginCk(user);
  } else {
    login_hide.classList.remove("innactive-page");
    login_hide.classList.add("active-page");
    loginCk(user);
  }
});
