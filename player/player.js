// player/player.js
import { auth } from '../shared/firebase_config.js';
import { signOutUser, formatDate, getQueryParam } from '../shared/utils.js';

document.addEventListener('DOMContentLoaded', () => {

  // Example: logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      signOutUser();
    });
  }

  // Example: show current user info
  if (auth.currentUser) {
    console.log('Current user:', auth.currentUser.displayName);
  }

});
