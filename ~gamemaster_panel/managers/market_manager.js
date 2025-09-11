import { db } from '../../shared/firebase_config.js';

console.log('Market Manager loaded');

function initManager() {
    const content = document.getElementById('manager-content');
    content.innerHTML = '<p>Market Manager ready. You can manage market offers here.</p>';
}

initManager();

