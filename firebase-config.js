// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6mCI-HYEjU98mfNo7DHjAUOcx7od6uuM",
  authDomain: "crack-a-joke-4be0d.firebaseapp.com",
  projectId: "crack-a-joke-4be0d",
  storageBucket: "crack-a-joke-4be0d.firebasestorage.app",
  messagingSenderId: "3121265318",
  appId: "1:3121265318:web:ae2a4a686e56c4742f5267",
  measurementId: "G-SXZ523XG19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export db to use in other files if needed
export { db };
