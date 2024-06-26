// const social = document.querySelectorAll(".social");
const popOut = document.querySelector(".popOut");

const close = document.querySelector("#popOutClose");
const maximize = document.querySelector("#popOutOpen");
const popOutContent = document.querySelector(".popOutContent");
const button = document.querySelector(".Buttons");
const iframe = document.querySelector("#socialSnipet");

// const twitch = document.querySelector("#twitch");
// const github = document.querySelector("#github");
// const youtube = document.querySelector("#youtube");
// const socialSelector = document.querySelector("#socialSelector");

const iconFallback = document.querySelector("#iconFallback");
const fallbackImg = document.querySelector("#fallbackImg");
const fallbackIcon = document.querySelector("#fallbackIcon");
const fallbackHeader = document.querySelector("#fallbackHeader");

var iconName = "";
var iconSrc = "";
var iconHref = "";

// social.forEach((item) => {
//   item.addEventListener("click", (event) => {
//     // console.log(item);
//     maximize.href = "";
//     iframe.src = "";
//     iframe.title = "";

//     if (item.id == "github") {
//       var title = "Github";
//       maximize.href = "https://github.com/LaloCornejo";
//       iframe.src = "https://github.com/LaloCornejo";
//       iframe.title = title;
//       iconName = "logo-github";
//       iconSrc = "/img/github.svg";
//       iconHref = "https://github.com/LaloCornejo";
//       console.log(iconHref + " " + iconSrc + " " + iconName);
//     } else if (item.id == "twitch") {
//       var title = "Twitch";
//       maximize.href = "https://twitch.tv/l_ae_l_o";
//       iframe.src =
//         "https://player.twitch.tv/?channel=l_ae_l_o&parent=lalocornejo.github.io";
//       iframe.title = title;
//       iconName = "logo-twitch";
//       iconSrc = "/img/twitch.svg";
//       iconHref = "https://twitch.tv/l_ae_l_o";
//       console.log(iconHref + " " + iconSrc + " " + iconName);
//     } else if (item.id == "youtube") {
//       var title = "Youtube";
//       maximize.href =
//         "https://www.youtube.com/channel/UCPRKmKf9NkiAt1fHBlgI9Sw";
//       iframe.src = "https://www.youtube.com/channel/UCPRKmKf9NkiAt1fHBlgI9Sw";
//       iframe.title = title;
//       iconName = "logo-youtube";
//       iconSrc = "/img/youtube.svg";
//       iconHref = "https://www.youtube.com/channel/UCPRKmKf9NkiAt1fHBlgI9Sw";
//       console.log(iconHref + " " + iconSrc + " " + iconName);
//     }

//     popOut.classList.add("active");
//     active = true;

//     iframeFallback();

//     setTimeout(() => {
//       popOutContent.style.transform = "scale(1)";
//       button.style.transform = "scale(1)";
//     }, 250);
//   });
// });

slObj = document.querySelectorAll(".sliderContainer");

GH = document.querySelector("#GitHub");

slObj.forEach((item) => {
  item.addEventListener("click", (event) => {
    console.log(item);
    maximize.href = "";
    iframe.src = "";
    iframe.title = "";

    if (item.id == "GitHub") {
      var title = "Github";
      maximize.href = "https://github.com/LaloCornejo";
      iframe.src = "https://github.com/LaloCornejo";
      iframe.title = title;
      iconName = "logo-github";
      iconSrc = "/img/github.svg";
      iconHref = "https://github.com/LaloCornejo";
      console.log(iconHref + " " + iconSrc + " " + iconName);
    } else if (item.id == "Twitch") {
      var title = "Twitch";
      maximize.href = "https://twitch.tv/l_ae_l_o";
      iframe.src =
        "https://player.twitch.tv/?channel=l_ae_l_o&parent=lalocornejo.github.io";
      iframe.title = title;
      iconName = "logo-twitch";
      iconSrc = "/img/twitch.svg";
      iconHref = "https://twitch.tv/l_ae_l_o";
      console.log(iconHref + " " + iconSrc + " " + iconName);
    } else if (item.id == "Youtube") {
      var title = "Youtube";
      maximize.href =
        "https://www.youtube.com/channel/UCPRKmKf9NkiAt1fHBlgI9Sw";
      iframe.src = "https://www.youtube.com/channel/UCPRKmKf9NkiAt1fHBlgI9Sw";
      iframe.title = title;
      iconName = "logo-youtube";
      iconSrc = "/img/youtube.svg";
      iconHref = "https://www.youtube.com/channel/UCPRKmKf9NkiAt1fHBlgI9Sw";
      console.log(iconHref + " " + iconSrc + " " + iconName);
    }

    popOut.classList.add("active");
    active = true;

    // iframeFallback();

    setTimeout(() => {
      popOutContent.style.transform = "scale(1)";
      button.style.transform = "scale(1)";
    }, 250);
  });
});

const fallback = document.querySelector("#snippetFallback");

document.addEventListener("click", (event) => {
  console.log(event.target) + ":)";
  if (event.target == popOut || event.target == close) {
    closePopout();
  }
});

iframe.onload = function () {
  console.log("Iframe loaded successfully");
};

iframe.onerror = function () {
  console.log("Error: The iframe is blocked.");
  fallback.removeAttribute("style");

  iframe.removeAttribute("src");
  iframe.removeAttribute("title");
  iframe.style.display = "none";
  iframe.style.visibility = "hidden";

  iframeFallback();
};

function iframeFallback() {
  try {
    document.querySelector("#snippetFallback").removeAttribute("style");
    document.querySelector("#fallbackHeader").removeAttribute("style");
    iconFallback.name = iconName;
    fallbackIcon.src = iconSrc;
    fallbackImg.href = iconHref;
    fallbackHeader.href = iconHref;
  } catch (error) {
    console.log("Error: FallBack failed.") + error;
  }
}

function closePopout() {
  if (popOut.classList.contains("active")) {
    iframe.removeAttribute("src");
    iframe.removeAttribute("title");

    popOutContent.style.removeProperty("transform");
    button.style.removeProperty("transform");

    fallback.style.visibility = "hidden";

    setTimeout(() => {
      popOut.classList.remove("active");
    }, 250);
  }
}
