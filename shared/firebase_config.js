// shared/firebase_config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAReb65bsaoa145J5Yu2R61nrr4vvmqBiQ",
  authDomain: "demand-rusher.firebaseapp.com",
  projectId: "demand-rusher",
  storageBucket: "demand-rusher.firebasestorage.app",
  messagingSenderId: "491613307536",
  appId: "1:491613307536:web:52f3339b4f12ef7418ce15",
  measurementId: "G-VY4JSL70QV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
