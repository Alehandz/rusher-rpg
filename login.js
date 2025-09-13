import { auth, db } from "./shared/firebase_config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const loginForm = document.getElementById("login-form");
const createAccountForm = document.getElementById("create-account-form");

// Handle Login
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "./player/dashboard.html";
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  });
}

// Handle Create Account
if (createAccountForm) {
  createAccountForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("create-email").value;
    const password = document.getElementById("create-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const characterName = document.getElementById("character-name").value;
    const gender = document.querySelector("input[name='gender']:checked")?.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Create user auth
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // Default character data
      const characterData = {
        name: characterName,
        gender: gender,
        level: 1,
        money: 100,
        health: 100,
        hunger: 100,
        location: "Unknown",
        proficiencies: {
          agriculture: { level: 1, exp: 0 },
          livestock: { level: 1, exp: 0 },
          driver: { level: 1, exp: 0 },
          cook: { level: 1, exp: 0 },
          lawyer: { level: 1, exp: 0 },
          construction: { level: 1, exp: 0 }
        }
      };

      // Save in Firestore under "players/{uid}"
      await setDoc(doc(db, "players", user.uid), characterData);

      alert("Account created successfully!");
      window.location.href = "./player/dashboard.html";

    } catch (err) {
      alert("Account creation failed: " + err.message);
    }
  });
}
