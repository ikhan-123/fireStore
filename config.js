// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_a5yWWbeUqtVveSdp_UpZqOtBaEgSiQs",
  authDomain: "todo-app-78f0c.firebaseapp.com",
  projectId: "todo-app-78f0c",
  storageBucket: "todo-app-78f0c.appspot.com",
  messagingSenderId: "200953292119",
  appId: "1:200953292119:web:1713df8c4696e699404a12",
  measurementId: "G-VXMPP55F1D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);