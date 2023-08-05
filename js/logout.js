import { signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { auth } from "./Firebase.js";

const logout = document.querySelector(".chika");

logout.addEventListener("click", async (e) => {
  try {
    await signOut(auth);
    console.log("logged out");
  } catch (error) {
    console.log(error);
  }
});
