// shared/utils.js

import { auth } from './firebase_config.js';
import { signOut as firebaseSignOut } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

/**
 * Logout the current user
 */
export async function signOutUser() {
  try {
    await firebaseSignOut(auth);
    console.log('User logged out successfully');
    window.location.href = '../login.html';
  } catch (error) {
    console.error('Error signing out:', error);
    alert('Failed to log out. Check console.');
  }
}

/**
 * Simple helper to format timestamps
 */
export function formatDate(timestamp) {
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString();
}

/**
 * Helper to get query parameter from URL
 */
export function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

