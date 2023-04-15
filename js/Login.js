const wrapper = document.querySelector('.wrapper');
const login = document.querySelector(".Login")
const closebx = document.querySelector('.icon-close');
const inputbox = document.querySelector('.input-box');


login.addEventListener("click", () => {
    wrapper.classList.add("active-popup");
    console.log("login");
});

closebx.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
    console.log("close");
});

function validation() {
    var u = document.querySelector("username");
    var p = document.querySelector("password");
    var user = "Lalo";
    var pass = "admin";

    if(u == user && p == pass ) {
        console.log("validated")
    }else if(u != user || p != pass ) {
        console.log('fuckoff');
        console.log(u);
        console.log(p);
        console.log(user);
        console.log(pass);
    }
}