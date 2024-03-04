const title = document.querySelector("#Title");
const title2 = document.querySelector("#Quote");
const main = document.querySelector(".MainContainer");
const preview = document.querySelector(".SocialPreview");
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 10) {
    main.style.width = "80%";
    main.style.height = "auto";
    document.querySelector(".Main").style.marginTop = "-5%";
    preview.style.height = "80%";
    preview.style.marginTop = "7%";
    title2.style.transform = "scale(0)";
    title.style.transform = "scale(.5)";
    title.style.marginTop = "8%";
    navbar.style.transform = "scale(.7)";
    navbar.style.height = "7vh";
    navbar.style.marginTop = ".5%";
    navbar.style.border = "2px solid ";
  } else {
    const title = document.querySelector("#Title");
    const title2 = document.querySelector("#Quote");
    const main = document.querySelector(".MainContainer");
    const preview = document.querySelector(".SocialPreview");
    document.querySelector(".Main").removeAttribute("style");
    document.querySelector(".navbar").removeAttribute("style");
    main.removeAttribute("style");
    preview.removeAttribute("style");
    title2.removeAttribute("style");
    title.removeAttribute("style");
  }
});
