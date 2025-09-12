import { db } from "../../shared/firebase_config.js";
import { 
  collection, addDoc, getDocs, doc, getDoc, setDoc, updateDoc, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// DOM elements
const itemForm = document.getElementById("item-form");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");
const parentSelect = document.getElementById("item-parents");
const itemsContainer = document.getElementById("items-container");

// Format ID as 00001, 00002, ...
function formatId(num) {
  return String(num).padStart(5, "0");
}

// Load parent items into dropdown
async function loadParentItems() {
  const snap = await getDocs(collection(db, "market_items"));
  parentSelect.innerHTML = "";
  snap.forEach(doc => {
    const option = document.createElement("option");
    option.value = doc.id;
    option.textContent = `${doc.data().itemId} - ${doc.data().name}`;
    parentSelect.appendChild(option);
  });
}

// Load existing items list
async function loadItemsList() {
  const snap = await getDocs(collection(db, "market_items"));
  itemsContainer.innerHTML = "";
  snap.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.itemId}: ${data.name} (Qty: ${data.quantity}, Weight: ${data.weight})`;
    itemsContainer.appendChild(li);
  });
}

// Handle form submit
itemForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("item-name").value.trim();
  const weight = parseFloat(document.getElementById("item-weight").value);
  const quantity = parseInt(document.getElementById("item-quantity").value);

  // Collect selected parents
  const selectedParents = Array.from(parentSelect.selectedOptions).map(opt => opt.value);

  try {
    // Get counter doc
    const counterRef = doc(db, "config", "itemCounter");
    const counterSnap = await getDoc(counterRef);
    let lastId = 0;
    if (counterSnap.exists()) {
      lastId = counterSnap.data().lastId || 0;
    }

    const newId = lastId + 1;
    const formattedId = formatId(newId);

    // Add new item
    await addDoc(collection(db, "market_items"), {
      itemId: formattedId,
      name,
      weight,
      quantity,
      parents: selectedParents,
      createdAt: serverTimestamp()
    });

    // Update counter
    await setDoc(counterRef, { lastId: newId });

    // Success
    successMessage.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    itemForm.reset();

    // Reload parents + list
    await loadParentItems();
    await loadItemsList();

  } catch (err) {
    console.error("Error adding item:", err);
    errorMessage.textContent = "Failed to add item: " + err.message;
    errorMessage.classList.remove("hidden");
    successMessage.classList.add("hidden");
  }
});

// Initialize page
loadParentItems();
loadItemsList();
