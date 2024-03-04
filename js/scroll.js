const title = document.querySelector("#Title");
const title2 = document.querySelector("#Quote");
const main = document.querySelector(".MainContainer");
const preview = document.querySelector(".SocialPreview");
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 1) {
    main.style.width = "80%";
    main.style.height = "auto";
    document.querySelector(".Main").style.marginTop = "-8%";
    document.querySelector(".BkGround").style.borderRadius = "20px";
    preview.style.height = "80%";
    preview.style.marginTop = "10%";
    title2.style.transform = "scale(0)";
    title.style.transform = "scale(.5)";
    title.style.marginTop = "0";
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
    document.querySelector(".BkGround").removeAttribute("style");
    main.removeAttribute("style");
    preview.removeAttribute("style");
    title2.removeAttribute("style");
    title.removeAttribute("style");
  }
});
