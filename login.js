// login.js
import { auth, db } from './shared/firebase_config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// LOGIN FORM
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('error-message');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = './player/dashboard.html'; // Redirect to player dashboard
  } catch (error) {
    loginError.textContent = error.message;
  }
});

// CREATE ACCOUNT FORM
const createAccountForm = document.getElementById('create-account-form');
const createError = document.getElementById('create-error-message');
const createAccountModal = document.getElementById('create-account-modal');

createAccountForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('character-name').value;
  const gender = document.getElementById('character-gender').value;
  const email = document.getElementById('create-email').value;
  const password = document.getElementById('create-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    createError.textContent = "Passwords do not match!";
    return;
  }

  try {
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional info to Firestore
    await setDoc(doc(db, "players", user.uid), {
      characterName: name,
      gender: gender,
      email: email,
      createdAt: new Date()
    });

    // Redirect to dashboard
    window.location.href = './player/dashboard.html';
  } catch (error) {
    createError.textContent = error.message;
  }
});
