  console.log("firebase.js loaded correctly");

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
  import { getFirestore, collection } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBA1yWtqFmeS0fOZXwDozUf0ZFdDx8i4r0",
    authDomain: "lalocornejo-db.firebaseapp.com",
    databaseURL: "https://lalocornejo-db-default-rtdb.firebaseio.com",
    projectId: "lalocornejo-db",
    storageBucket: "lalocornejo-db.appspot.com",
    messagingSenderId: "817457376944",
    appId: "1:817457376944:web:7835a07af9a658c5c59575"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);


  export { app, auth, db };