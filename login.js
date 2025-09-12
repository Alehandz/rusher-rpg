// login.js
import { auth } from './shared/firebase_config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Redirect to dashboard after successful login
    window.location.href = "./player/dashboard.html";
  } catch (error) {
    console.error("Login failed:", error);
    errorMessage.textContent = "Email ou senha incorretos.";
  }
});
