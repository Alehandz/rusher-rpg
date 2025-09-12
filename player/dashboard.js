import { auth } from "../shared/firebase_config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

function setupLogout() {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await signOut(auth);
      window.location.href = "../login.html";
    });
  }
}

// Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.email);
    document.getElementById("user-email").textContent = user.email;
    setupLogout();
  } else {
    console.log("No user logged in, redirecting...");
    window.location.href = "../login.html";
  }
});
