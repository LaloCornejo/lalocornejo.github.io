import { signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { auth } from "./FirebaseConfig.js";

const logout = document.querySelector(".btnloggout");
const front = document.querySelector(".Front");

logout.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await signOut(auth);
    //front.classList.replace("innactive-page", "active-page")
    front.classList.remove("innactive-page");
    front.classList.add("active-page");
  } catch (error) {
    console.log(error);
  }
});

document.onload = signOut(auth);
