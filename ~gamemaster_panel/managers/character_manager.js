import { db } from '../../shared/firebase_config.js';

console.log('Character Manager loaded');

function initManager() {
    const content = document.getElementById('manager-content');
    content.innerHTML = '<p>Character Manager ready. You can manage characters here.</p>';
}

initManager();

