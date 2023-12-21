//                   Autor: LÆLÖ
//                   Date: 20231220
import { loginCk } from "./loginCk.js";
import { auth, db } from "./FirebaseConfig.js";
// import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import "./Auth.js";
import "./logout.js";

// const notesCollection = collection(db, "Notes");

// getDocs(notesCollection).then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });
// });

const wrapper = document.querySelector(".wrapper");
const front = document.querySelector(".Front");
const loginPage = document.querySelector(".Login");
const logoutButton = document.querySelector(".logoubttn");
const closebx = document.querySelector(".icon-close");
const loader = document.querySelector(".loader");
const word = document.querySelector("#word");
const loggedInPage = document.querySelector("#LoggedInPage");
const menu = document.querySelector(".menu");
const nav = document.querySelector(".navapps");
let selected = false;
const navcontainer = document.querySelector(".nav");

navcontainer.addEventListener("mouseenter", (e) => {
  try {
    selected = true;
    menu.classList.remove("menu-no-selected");
    menu.classList.add("menu-selected");
    setTimeout(() => {
      nav.classList.add("active-menu");
      nav.classList.remove("innactive-menu");
      console.log("menuIn");
    }, 75);  
  }catch (error) {
    console.log(error);
  }
});

navcontainer.addEventListener("mouseleave", (e) => {
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

menu.addEventListener("click", (e) => {
  if (!selected) {
    try {
      menu.classList.remove("menu-no-selected");
      menu.classList.add("menu-selected");
      setTimeout(() => {
        nav.classList.add("active-menu");
        nav.classList.remove("innactive-menu");
        console.log("menuIn");
      }, 75);  
    }catch (error) {
      console.log(error);
    }
  }
});

window.addEventListener("click", (e) => {
  if(selected){
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

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("loader-hidden");
    loader.addEventListener("transitionend", () => {
      if (document.body.contains(loader)) {
        document.body.removeChild(loader);
      }
      loginPage.classList.remove("hidden");
      wrapper.classList.remove("hidden");
    });
  }, 300);
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

auth.onAuthStateChanged((user) => {
  loginCk(user);
  try {
    if (user) {
      startApp(user);
      logoutButton.classList.replace("logged-out", "logged-in");
      logoutButton.classList.remove("logged-out");
      logoutButton.classList.add("logged-in");
      loginPage.classList.replace("active-page", "innactive-page");
      // loginPage.classList.remove("active-page");
      // loginPage.classList.add("innactive-page");
      loggedInPage.classList.replace("innactive-page", "active-page");
      loggedInPage.classList.remove("hidden");
      // loggedInPage.classList.add("active-page");
    }
  } catch (error) {
    console.log(error);
  }
});

// function startApp(user) {
//   // Get the form and listen for submit event
//   var form = document.querySelector('#add-note-form');
//   form.addEventListener('submit', function(e) {
//     e.preventDefault();

//     // New note
//     const notesCollection = collection(db, "Notes");
//     notesCollection.add({
//       note: form.note.value,
//       userId: user.uid
//     });

//     // Clear the form
//     form.note.value = '';
//   });
// }
