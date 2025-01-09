import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Select elements
const feedbackInput = document.getElementById("feedbackInput");
const sendFeedback = document.getElementById("sendFeedback");
const feedbackSuccess = document.getElementById("feedbackSuccess");

// Add feedback to Firestore
sendFeedback.addEventListener("click", async () => {
  const feedback = feedbackInput.value.trim();

  if (feedback) {
    try {
      await addDoc(collection(db, "feedback"), {
        feedback: feedback,
        timestamp: serverTimestamp(),
      });
      feedbackInput.style.display = "none";
      sendFeedback.style.display = "none";
      feedbackSuccess.style.display = "block";
    } catch (error) {
      console.error("Error sending feedback: ", error);
    }
  } else {
    alert("Please write some feedback before sending!");
  }
});
