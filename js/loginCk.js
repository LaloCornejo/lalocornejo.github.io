import { Noti } from "./Noti.js";

const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

console.log(loggedOutLinks)
console.log(loggedInLinks)

export const loginCk = (user) => {
    if (user) {
        loggedOutLinks.forEach(link => link.style.display = 'block');
        console.log("logged in");
    } else {
        loggedOutLinks.forEach(link => link.style.display = 'none');
        console.log("logged out (loginCk)");
        Noti("Logged Out :)", "error")
    }
}