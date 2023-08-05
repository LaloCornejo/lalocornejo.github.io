  console.log("firebase.js loaded correcly")
  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

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
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);