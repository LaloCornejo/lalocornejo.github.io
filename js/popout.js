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

social.forEach((item) => {
  item.addEventListener("click", (event) => {
    console.log(item);
    maximize.href = "";
    iframe.src = "";
    iframe.title = "";

    if (item.id == "github") {
      try {
        maximize.href = "https://github.com/LaloCornejo";
        iframe.src = "https://github.com/LaloCornejo";
        iframe.title = "Github";
      } catch (e) {
        console.log(e);
        iframe.src = "";
        iframe.title = "Github";
      }
    } else if (item.id == "twitch") {
      try {
        maximize.href = "https://twitch.tv/l_ae_l_o";
        iframe.src =
          "https://player.twitch.tv/?channel=l_ae_l_o&parent=lalocornejo.github.io";
        iframe.title = "Twitch";
      } catch (e) {
        console.log(e);
        iframe.src = "";
        iframe.title = "Twitch";
      }
    } else if (item.id == "youtube") {
      try {
        maximize.href =
          "https://www.youtube.com/channel/UCPRKmKf9NkiAt1fHBlgI9Sw";
        iframe.src = "https://www.youtube.com/channel/UCPRKmKf9NkiAt1fHBlgI9Sw";
        iframe.title = "Youtube";
      } catch (e) {
        console.log(e);
        iframe.src = "";
        iframe.title = "Youtube";
      }
    }

    popOut.classList.add("active");

    setTimeout(() => {
      popOutContent.style.transform = "scale(1)";
      button.style.transform = "scale(1)";
    }, 250);
  });
});

let hoverTimeout;

github.addEventListener("mouseover", (e) => {
  clearTimeout(hoverTimeout);
  hoverTimeout = setTimeout(() => {
    if (github.matches(":hover")) {
      YT.removeAttribute("style");

      GH.style.opacity = "1";
      GH.style.visibility = "visible";
      GH.style.bottom = "12vh";
    }
  }, 400);
});

github.addEventListener("mouseout", () => {
  hoverTimeout = setTimeout(() => {
    GH.removeAttribute("style");
  }, 700);
});

youtube.addEventListener("mouseover", () => {
  clearTimeout(hoverTimeout);
  hoverTimeout = setTimeout(() => {
    if (youtube.matches(":hover")) {
      GH.removeAttribute("style");

      YT.style.opacity = "1";
      YT.style.visibility = "visible";
      YT.style.bottom = "12vh";
    }
  }, 400);
});

youtube.addEventListener("mouseout", () => {
  hoverTimeout = setTimeout(() => {
    YT.removeAttribute("style");
  }, 700);
});

close.addEventListener("click", () => {
  if (popOut.classList.contains("active")) {
    iframe.removeAttribute("src");
    iframe.removeAttribute("title");
    
    popOutContent.style.removeProperty("transform");
    button.style.removeProperty("transform");

    setTimeout(() => {
      popOut.classList.remove("active");
    }, 250);
  }
});
