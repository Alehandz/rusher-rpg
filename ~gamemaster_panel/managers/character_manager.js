import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "../../shared/firebase_config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM References
const characterNameInput = document.getElementById('character-name');
const characterLevelInput = document.getElementById('character-level');
const characterClassInput = document.getElementById('character-class');
const createCharacterBtn = document.getElementById('create-character');
const characterList = document.getElementById('character-list');

// Global character store
let charactersData = [];

// --- Functions ---
async function fetchCharacters() {
  const snapshot = await getDocs(collection(db, 'characters'));
  charactersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  renderCharacters();
}

function renderCharacters() {
  characterList.innerHTML = '';
  if (charactersData.length === 0) {
    characterList.innerHTML = '<p class="text-center text-gray-500">No characters yet.</p>';
    return;
  }

  charactersData.forEach(char => {
    const div = document.createElement('div');
    div.className = 'character-row bg-[#36393f] p-3 rounded-md flex justify-between items-center';
    div.innerHTML = `
      <span>${char.name} — Level ${char.level} — ${char.class}</span>
      <button class="delete-btn bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600" data-id="${char.id}">Delete</button>
    `;
    characterList.appendChild(div);
  });

  attachCharacterListeners();
}

function attachCharacterListeners() {
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      await deleteDoc(doc(db, 'characters', id));
      fetchCharacters();
    };
  });
}

async function createCharacter() {
  const name = characterNameInput.value.trim();
  const level = parseInt(characterLevelInput.value);
  const charClass = characterClassInput.value.trim();

  if (!name || !level || !charClass) {
    alert("Please fill all fields.");
    return;
  }

  const newChar = { name, level, class: charClass, createdAt: Date.now() };
  await addDoc(collection(db, 'characters'), newChar);

  // Reset inputs
  characterNameInput.value = '';
  characterLevelInput.value = '';
  characterClassInput.value = '';

  fetchCharacters();
}

// --- Event Listeners ---
createCharacterBtn.addEventListener('click', createCharacter);

// --- Init ---
fetchCharacters();
