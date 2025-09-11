// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// 🔥 replace with your own Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAReb65bsaoa145J5Yu2R61nrr4vvmqBiQ",
    authDomain: "demand-rusher.firebaseapp.com",
    projectId: "demand-rusher",
    storageBucket: "demand-rusher.firebasestorage.app",
    messagingSenderId: "491613307536",
    appId: "1:491613307536:web:52f3339b4f12ef7418ce15",
    measurementId: "G-VY4JSL70QV"
};

// Initialize
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

