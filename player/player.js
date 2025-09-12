import { auth, db } from '../shared/firebase_config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const characterNameSpans = document.querySelectorAll('#character-name');
const welcomeMessage = document.getElementById('welcome-message');
const logoutBtn = document.getElementById('logout-btn');

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userId = user.uid;
    const docRef = doc(db, 'players', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      characterNameSpans.forEach(span => span.textContent = data.characterName || 'Unknown');
      if (welcomeMessage) welcomeMessage.textContent = `Welcome, ${data.characterName || 'Unknown'}!`;
    } else {
      characterNameSpans.forEach(span => span.textContent = 'Unknown');
      if (welcomeMessage) welcomeMessage.textContent = 'Welcome!';
    }

  } else {
    window.location.href = '../login.html';
  }
});

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await auth.signOut();
    window.location.href = '../login.html';
  });
}
