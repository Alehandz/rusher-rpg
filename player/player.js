// player/player.js
import { auth, db } from '../shared/firebase_config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// DOM elements
const userEmailSpan = document.getElementById('user-email');
const logoutBtn = document.getElementById('logout-btn');

const characterName = document.getElementById('character-name');
const characterLevel = document.getElementById('character-level');
const characterMoney = document.getElementById('character-money');
const healthBar = document.getElementById('health-bar');
const hungerBar = document.getElementById('hunger-bar');

// Monitor auth state
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User logged in:", user.email);
    userEmailSpan.textContent = user.email;

    // Fetch player data from Firestore
    const docRef = doc(db, "players", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      characterName.textContent = data.name || "Unknown";
      characterLevel.textContent = data.level || 1;
      characterMoney.textContent = data.money || 0;

      // Update bars (assume values 0-100)
      healthBar.style.width = (data.health || 100) + "%";
      hungerBar.style.width = (data.hunger || 100) + "%";

    } else {
      console.log("No player data found, creating default...");
      characterName.textContent = "New Player";
      characterLevel.textContent = 1;
      characterMoney.textContent = 0;
      healthBar.style.width = "100%";
      hungerBar.style.width = "100%";
    }

  } else {
    console.log("No user logged in, redirecting...");
    window.location.href = "../login.html";
  }
});

// Logout button
logoutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
    window.location.href = "../login.html";
  } catch (error) {
    console.error("Error signing out:", error);
  }
});
