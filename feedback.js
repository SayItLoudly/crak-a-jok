// Import Firebase configurations and Firestore methods
import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';

// Select DOM elements
const feedbackInput = document.getElementById('feedbackInput');
const submitFeedback = document.getElementById('submitFeedback');
const feedbackStatus = document.getElementById('feedbackStatus');

// Event listener for feedback submission
submitFeedback.addEventListener('click', async () => {
  const feedback = feedbackInput.value.trim(); // Get the user's feedback

  if (feedback) {
    try {
      // Debugging step: Log the feedback being submitted
      console.log('Submitting feedback:', feedback);

      // Add feedback to Firestore
      await addDoc(collection(db, 'feedbacks'), {
        feedback: feedback,
        timestamp: serverTimestamp(), // Record the server time
      });

      // Debugging step: Log success
      console.log('Feedback submitted successfully!');

      // Clear the feedback input field
      feedbackInput.value = '';

      // Update the UI to show success message
      feedbackStatus.textContent = 'Thank you for your feedback!';
      feedbackStatus.style.display = 'block'; // Show the success message
      feedbackInput.style.display = 'none';  // Hide the input field
      submitFeedback.style.display = 'none'; // Hide the submit button
    } catch (error) {
      // Log any error that occurs
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting your feedback. Please try again later.');
    }
  } else {
    // If the feedback field is empty, alert the user
    alert('Please write feedback before submitting!');
  }
});
