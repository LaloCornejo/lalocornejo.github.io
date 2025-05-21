/**
 * Firebase Configuration Module
 * Centralizes Firebase initialization and exports auth and database instances
 * 
 * @version 1.1.0
 * @author LÆLÖ
 * @updated 2025-05-20
 */

console.log("FirebaseConfig.js loading...");

// Initialize state tracking
let isInitialized = false;
let initError = null;

// Firebase service objects
let app, auth, db;

// Safely import Firebase SDKs
async function importFirebaseSDKs() {
  try {
    console.log("Importing Firebase SDKs...");
    
    // Import the Firebase app module
    const appModule = await import("https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js");
    
    // Import the Firebase auth module
    const authModule = await import("https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js");
    
    // Import the Firebase firestore module
    const firestoreModule = await import("https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js");
    
    console.log("Firebase SDKs imported successfully");
    
    return {
      initializeApp: appModule.initializeApp,
      getAuth: authModule.getAuth,
      getFirestore: firestoreModule.getFirestore,
      collection: firestoreModule.collection
    };
  } catch (error) {
    console.error("Error importing Firebase SDKs:", error);
    initError = error;
    return null;
  }
}

// Initialize Firebase
async function initializeFirebase() {
  try {
    // Import Firebase SDK functions
    const firebase = await importFirebaseSDKs();
    
    if (!firebase) {
      throw new Error("Failed to import Firebase SDK modules");
    }
    
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBA1yWtqFmeS0fOZXwDozUf0ZFdDx8i4r0",
      authDomain: "lalocornejo-db.firebaseapp.com",
      databaseURL: "https://lalocornejo-db-default-rtdb.firebaseio.com",
      projectId: "lalocornejo-db",
      storageBucket: "lalocornejo-db.appspot.com",
      messagingSenderId: "817457376944",
      appId: "1:817457376944:web:7835a07af9a658c5c59575",
    };
    
    // Initialize Firebase services
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.getAuth(app);
    db = firebase.getFirestore(app);
    
    isInitialized = true;
    console.log("Firebase initialized successfully");
    
    return true;
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    initError = error;
    return false;
  }
}

// Start initialization
const initPromise = initializeFirebase();

// Get initialization status
function getInitStatus() {
  return {
    isInitialized,
    initError,
    initPromise
  };
}

// Export Firebase services and status
export { app, auth, db, getInitStatus };
