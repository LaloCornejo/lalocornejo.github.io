import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { auth, db } from "./FirebaseConfig.js";
import { loginCk } from "./loginCk.js";

import "./Auth.js";
import "./logout.js";

const front = document.querySelector(".Front");
const word = document.querySelector("#word");
const wrapper = document.querySelector(".wrapper");

const login = document.querySelector(".Login");
const closebx = document.querySelector(".icon-close");
const logoutButton = document.querySelector(".btnloggout");
const loggedInPage = document.querySelector(".LoggedInPage");

// -=================== Clock ===================-

let time = document.querySelector("#current-time");

setInterval(() => {
  let d = new Date();
  if (time)
    time.innerHTML = d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
});

// -=================== Login ===================-
if (login) {
  login.addEventListener("click", () => {
    wrapper.classList.add("active-popup");
  });
}

if (closebx) {
  closebx.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
  });
}

if (word) {
  word.addEventListener("click", () => {
    front.classList.remove("active-page");
    front.classList.add("innactive-page");
    login.classList.remove("innactive-page");
    login.classList.add("active-page");
  });
}

auth.onAuthStateChanged(async (user) => {
  loginCk(user);
  if (user) {
    login.classList.remove("active-page");
    login.classList.add("innactive-page");
    logoutButton.classList.remove("logged-out");
    loggedInPage.classList.remove("logged-out");
  }
});

// -=================== Cursor ===================-
import "./Cursor.js";

/*---+---+---+---+---+---+
 | S | C | R | O | L | L | */
import "./scroll.js";

/*---+---+---+---+---+---+
  | P | O | P | O | U | T |
  +---+---+---+---+---+---*/
const social = document.querySelectorAll(".Social");

social.forEach((item) => {
  item.addEventListener("click", (event) => {
    flash();
    if (item.id == "Github") {
      var title = "Github";
      var previewImg = "../img/github.svg";
      var bkImage = "../img/bgbk1.svg";
    } else if (item.id == "Twitch") {
      var title = "Twitch";
      var previewImg = "../img/twitch.svg";
      var bkImage = "../img/bgbk2.svg";
    } else if (item.id == "Youtube") {
      var title = "Youtube";
      var previewImg = "../img/youtube.svg";
      var bkImage = "../img/bgbk3.svg";
    }

    const socialPreviewImg = document.querySelector(".SocialPreviewImg");
    const SocialPreviewCard = document.querySelector(".SocialPreviewCard");
    const BkGround = document.querySelector(".BkGround");

    setTimeout(() => {
      if (socialPreviewImg) {
        socialPreviewImg.src = previewImg;
        SocialPreviewCard.id = title;
      }

      if (BkGround) {
        BkGround.src = bkImage;
      }
    }, 100);
  });
});

function flash() {
  document.querySelector(".MainContainer").style.animation = "flash .8s ease-in-out";
  setTimeout(() => {
    document.querySelector(".MainContainer").style.animation = "none";
  }, 500);
}
