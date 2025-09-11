import { db } from '../../shared/firebase_config.js';

console.log('Item Manager loaded');

function initManager() {
    const content = document.getElementById('manager-content');
    content.innerHTML = '<p>Item Manager ready. You can create or edit items here.</p>';
}

initManager();
