import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "../../shared/firebase_config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 
// DOM References
const itemNameInput = document.getElementById('item-name');
const itemParentsInput = document.getElementById('item-parents');
const itemBuildtimeInput = document.getElementById('item-buildtime');
const itemGroupInput = document.getElementById('item-group');
const createItemBtn = document.getElementById('create-item');
const itemList = document.getElementById('item-list');

// Global item store
let itemsData = [];

// --- Functions ---
async function fetchItems() {
  const snapshot = await getDocs(collection(db, 'items'));
  itemsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  renderItems();
}

function renderItems() {
  itemList.innerHTML = '';
  if (itemsData.length === 0) {
    itemList.innerHTML = '<p class="text-center text-gray-500">No items yet.</p>';
    return;
  }

  itemsData.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item-row bg-[#36393f] p-3 rounded-md flex justify-between items-center';
    div.innerHTML = `
      <span>${item.name} — Parents: ${item.parents} — Build Time: ${item.buildTime}s — Group: ${item.group}</span>
      <button class="delete-btn bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600" data-id="${item.id}">Delete</button>
    `;
    itemList.appendChild(div);
  });

  attachItemListeners();
}

function attachItemListeners() {
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      await deleteDoc(doc(db, 'items', id));
      fetchItems();
    };
  });
}

async function createItem() {
  const name = itemNameInput.value.trim();
  const parents = itemParentsInput.value.trim();
  const buildTime = parseInt(itemBuildtimeInput.value);
  const group = itemGroupInput.value.trim();

  if (!name || !parents || !buildTime || !group) {
    alert("Please fill all fields.");
    return;
  }

  const newItem = { name, parents, buildTime, group, createdAt: Date.now() };
  await addDoc(collection(db, 'items'), newItem);

  // Reset inputs
  itemNameInput.value = '';
  itemParentsInput.value = '';
  itemBuildtimeInput.value = '';
  itemGroupInput.value = '';

  fetchItems();
}

// --- Event Listeners ---
createItemBtn.addEventListener('click', createItem);

// --- Init ---
fetchItems();
