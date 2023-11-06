//                   Autor: LÆLÖ 

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

import { auth, db } from './FirebaseConfig.js'
import { loginCk } from "./loginCk.js";

import './Auth.js'
import './logout.js'
import { setupNotes } from "./Notes.js";


const wrapper = document.querySelector('.wrapper');
const front = document.querySelector('.Front');
const loginPage = document.querySelector('.Login');
const logoutButton = document.querySelector(".logoubttn");
const closebx = document.querySelector('.icon-close');
const loader = document.querySelector('.loader');
const word = document.querySelector('#word');
const loggedInPage = document.querySelector('#LoggedInPage');



window.addEventListener('load', () => {
  loader.classList.add('loader-hidden');
  loader.addEventListener('transitionend', () => {
    document.body.removeChild(loader);
    loginPage.classList.remove('hidden');
    wrapper.classList.remove('hidden');
  });
});



loginPage.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});

closebx.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});

word.addEventListener("click", () => {
  front.classList.replace("active-page", "innactive-page");
  // loginPage.classList.replace("innactive-page", "active-page");
  loginPage.classList.remove("innactive-page");
  loginPage.classList.add("active-page");
});

const functions = require('firebase-functions');

exports.addHeaders = functions.https.onRequest((req, res) => {
  res.set('X-Content-Type-Options', 'nosniff');
  // your code here
});


onAuthStateChanged(auth, async (user) => {
  loginCk(user);
  if (user) {
      try{
        const querrySnapshot = await getDocs(collection(db, "Notes"));
        setupNotes(querrySnapshot.docs);
      }catch(error){
        console.log(error);
      }
      //logoutButton.classList.replace("logged-out", "logged-in");
      logoutButton.classList.remove("logged-out");
      logoutButton.classList.add("logged-in");
      //loginPage.classList.replace("active-page", "innactive-page");
      loginPage.classList.remove("active-page");
      loginPage.classList.add("innactive-page");
      //loggedInPage.classList.replace("innactive-page", "active-page");
      loggedInPage.classList.remove("innactive-page");
      loggedInPage.classList.add("active-page");
    
  } else {
    setupNotes([]);
    loginCk(user);
  }
});

