import { auth, db } from '../shared/firebase_config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
  const characterName = document.getElementById('character-name');
  const characterLevel = document.getElementById('character-level');
  const characterMoney = document.getElementById('character-money');
  const healthBar = document.getElementById('health-bar');
  const hungerBar = document.getElementById('hunger-bar');
  const logoutBtn = document.getElementById('logout-btn');

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Fetch user data from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        characterName.textContent = data.name || "Unknown";
        characterLevel.textContent = data.level || 1;
        characterMoney.textContent = data.money || 0;
        healthBar.style.width = (data.health || 100) + "%";
        hungerBar.style.width = (data.hunger || 100) + "%";
      } else {
        console.log("No user data found, please create a new account!");
      }
    } else {
      window.location.href = "../login.html";
    }
  });

  // Logout
  logoutBtn.addEventListener('click', async () => {
    try {
      await signOut(auth);
      window.location.href = "../login.html";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  });
});
