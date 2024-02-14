const popOut = document.querySelector(".popOut");
const section = document.querySelectorAll(".Section");

const popOutContent = document.querySelector(".popOutContent");
const button = document.querySelector(".Buttons");

const close = document.querySelector("#popOutClose");
const iframe = document.querySelector("#pdf-js-viewer");

section.forEach((item) => {
  item.addEventListener("click", (event) => {
    console.log(item);
    popOut.classList.add("active");


    iframe.src = `/web/viewer.html?file=/img/pdfs/${item.id}.pdf`;

    setTimeout(() => {
      popOutContent.style.transform = "scale(1)";
      button.style.transform = "scale(1)";
    }, 250);
  });
});

function closePopOut() {
  popOutContent.style.transform = "scale(0)";
  button.style.transform = "scale(0)";

  iframe.src = "";

  setTimeout(() => {
    popOut.classList.remove("active");
  }, 250);
}

document.addEventListener("click", (event) => {
  console.log(event.target) + ":)";
  if (event.target == popOut || event.target == close) {
    closePopOut();
  }
});
