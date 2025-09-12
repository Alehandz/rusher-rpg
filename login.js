import { auth } from '../shared/firebase_config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Usuário logado:", user.email);

    // Redireciona para a página principal do jogo
    window.location.href = "player/index.html"; 
  } catch (error) {
    console.error("Erro ao logar:", error);
    errorMessage.textContent = error.message;
  }
});
