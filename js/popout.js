const social = document.querySelectorAll(".social");
const popOut = document.querySelector(".popOut");

const close = document.querySelector("#popOutClose");
const maximize = document.querySelector("#popOutOpen");
const popOutContent = document.querySelector(".popOutContent");
const button = document.querySelector(".Buttons");
const iframe = document.querySelector("#socialSnipet");

const twitch = document.querySelector("#twitch");
const github = document.querySelector("#github");
const youtube = document.querySelector("#youtube");
const socialSelector = document.querySelector("#socialSelector");
const YT = document.querySelector("#YT");
const GH = document.querySelector("#GH");

let hoverTimeout;

const blob = document.querySelector(".blob");

const blobAnim = document.querySelector("blobAnim");

social.forEach((item) => {
  item.addEventListener("click", (event) => {
    console.log(item);
    maximize.href = "";
    iframe.src = "";
    iframe.title = "";

    if (item.id == "github") {
      maximize.href = "https://github.com/LaloCornejo";
      iframe.src = "https://github.com/LaloCornejo";
      iframe.title = "Github";
    } else if (item.id == "twitch") {
      maximize.href = "https://twitch.tv/l_ae_l_o";
      iframe.src =
        "https://player.twitch.tv/?channel=l_ae_l_o&parent=lalocornejo.github.io";
      iframe.title = "Twitch";
    } else if (item.id == "youtube") {
      maximize.href = "https://www.youtube.com/channel/UCPRKmKf9NkiAt1fHBlgI9Sw";
      iframe.src = "https://www.youtube.com/channel/UCPRKmKf9NkiAt1fHBlgI9Sw";
      iframe.title = "Youtube";
    }

    
    popOut.classList.add("active");
    
    setTimeout(() => {
      popOutContent.style.transform = "scale(1)";
      button.style.transform = "scale(1)";
    }, 250);
    blob.style = "  filter: blur(0px); -webkit-filter: blur(0px);";
    blobAnim.removeAttribute("dur");
  });
});

github.addEventListener("mouseover", () => {
  hoverTimeout = setTimeout(() => {
    if (github) {
      GH.style.opacity = "1";
      GH.style.visibility = "visible";
      GH.style.bottom = "12vh";
    }
  }, 500);
});

github.addEventListener("mouseout", () => {
  setTimeout(() => {
    if (!GH.matches(":hover")) {
      GH.style.removeProperty("opacity");
      GH.style.removeProperty("visibility");
      GH.style.removeProperty("bottom");
    }else {
      GH.addEventListener("mouseout", () => {
        GH.style.removeProperty("opacity");
        GH.style.removeProperty("visibility");
        GH.style.removeProperty("bottom");
      });
    }
  }, 200);
  clearTimeout(hoverTimeout);
});

youtube.addEventListener("mouseover", () => {
  hoverTimeout = setTimeout(() => {
    if (github) {
      YT.style.opacity = "1";
      YT.style.visibility = "visible";
      YT.style.bottom = "12vh";
    }
  }, 500);
});

youtube.addEventListener("mouseout", () => {
  setTimeout(() => {
    if (!YT.matches(":hover")) {
      YT.style.removeProperty("opacity");
      YT.style.removeProperty("visibility");
      YT.style.removeProperty("bottom");
    }else {
      YT.addEventListener("mouseout", () => {
        YT.style.removeProperty("opacity");
        YT.style.removeProperty("visibility");
        YT.style.removeProperty("bottom");
      });
    }
  }, 200);
  clearTimeout(hoverTimeout);
});

close.addEventListener("click", () => {
  if (popOut.classList.contains("active")) {
    popOutContent.style.removeProperty("transform");

    blob.removeAttribute("style");
    button.style.removeProperty("transform");

    setTimeout(() => {
      popOut.classList.remove("active");
    }, 250);
  }
});
