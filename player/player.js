// player/player.js
import { auth, db, provider, onAuthStateChanged } from '../shared/firebase_config.js';

// Example: check login state
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.displayName);
        // redirect to main game page
        window.location.href = "./game.html";
    } else {
        console.log("No user logged in");
    }
});

// Example: Google login button
const loginBtn = document.getElementById("login-btn");
if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
        try {
            await auth.signInWithPopup(provider);
            console.log("Login successful");
        } catch (error) {
            console.error("Login error:", error);
        }
    });
}
