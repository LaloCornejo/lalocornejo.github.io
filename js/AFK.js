const AFK = document.querySelector(".afk");
const main = document.querySelector(".main");

const Logo = document.querySelector("#Logo");

AFK.addEventListener("click", function () {
  main.style.opacity = "0";
  // main.style.display = "none";
  console.log("AFK");
  setTimeout(() => {
    Logo.style.scale = "5";
    Logo.style.transform = "translateY(65%)";
  }, 300);
});

window.addEventListener("focus", function () {
  if (event.target !== AFK) {
      main.removeAttribute("style");
      Logo.removeAttribute("style");
      return;
    }
});
