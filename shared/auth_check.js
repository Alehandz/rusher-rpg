// shared/auth_check.js
import { auth } from "./firebase_config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // If no user logged in → kick to login page
    window.location.href = "../login.html";
  } else {
    // If logged in → update navbar with email
    const emailSpan = document.getElementById("user-email");
    if (emailSpan) {
      emailSpan.textContent = user.email;
    }

    // Attach logout handler if navbar is loaded
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        await signOut(auth);
        window.location.href = "../login.html";
      });
    }
  }
});
