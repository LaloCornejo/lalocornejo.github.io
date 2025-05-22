import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// import { Noti } from "./Noti.js";
import { auth } from "./FirebaseConfig.js";

const signIn = document.querySelector("#loggin");

if (signIn) {
  signIn.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const wrapper = document.querySelector(".wrapper");

    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      Noti("Welcome LÆLÖ", "success");
      console.log(credentials);
      wrapper.classList.remove("active-popup");
    } catch (error) {
      if (error.code == "auth/user-not-found") {
        Noti("User not found", "error");
      } else if (error.code == "auth/wrong-password") {
        Noti("Wrong password", "error");
      } else if (error.code == "auth/invalid-email") {
        Noti("Invalid email", "error");
      }
      console.log(error);
    }
  });
}
