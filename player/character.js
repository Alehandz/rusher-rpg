import { auth, db } from "../shared/firebase_config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const logoutBtn = document.getElementById("logout-btn");
const nameSpan = document.getElementById("char-name");
const levelSpan = document.getElementById("char-level");
const moneySpan = document.getElementById("char-money");
const locationSpan = document.getElementById("char-location");
const healthBar = document.getElementById("char-health");
const hungerBar = document.getElementById("char-hunger");
const proficienciesDiv = document.getElementById("proficiencies");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "../login.html";
    return;
  }

  const userDoc = await getDoc(doc(db, "players", user.uid));

  if (userDoc.exists()) {
    const data = userDoc.data();

    nameSpan.textContent = data.characterName || "Unknown";
    levelSpan.textContent = data.level || 1;
    moneySpan.textContent = data.money || 0;
    locationSpan.textContent = data.location || "Unknown";

    // Status
    healthBar.style.width = (data.health || 100) + "%";
    hungerBar.style.width = (data.hunger || 100) + "%";

    // Proficiencies
    const profs = data.proficiencies || {};
    proficienciesDiv.innerHTML = "";
    for (const [skill, value] of Object.entries(profs)) {
      proficienciesDiv.innerHTML += `
        <div>
          <p class="capitalize">${skill} (Lv. ${value.level || 1})</p>
          <div class="w-full bg-gray-700 h-3 rounded">
            <div class="bg-blue-500 h-3 rounded" style="width: ${value.xp || 0}%;"></div>
          </div>
        </div>
      `;
    }
  } else {
    nameSpan.textContent = "Not Found";
  }
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "../login.html";
});
