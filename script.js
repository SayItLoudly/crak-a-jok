// Import Firestore methods
import { db } from './firebase-config.js';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Select elements
const jokeInput = document.getElementById("jokeInput");
const submitJoke = document.getElementById("submitJoke");
const jokeList = document.getElementById("jokeList");

const feedbackButton = document.getElementById("feedbackButton");
const feedbackInput = document.getElementById("feedbackInput");
const submitFeedback = document.getElementById("submitFeedback");
const feedbackStatus = document.getElementById("feedbackStatus");

// Add a joke to Firestore
submitJoke.addEventListener("click", async () => {
  const joke = jokeInput.value.trim();

  if (joke) {
    try {
      await addDoc(collection(db, "jokes"), {
        joke: joke,
        timestamp: serverTimestamp(), // Store server time
      });
      jokeInput.value = ""; // Clear input field
    } catch (error) {
      console.error("Error adding joke: ", error);
    }
  } else {
    alert("Please write a joke before submitting!");
  }
});

// Fetch jokes and display them in real-time
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

// Handle feedback button click
feedbackButton.addEventListener("click", () => {
  feedbackInput.style.display = "block";  // Show feedback input
  submitFeedback.style.display = "block"; // Show submit feedback button
});

// Submit feedback to Firestore
submitFeedback.addEventListener("click", async () => {
  const feedback = feedbackInput.value.trim();

  if (feedback) {
    try {
      await addDoc(collection(db, "feedbacks"), {
        feedback: feedback,
        timestamp: serverTimestamp(),
      });
      feedbackInput.value = "";  // Clear feedback input
      feedbackStatus.textContent = "Thank you for your feedback!"; // Display success message
      feedbackStatus.style.display = "block"; // Show success message
      feedbackInput.style.display = "none";  // Hide feedback input
      submitFeedback.style.display = "none"; // Hide submit button
    } catch (error) {
      console.error("Error submitting feedback: ", error);
    }
  } else {
    alert("Please write feedback before submitting!");
  }
});
