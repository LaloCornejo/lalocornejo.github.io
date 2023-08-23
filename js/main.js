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
#    #   ##   #####  #   ##   #####  #      ######  ####  
#    #  #  #  #    # #  #  #  #    # #      #      #      
#    # #    # #    # # #    # #####  #      #####   ####  
#    # ###### #####  # ###### #    # #      #           # 
 #  #  #    # #   #  # #    # #    # #      #      #    # 
  ##   #    # #    # # #    # #####  ###### ######  ####  
*/

const wrapper = document.querySelector('.wrapper');
const front = document.querySelector('.Front');
const loginPage = document.querySelector('.Login');
const logoutButton = document.querySelector(".logoubttn");
const closebx = document.querySelector('.icon-close');
const loader = document.querySelector('.loader');
const hidden = document.querySelectorAll('.hidden');


/*
 ####  #    #    #       ####    ##   #####  
#    # ##   #    #      #    #  #  #  #    # 
#    # # #  #    #      #    # #    # #    # 
#    # #  # #    #      #    # ###### #    # 
#    # #   ##    #      #    # #    # #    # 
 ####  #    #    ######  ####  #    # ##### 
*/

window.addEventListener('load', () => {
  loader.classList.add('loader-hidden');
  loader.addEventListener('transitionend', () => {
    document.body.removeChild(loader);
    loginPage.classList.remove('hidden');
    wrapper.classList.remove('hidden');
  });
});

/*
#       #######  #####  ### #     # 
#       #     # #     #  #  ##    # 
#       #     # #        #  # #   # 
#       #     # #  ####  #  #  #  # 
#       #     # #     #  #  #   # # 
#       #     # #     #  #  #    ## 
####### #######  #####  ### #     # 
*/

const word = document.querySelector('#word');

loginPage.addEventListener("click", () => {
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
    logoutButton.classList.remove("logged-out");
    logoutButton.classList.remove("hidden");
    logoutButton.classList.add("logged-in");
    loginCk(user);
  } else {
    //loginPage.classList.remove("innactive-page");
    //loginPage.classList.add("active-page");
    loginCk(user);
  }
});

