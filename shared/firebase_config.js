// shared/firebase_config.js

// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD4f8b6d8d8e8d8d8d8d8d8d8d8d8d8d8d8d8d8",
  authDomain: "demand-rusher.firebaseapp.com",
  projectId: "demand-rusher",
  storageBucket: "demand-rusher.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef",
  measurementId: "G-1ABC2DEF3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export for other scripts
export { app, auth, db };
