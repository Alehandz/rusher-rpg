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
  const mainContent = document.getElementById('main-content');

  // Check if user is logged in
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("User logged in:", user.email);

      // Fetch character data from Firestore
      try {
        const docRef = doc(db, "players", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          characterName.textContent = data.name || "Unknown";
          characterLevel.textContent = data.level || 1;
          characterMoney.textContent = data.money || 0;
          healthBar.style.width = `${data.health || 75}%`;
          hungerBar.style.width = `${data.hunger || 50}%`;
        } else {
          console.log("No character data found, using defaults");
        }
      } catch (error) {
        console.error("Error fetching character data:", error);
      }

    } else {
      console.log("No user logged in, redirecting...");
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

  // Section navigation
  const sectionContent = {
    character: `
      <h2 class="text-xl font-bold mb-4">Character</h2>
      <p>This is where character details and upgrades will appear.</p>
    `,
    market: `
      <h2 class="text-xl font-bold mb-4">Market</h2>
      <p>Here you will be able to buy and sell items.</p>
    `,
    job: `
      <h2 class="text-xl font-bold mb-4">Job Offers</h2>
      <p>Find work opportunities to earn money and experience.</p>
    `,
    inventory: `
      <h2 class="text-xl font-bold mb-4">Inventory</h2>
      <p>Check the items you currently own here.</p>
    `
  };

  document.querySelectorAll("button[data-section]").forEach(btn => {
    btn.addEventListener("click", () => {
      const section = btn.getAttribute("data-section");
      mainContent.innerHTML = sectionContent[section] || "<p>Section not found.</p>";
    });
  });

});
