import { db } from '../../shared/firebase_config.js';

console.log('Resources Manager loaded');

function initManager() {
    const content = document.getElementById('manager-content');
    content.innerHTML = '<p>Resources Manager ready. You can manage game resources here.</p>';
}

initManager();

