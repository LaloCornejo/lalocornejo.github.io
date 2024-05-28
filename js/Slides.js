console.log("Slides loaded");
const RightSlide = document.getElementById("Youtube");
const CenterSlide = document.getElementById("GitHub");
const LeftSlide = document.getElementById("Twitch");

let center = true;
let left = false;
let right = false;
let mouseListenerEnabled = true;

centerSlide();
leftSlide();
rightSlide();

function centerSlide() {
  CenterSlide.addEventListener("mouseenter", () => {
    if (!mouseListenerEnabled) return;
    if(center) return;
    console.log("CenterSlide");
    center = true;
    left = false;
    right = false;
    CenterSlide.classList.remove("sliderNotFocused");
    CenterSlide.classList.add("sliderFocused");
    LeftSlide.classList.remove("sliderFocused");
    LeftSlide.classList.add("sliderNotFocused");
    RightSlide.classList.remove("sliderFocused");
    RightSlide.classList.add("sliderNotFocused");
    CenterSlide.style.transform = "translateX(0)";
    LeftSlide.style.transform = "translateX(-100%)";
    RightSlide.style.transform = "translateX(80%)";
    mouseListenerEnabled = false;
    setTimeout(() => {
      mouseListenerEnabled = true;
    }, 1000);
  });
}

function leftSlide() {
  LeftSlide.addEventListener("mouseenter", () => {
    if (!mouseListenerEnabled) return;
    if(left) return;
    console.log("LeftSlide");
    center = false;
    left = true;
    right = false;
    LeftSlide.classList.remove("sliderNotFocused");
    LeftSlide.classList.add("sliderFocused");
    RightSlide.classList.remove("sliderFocused");
    RightSlide.classList.add("sliderNotFocused");
    CenterSlide.classList.remove("sliderFocused");
    CenterSlide.classList.add("sliderNotFocused");
    LeftSlide.style.transform = "translateX(0)";
    RightSlide.style.transform = "translateX(80%)";
    CenterSlide.style.transform = "translateX(-100%)";
    mouseListenerEnabled = false;
    setTimeout(() => {
      mouseListenerEnabled = true;
    }, 1000);
  });
}

function rightSlide() {
  RightSlide.addEventListener("mouseenter", () => {
    if (!mouseListenerEnabled) return;
    if(right) return;
    console.log("RightSlide");
    right = true;
    left = false;
    center = false;
    RightSlide.classList.remove("sliderNotFocused");
    RightSlide.classList.add("sliderFocused");
    LeftSlide.classList.remove("sliderFocused");
    LeftSlide.classList.add("sliderNotFocused");
    CenterSlide.classList.remove("sliderFocused");
    CenterSlide.classList.add("sliderNotFocused");
    RightSlide.style.transform = "translateX(0)";
    LeftSlide.style.transform = "translateX(-100%)";
    CenterSlide.style.transform = "translateX(80%)";
    mouseListenerEnabled = false;
    setTimeout(() => {
      mouseListenerEnabled = true;
    }, 1000);
  });
}
