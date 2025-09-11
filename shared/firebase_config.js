// shared/firebase_config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase configuration (replace with your actual project values)
const firebaseConfig = {
    apiKey: "AIzaSyAReb65bsaoa145J5Yu2R61nrr4vvmqBiQ",
    authDomain: "demand-rusher.firebaseapp.com",
    projectId: "demand-rusher",
    storageBucket: "demand-rusher.firebasestorage.app",
    messagingSenderId: "491613307536",
    appId: "1:491613307536:web:52f3339b4f12ef7418ce15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Export everything needed
export { auth, db, provider, onAuthStateChanged };
