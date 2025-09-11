import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "../../shared/firebase_config.js"; // your shared config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM References
const form = document.getElementById('create-item-form');
const nameInput = document.getElementById('item-name');
const parentsInput = document.getElementById('item-parents');
const timeInput = document.getElementById('item-time');
const groupInput = document.getElementById('item-group');
const itemList = document.getElementById('item-list');
const searchInput = document.getElementById('search-items');
const filterGroup = document.getElementById('filter-group');

// Global items store
let itemsData = [];

// --- Functions ---
async function fetchItems() {
  const snapshot = await getDocs(collection(db, 'items'));
  itemsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  renderItems();
  populateFilterGroups();
}

function renderItems() {
  const searchText = searchInput.value.toLowerCase();
  const groupFilter = filterGroup.value;
  const filtered = itemsData.filter(item => 
    item.name.toLowerCase().includes(searchText) && 
    (groupFilter === "" || item.group === groupFilter)
  );

  itemList.innerHTML = '';
  if (filtered.length === 0) {
    itemList.innerHTML = '<p class="text-center text-gray-500">No items found.</p>';
    return;
  }

  filtered.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item-row bg-[#36393f] p-3 rounded-md flex justify-between items-center';
    div.innerHTML = `
      <span>${item.name} (${item.group || 'No Group'})</span>
      <div class="space-x-2">
        <button class="edit-btn bg-[#7289da] text-white py-1 px-2 rounded hover:bg-[#6273c5]" data-id="${item.id}">Edit</button>
        <button class="delete-btn bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600" data-id="${item.id}">Delete</button>
      </div>
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

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const item = itemsData.find(i => i.id === id);
      if (!item) return;
      // populate form for editing
      nameInput.value = item.name;
      parentsInput.value = item.parents || '';
      timeInput.value = item.time || 0;
      groupInput.value = item.group || '';
      // remove old item on save
      btn.disabled = true; // temporarily disable this edit button
      form.onsubmit = async (e) => {
        e.preventDefault();
        await deleteDoc(doc(db, 'items', id)); // delete old doc
        await createItem();
        btn.disabled = false;
        form.onsubmit = defaultSubmit;
      };
    };
  });
}

function populateFilterGroups() {
  const groups = [...new Set(itemsData.map(item => item.group).filter(Boolean))];
  filterGroup.innerHTML = '<option value="">All Groups</option>';
  groups.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = g;
    filterGroup.appendChild(opt);
  });
}

async function createItem() {
  const newItem = {
    name: nameInput.value,
    parents: parentsInput.value,
    time: parseInt(timeInput.value) || 0,
    group: groupInput.value
  };
  await addDoc(collection(db, 'items'), newItem);
  form.reset();
  fetchItems();
}

// --- Event Listeners ---
const defaultSubmit = async (e) => {
  e.preventDefault();
  await createItem();
};
form.addEventListener('submit', defaultSubmit);
searchInput.addEventListener('input', renderItems);
filterGroup.addEventListener('change', renderItems);

// --- Init ---
fetchItems();
