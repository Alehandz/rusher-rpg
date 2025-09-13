// player/player.js
import { auth, db } from "../shared/firebase_config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// DOM elements for character info
const charNameSpans = document.querySelectorAll("#character-name");
const charLevelSpans = document.querySelectorAll("#character-level");
const charMoneySpans = document.querySelectorAll("#character-money");
const charLocationSpan = document.getElementById("character-location");
const healthBar = document.getElementById("health-bar");
const hungerBar = document.getElementById("hunger-bar");

// Proficiency elements
const proficiencies = [
  "agriculture",
  "livestock",
  "driver",
  "cook",
  "lawyer",
  "construction"
].map(skill => ({
  level: document.getElementById(`${skill}-level`),
  exp: document.getElementById(`${skill}-exp`)
}));

// Update character info in DOM
function updateCharacterUI(characterData) {
  charNameSpans.forEach(el => el.textContent = characterData.name);
  charLevelSpans.forEach(el => el.textContent = characterData.level || 1);
  charMoneySpans.forEach(el => el.textContent = characterData.money || 0);

  if (charLocationSpan) charLocationSpan.textContent = characterData.location || "Unknown";

  if (healthBar) healthBar.style.width = `${characterData.health || 100}%`;
  if (hungerBar) hungerBar.style.width = `${characterData.hunger || 100}%`;

  // Update proficiencies
  if (characterData.proficiencies) {
    proficiencies.forEach(({level, exp}, idx) => {
      const key = Object.keys(characterData.proficiencies)[idx];
      if(level) level.textContent = characterData.proficiencies[key].level || 1;
      if(exp) exp.textContent = characterData.proficiencies[key].exp || 0;
    });
  }
}

// Auth listener
onAuthStateChanged(auth, async user => {
  if (user) {
    try {
      // Fetch character data from Firestore
      const charRef = doc(db, "players", user.uid);
      const charSnap = await getDoc(charRef);

      if (charSnap.exists()) {
        const charData = charSnap.data();
        console.log("Character loaded:", charData);
        updateCharacterUI(charData);
      } else {
        console.log("No character data found. Redirecting to create account...");
        window.location.href = "../login.html"; // or your create character page
      }
    } catch (err) {
      console.error("Error fetching character data:", err);
    }
  } else {
    console.log("User not logged in. Redirecting...");
    window.location.href = "../login.html";
  }
});
