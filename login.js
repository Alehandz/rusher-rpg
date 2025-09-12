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

createAccountForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('new-name').value;
  const gender = document.getElementById('new-gender').value;
  const email = document.getElementById('new-email').value;
  const password = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    createErrorMessage.textContent = "Passwords do not match!";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Save extra info to Firestore
    await setDoc(doc(db, "players", uid), {
      name,
      gender,
      email,
      createdAt: new Date()
    });

    alert("Account created successfully! You can now login.");
    createAccountModal.classList.add('hidden');
    createAccountForm.reset();
    createErrorMessage.textContent = '';
  } catch (error) {
    createErrorMessage.textContent = error.message;
  }
});
