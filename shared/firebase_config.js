// shared/firebase_config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase configuration (replace with your actual project values)
const firebaseConfig = {
  apiKey: "AIzaSyD4f8b6d8d8e8d8d8d8d8d8d8d8d8d8d8d8d8d8",
  authDomain: "demand-rusher.firebaseapp.com",
  projectId: "demand-rusher",
  storageBucket: "demand-rusher.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Export everything needed
export { auth, db, provider, onAuthStateChanged };
