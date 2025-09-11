import { db } from '../../shared/firebase_config.js';

console.log('Jobs Manager loaded');

function initManager() {
    const content = document.getElementById('manager-content');
    content.innerHTML = '<p>Jobs Manager ready. You can create jobs or quests here.</p>';
}

initManager();

