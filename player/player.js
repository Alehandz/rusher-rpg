// player/player.js
import { auth } from '../shared/firebase_config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const userEmailSpan = document.getElementById('user-email');
const logoutBtn = document.getElementById('logout-btn');

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuário logado:", user.email);
    if (userEmailSpan) userEmailSpan.textContent = user.email;
  } else {
    console.log("Nenhum usuário logado, redirecionando...");
    window.location.href = "../login.html";
  }
});

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      await signOut(auth);
      window.location.href = "../login.html";
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  });
}
