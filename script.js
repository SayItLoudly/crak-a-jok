// Import Firestore methods
import { db } from './firebase-config.js';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Select elements
const jokeInput = document.getElementById("jokeInput");
const submitJoke = document.getElementById("submitJoke");
const jokeList = document.getElementById("jokeList");

// Add a joke to Firestore
submitJoke.addEventListener("click", async () => {
  const joke = jokeInput.value.trim();

  if (joke) {
    try {
      await addDoc(collection(db, "jokes"), {
        joke: joke,
        timestamp: serverTimestamp(),
      });
      jokeInput.value = ""; // Clear input field
    } catch (error) {
      console.error("Error adding joke: ", error);
    }
  } else {
    alert("Please write a joke before submitting!");
  }
});

// Fetch jokes and display them in real time
const q = query(collection(db, "jokes"), orderBy("timestamp", "desc"));
onSnapshot(q, (snapshot) => {
  jokeList.innerHTML = ""; // Clear previous jokes
  snapshot.forEach((doc) => {
    const jokeData = doc.data();
    const div = document.createElement("div");
    div.textContent = jokeData.joke;
    jokeList.appendChild(div);
  });
});
