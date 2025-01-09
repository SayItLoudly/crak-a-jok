import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';

const feedbackInput = document.getElementById('feedbackInput');
const submitFeedback = document.getElementById('submitFeedback');
const feedbackStatus = document.getElementById('feedbackStatus');

submitFeedback.addEventListener('click', async () => {
  const feedback = feedbackInput.value.trim();

  if (feedback) {
    try {
      await addDoc(collection(db, 'feedbacks'), {
        feedback: feedback,
        timestamp: serverTimestamp(),
      });

      feedbackInput.value = ''; // Clear feedback input
      feedbackStatus.textContent = 'Thank you for your feedback!';
      feedbackStatus.style.display = 'block'; // Show success message
      feedbackInput.style.display = 'none';  // Hide feedback input
      submitFeedback.style.display = 'none'; // Hide submit button
    } catch (error) {
      console.error('Error submitting feedback: ', error);
    }
  } else {
    alert('Please write feedback before submitting!');
  }
});
