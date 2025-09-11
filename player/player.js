import { getAuth, signOut } from '../shared/utils.js';
import { initializeApp } from '../shared/firebase_config.js';

const app = initializeApp();
const auth = getAuth();

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');

  logoutBtn.addEventListener('click', async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully!');
      window.location.href = '../login.html';
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Check console.');
    }
  });

  console.log('Player dashboard loaded.');
});

