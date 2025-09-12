import { auth, db } from "../shared/firebase_config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Wait for navbar to load before binding logout
function setupLogout() {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await signOut(auth);
      window.location.href = "../login.html";
    });
  }
}

// Listen for auth changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User logged in:", user.email);
    setupLogout();

    const userRef = doc(db, "players", user.uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      const data = snap.data();
      document.getElementById("character-name").textContent = data.characterName || "Unknown";
      document.getElementById("character-level").textContent = data.level || 1;
      document.getElementById("character-money").textContent = data.money || 0;

      // Example bars (replace with actual values later)
      document.getElementById("health-bar").style.width = (data.health || 100) + "%";
      document.getElementById("hunger-bar").style.width = (data.hunger || 100) + "%";

      document.getElementById("agriculture-level").textContent = data.agriculture?.level || 0;
      document.getElementById("agriculture-bar").style.width = (data.agriculture?.xp || 0) + "%";

      document.getElementById("livestock-level").textContent = data.livestock?.level || 0;
      document.getElementById("livestock-bar").style.width = (data.livestock?.xp || 0) + "%";

      document.getElementById("driver-level").textContent = data.driver?.level || 0;
      document.getElementById("driver-bar").style.width = (data.driver?.xp || 0) + "%";

      document.getElementById("cook-level").textContent = data.cook?.level || 0;
      document.getElementById("cook-bar").style.width = (data.cook?.xp || 0) + "%";

      document.getElementById("lawyer-level").textContent = data.lawyer?.level || 0;
      document.getElementById("lawyer-bar").style.width = (data.lawyer?.xp || 0) + "%";

      document.getElementById("construction-level").textContent = data.construction?.level || 0;
      document.getElementById("construction-bar").style.width = (data.construction?.xp || 0) + "%";
    } else {
      console.warn("No character data found for this user.");
    }
  } else {
    console.log("No user logged in, redirecting...");
    window.location.href = "../login.html";
  }
});
