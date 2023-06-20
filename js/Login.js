const wrapper = document.querySelector('.wrapper');
const login = document.querySelector("#Login")
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