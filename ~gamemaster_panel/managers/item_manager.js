import { db } from '../../shared/firebase_config.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById('create-item-form');
const itemList = document.getElementById('item-list');
const itemsCollection = collection(db, 'items');

async function renderItems() {
    const snapshot = await getDocs(itemsCollection);
    itemList.innerHTML = '';
    snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement('div');
        div.textContent = `${data.name} | Group: ${data.group} | Build Time: ${data.buildTime}s | Parents: ${data.parents || 'None'}`;
        div.className = 'bg-[#36393f] p-2 rounded-md mb-2';
        itemList.appendChild(div);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('item-name').value;
    const parents = document.getElementById('item-parents').value;
    const buildTime = parseInt(document.getElementById('item-build-time').value);
    const group = document.getElementById('item-group').value;

    if (!name || !group) { alert("Name and group required"); return; }

    await addDoc(itemsCollection, {
        name,
        parents: parents || null,
        buildTime,
        group
    });

    form.reset();
    renderItems();
});

renderItems();

