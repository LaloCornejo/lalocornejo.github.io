import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { auth } from "../FirebaseConfig.js";
import { Noti } from "../Noti.js";
import { mobileCheck } from "../isMobile.js";

// Cache DOM elements
const elements = {
  loginForm: document.querySelector(".wrapper"),
  emailInput: document.querySelector("#email"),
  passwordInput: document.querySelector("#password"),
  signInButton: document.querySelector("#loggin"),
  logoutButton: document.querySelector(".btnloggout"),
  frontPage: document.querySelector(".Front"),
  loginPage: document.querySelector(".Login"),
  loggedInPage: document.querySelector(".LoggedInPage"),
  loggedOutLinks: document.querySelectorAll(".logged-out"),
  loggedInLinks: document.querySelectorAll(".logged-in")
};

/**
 * Initialize authentication listeners and handlers
 */
export function initializeAuth() {
  // Set up login button handler
  if (elements.signInButton) {
    elements.signInButton.addEventListener("click", handleSignIn);
  }

  // Set up logout button handler
  if (elements.logoutButton) {
    elements.logoutButton.addEventListener("click", handleSignOut);
  }

  // Set up auth state change listener
  onAuthStateChanged(auth, handleAuthStateChange);
}

/**
 * Handle sign in attempt
 * @param {Event} e - Click event
 */
async function handleSignIn(e) {
  e.preventDefault();

  if (!elements.emailInput || !elements.passwordInput) {
    Noti("Login form elements not found", "error");
    return;
  }

  const email = elements.emailInput.value;
  const password = elements.passwordInput.value;

  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    console.log("Sign in successful:", credentials);
    Noti("Welcome LÆLÖ", "success");
    
    if (elements.loginForm) {
      elements.loginForm.classList.remove("active-popup");
    }
  } catch (error) {
    handleAuthError(error);
  }
}

/**
 * Handle sign out attempt
 * @param {Event} e - Click event
 */
async function handleSignOut(e) {
  if (e) e.preventDefault();

  try {
    await signOut(auth);
    
    if (elements.frontPage) {
      elements.frontPage.classList.remove("innactive-page");
      elements.frontPage.classList.add("active-page");
    }
  } catch (error) {
    console.error("Sign out error:", error);
    Noti("Error signing out", "error");
  }
}

/**
 * Handle authentication state changes
 * @param {Object} user - Firebase user object
 */
function handleAuthStateChange(user) {
  if (user) {
    // User is signed in
    if (elements.loginPage) {
      elements.loginPage.classList.remove("active-page");
      elements.loginPage.classList.add("innactive-page");
    }
    
    if (elements.logoutButton) {
      elements.logoutButton.classList.remove("logged-out");
    }
    
    if (elements.loggedInPage) {
      elements.loggedInPage.classList.remove("logged-out");
    }
    
    elements.loggedInLinks.forEach(link => {
      if (link) link.style.visibility = "hidden";
    });
    
    elements.loggedOutLinks.forEach(link => {
      if (link) link.style.visibility = "visible";
    });
  } else {
    // User is signed out
    elements.loggedInLinks.forEach(link => {
      if (link) link.style.visibility = "visible";
    });
    
    elements.loggedOutLinks.forEach(link => {
      if (link) link.style.visibility = "hidden";
    });
    
    Noti("Logged Out ಠ益ಠ", "error");
    console.log("User logged out");
  }
}

/**
 * Handle authentication errors
 * @param {Error} error - Firebase auth error
 */
function handleAuthError(error) {
  console.error("Auth error:", error);
  
  switch (error.code) {
    case "auth/user-not-found":
      Noti("User not found", "error");
      break;
    case "auth/wrong-password":
      Noti("Wrong password", "error");
      break;
    case "auth/invalid-email":
      Noti("Invalid email", "error");
      break;
    default:
      Noti("Authentication error", "error");
  }
}

// Auto-initialize if DOM is ready
if (document.readyState === "complete") {
  initializeAuth();
} else {
  window.addEventListener("DOMContentLoaded", initializeAuth);
}

