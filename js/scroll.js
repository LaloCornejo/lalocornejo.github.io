import { mobileCheck } from "./isMobile.js";

const title = document.querySelector("#Title");
const title2 = document.querySelector("#Quote");
const main = document.querySelector(".MainContainer");
const preview = document.querySelector(".SocialPreview");
const navbar = document.querySelector(".navbar");


window.addEventListener("scroll", () => {
  if (window.scrollY >= 1) {
    main.style.width = "80%";
    main.style.height = "auto";
    document.querySelector(".BkGround").style.borderRadius = "20px";
    preview.style.height = "83%";
    preview.style.marginTop = "7%";
    document.querySelector("#SocialPreviewCard").style.marginBottom = "0%";
    title2.style.transform = "scale(0)";
    title2.style.position = "absolute";
    title.style.transform = "scale(.5)";
    if (mobileCheck()) {
      title.style.marginTop = "40%";
      document.querySelector(".Main").style.marginTop = "-10%";
      document.querySelector("#theme-toggle").style.top = "0";
    } else {
      title.style.marginTop = "20%";
      document.querySelector(".Main").style.marginTop = "0%";
    }
    navbar.style.transform = "scale(.7)";
    navbar.style.height = "7vh";
    navbar.style.marginTop = ".5%";
    navbar.style.border = "2px solid ";
    document.querySelector(".SocialsPanel").style.opacity = "1";
  } else {
    const title = document.querySelector("#Title");
    const title2 = document.querySelector("#Quote");
    const main = document.querySelector(".MainContainer");
    const preview = document.querySelector(".SocialPreview");
    document.querySelector(".Main").removeAttribute("style");
    document.querySelector(".navbar").removeAttribute("style");
    document.querySelector(".BkGround").removeAttribute("style");
    document.querySelector("#SocialPreviewCard").removeAttribute("style");
    main.removeAttribute("style");
    preview.removeAttribute("style");
    title2.removeAttribute("style");
    title.removeAttribute("style");
    document.querySelector(".SocialsPanel").style.opacity = "0";
  }
});
