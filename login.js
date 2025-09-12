import { auth, db } from './shared/firebase_config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// ===== SELECT DOM ELEMENTS =====
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

const openCreateAccountBtn = document.getElementById('open-create-account');
const createAccountModal = document.getElementById('create-account-modal');
const closeModalBtn = document.getElementById('close-modal');
const createAccountForm = document.getElementById('create-account-form');
const createErrorMessage = document.getElementById('create-error-message');

// ===== LOGIN FUNCTION =====
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "./player/dashboard.html";
  } catch (error) {
    errorMessage.textContent = error.message;
  }
});

// ===== OPEN/CLOSE CREATE ACCOUNT MODAL =====
openCreateAccountBtn.addEventListener('click', () => {
  createAccountModal.classList.remove('hidden');
});
closeModalBtn.addEventListener('click', () => {
  createAccountModal.classList.add('hidden');
});

// ===== CREATE ACCOUNT FUNCTION =====
createAccountForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('character-name').value;
  const gender = document.getElementById('character-gender').value;
  const email = document.getElementById('create-email').value;
  const password = document.getElementById('create-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    createErrorMessage.textContent = "Senhas não coincidem!";
    return;
  }

  try {
    // Criar usuário no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Salvar dados adicionais no Firestore
    await setDoc(doc(db, "users", user.uid), {
      characterName: name,
      gender: gender,
      email: email,
      createdAt: new Date()
    });

    // Redirecionar para dashboard
    window.location.href = "./player/dashboard.html";

  } catch (error) {
    createErrorMessage.textContent = error.message;
  }
});
