import {
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { db } from "./firebase-config.js";

const form = document.querySelector("#create-note-form");
const textArea = document.querySelector("#note-content");
const feedback = document.querySelector("[data-feedback]");
const submitButton = document.querySelector("[data-submit]");
const cancelButton = document.querySelector("[data-cancel]");

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (cancelButton) {
  cancelButton.addEventListener("click", () => {
    window.location.href = "notes.html";
  });
}

async function handleSubmit(event) {
  event.preventDefault();
  if (!textArea) return;

  const noteContent = textArea.value.trim();
  if (!noteContent) {
    alert("Note content cannot be empty.");
    textArea.focus();
    return;
  }

  setLoading(true);

  try {
    await addDoc(collection(db, "notes"), {
      content: noteContent,
      createdAt: serverTimestamp()
    });
    showFeedback("Saved successfully! Redirecting to your notes…");
    textArea.value = "";
    setTimeout(() => {
      window.location.href = "notes.html";
    }, 1300);
  } catch (error) {
    console.error("Failed to save note:", error);
    alert("Could not save the note. Please try again.");
  } finally {
    setLoading(false);
  }
}

function showFeedback(message) {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.classList.add("feedback--visible");
}

function setLoading(isLoading) {
  if (submitButton) {
    submitButton.disabled = isLoading;
    submitButton.textContent = isLoading ? "Saving…" : "Save";
  }
  if (feedback && !isLoading) {
    feedback.classList.remove("feedback--visible");
    feedback.textContent = "";
  }
}

