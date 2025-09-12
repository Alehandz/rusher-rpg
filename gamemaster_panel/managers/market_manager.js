import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "../../shared/firebase_config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM References
const offerList = document.getElementById('offer-list');
const createPremadeBtn = document.getElementById('create-premade-offer');
const searchInput = document.getElementById('search-offers');

// Global offers store
let offersData = [];

// --- Functions ---
async function fetchOffers() {
  const snapshot = await getDocs(collection(db, 'marketOffers'));
  offersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  renderOffers();
}

function renderOffers() {
  const searchText = searchInput.value.toLowerCase();
  const filtered = offersData.filter(o => o.itemName.toLowerCase().includes(searchText));

  offerList.innerHTML = '';
  if (filtered.length === 0) {
    offerList.innerHTML = '<p class="text-center text-gray-500">No offers found.</p>';
    return;
  }

  filtered.forEach(offer => {
    const div = document.createElement('div');
    div.className = 'offer-row bg-[#36393f] p-3 rounded-md flex justify-between items-center';
    div.innerHTML = `
      <span>${offer.itemName} — $${offer.price} x${offer.quantity}</span>
      <button class="delete-btn bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600" data-id="${offer.id}">Delete</button>
    `;
    offerList.appendChild(div);
  });

  attachOfferListeners();
}

function attachOfferListeners() {
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      await deleteDoc(doc(db, 'marketOffers', id));
      fetchOffers();
    };
  });
}

async function createPremadeOffer() {
  const newOffer = {
    itemName: "Premade Item",
    price: 1,
    quantity: 999999, // practically unlimited for testing
    createdAt: Date.now()
  };
  await addDoc(collection(db, 'marketOffers'), newOffer);
  fetchOffers();
}

// --- Event Listeners ---
createPremadeBtn.addEventListener('click', createPremadeOffer);
searchInput.addEventListener('input', renderOffers);

// --- Init ---
fetchOffers();
