const popOut = document.querySelector(".popOut");
const section = document.querySelectorAll(".Section");

const popOutContent = document.querySelector(".popOutContent");
const button = document.querySelector(".Buttons");

const close = document.querySelector("#popOutClose");
const img = document.querySelector(".popImage");
const imgs = document.querySelectorAll(".popImage");

window.onload = (console.log("pdfReader loaded"));

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

const socialSnippet = document.querySelectorAll("#socialSnipet"); // Fix typo: change 'socialSnipet' to 'socialSnippet'.

window.addEventListener("wheel", (event) => {
  if (popOut.classList.contains("active")) {
    const scrollSpeed = 100;
    if (event.deltaY < 0) {
      // scroll left
      socialSnippet.scrollLeft -= scrollSpeed;
      console.log("scrolling left" + socialSnippet.scrollLeft);
    } else if (event.deltaY > 0) {
      // scroll right
      socialSnippet.scrollLeft += scrollSpeed;
      console.log("scrolling right" + socialSnippet.scrollLeft);
    }
  }
});