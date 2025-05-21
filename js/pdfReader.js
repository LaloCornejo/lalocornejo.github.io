const popOut = document.querySelector(".popOut");
const section = document.querySelectorAll(".Section");

const popOutContent = document.querySelector(".popOutContent");
const button = document.querySelector(".Buttons");

const close = document.querySelector("#popOutClose");
const img = document.querySelector(".popImage");
const imgs = document.querySelectorAll(".popImage");

section.forEach((item) => {
  item.addEventListener("click", (event) => {
    console.log(item.id);
    popOut.classList.add("active");

    imgs.forEach((img) => {
      img.src = `/img/${item.id}/${img.id}.jpg`;
    });

    setTimeout(() => {
      popOutContent.style.transform = "scale(1)";
      button.style.transform = "scale(1)";
    }, 250);
  });
});

function closePopOut() {
  popOutContent.style.transform = "scale(0)";
  button.style.transform = "scale(0)";

  imgs.src = "";

  setTimeout(() => {
    popOut.classList.remove("active");
  }, 250);
}

document.addEventListener("click", (event) => {
  console.log(event.target + ":)"); // Fix typo: move closing parenthesis inside the console.log() function.
  if (event.target == popOut || event.target == close) {
    closePopOut();
  }
});

window.onscroll = function() {myFunction()};

window.addEventListener("", (event) => {
  console.log(event);
});

function myFunction() {
  var winScroll = document.documentElement.scrollLeft;
  var width = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  var scrolled = (winScroll / width) * 100;
  console.log(scrolled);
}