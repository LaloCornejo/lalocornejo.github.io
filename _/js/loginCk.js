// import { Noti } from "./Noti.js";
import { mobileCheck } from "./isMobile.js";

const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

export const loginCk = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.visibility = "hidden"));
    loggedOutLinks.forEach((link) => (link.style.visibility = "visible"));
  } else {
    loggedInLinks.forEach((link) => (link.style.visibility = "visible"));
    loggedOutLinks.forEach((link) => (link.style.visibility = "hidden"));
    Noti("Logged Out ಠ益ಠ", "error");
    console.log("logged out");
  }
};
