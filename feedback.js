// Import Firebase Firestore methods
import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Select elements
const feedbackInput = document.getElementById("feedbackInput");
const submitFeedback = document.getElementById("submitFeedback"); // Matching ID
const feedbackSuccess = document.getElementById("feedbackSuccess");

// Debugging log to confirm script is loaded
console.log("feedback.js loaded successfully.");

// Add feedback to Firestore
submitFeedback.addEventListener("click", async (e) => {
  e.preventDefault(); // Prevent page reload
  const feedback = feedbackInput.value.trim();

  // Debug input value
  console.log("Feedback submitted:", feedback);

  if (feedback) {
    try {
      await addDoc(collection(db, "feedbacks"), {
        feedback: feedback,
        timestamp: serverTimestamp(), // Add server timestamp
      });

      // Debug success
      console.log("Feedback successfully added to Firestore.");

      // Show success message
      feedbackInput.style.display = "none";
      submitFeedback.style.display = "none";
      feedbackSuccess.style.display = "block";
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  } else {
    alert("Please write some feedback before submitting.");
  }
});
