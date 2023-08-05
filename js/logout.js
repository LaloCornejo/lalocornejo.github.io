import { signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { auth } from "./FirebaseConfig.js";

const logout = document.querySelector("#btnloggout");

logout.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("logout clicked");
  try{
    await signOut(auth);
    console.log("logged out");
  } catch (error) {
    console.log(error);
  }
});

document.onload = signOut(auth);