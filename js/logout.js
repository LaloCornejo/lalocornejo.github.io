import { signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { auth } from "./FirebaseConfig.js";

const logout = document.querySelector("#btnloggout");
const front = document.querySelector(".Front");

logout.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("logout clicked");
  try{
    await signOut(auth);
    console.log("logged out(logout)");
    front.classList.remove("innactive-page");
    front.classList.add("active-page");
  } catch (error) {
    console.log(error);
  }
});

document.onload = signOut(auth);