// Importando apenas o que precisamos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAReb65bsaoa145J5Yu2R61nrr4vvmqBiQ",
  authDomain: "demand-rusher.firebaseapp.com",
  projectId: "demand-rusher",
  storageBucket: "demand-rusher.firebasestorage.app",
  messagingSenderId: "491613307536",
  appId: "1:491613307536:web:52f3339b4f12ef7418ce15",
  measurementId: "G-VY4JSL70QV"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Exporta apenas o que vamos usar
export { app, auth };
