import "./theme.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { db } from "./firebase-config.js";

const notesGrid = document.querySelector(".notes-grid");
const loadingIndicator = document.querySelector("[data-loading]");
const emptyState = document.querySelector("[data-empty-state]");

async function fetchNotes() {
  try {
    showLoading(true);
    const snapshot = await getDocs(collection(db, "notes"));
    const notes = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data()
    }));
    renderNotes(notes);
  } catch (error) {
    console.error("Failed to load notes:", error);
    showLoading(false);
    showEmptyState("Could not load notes. Please try again later.");
  }
}

function renderNotes(notes) {
  showLoading(false);
  if (!notes || notes.length === 0) {
    showEmptyState("No notes yet. Create your first inspiring message!");
    return;
  }

  hideEmptyState();
  const fragment = document.createDocumentFragment();

  notes.forEach((note) => {
    fragment.appendChild(createNoteElement(note));
  });

  notesGrid.innerHTML = "";
  notesGrid.appendChild(fragment);
}

function createNoteElement(note) {
  const card = document.createElement("article");
  card.className = "sticky-card note-card";
  card.dataset.noteId = note.id;

  const deleteButton = document.createElement("button");
  deleteButton.className = "note-card__delete";
  deleteButton.type = "button";
  deleteButton.title = "Delete note";
  deleteButton.innerHTML = "&times;";
  deleteButton.addEventListener("click", () => handleDelete(note.id));

  const content = document.createElement("p");
  content.className = "note-card__content";
  content.textContent = note.content ?? "";

  card.appendChild(deleteButton);
  card.appendChild(content);
  return card;
}

async function handleDelete(noteId) {
  const confirmed = window.confirm("Are you sure you want to delete this note?");
  if (!confirmed) {
    return;
  }

  try {
    const noteRef = doc(db, "notes", noteId);
    await deleteDoc(noteRef);
    removeNoteFromUI(noteId);
  } catch (error) {
    console.error("Failed to delete note:", error);
    alert("Could not delete the note. Please try again.");
  }
}

function removeNoteFromUI(noteId) {
  const card = notesGrid.querySelector(`[data-note-id="${noteId}"]`);
  if (!card) {
    return;
  }
  card.classList.add("fade-out");
  setTimeout(() => {
    card.remove();
    if (!notesGrid.children.length) {
      showEmptyState("No notes yet. Create your first inspiring message!");
    }
  }, 200);
}

function showLoading(visible) {
  if (!loadingIndicator) return;
  loadingIndicator.style.display = visible ? "block" : "none";
}

function showEmptyState(message) {
  if (!emptyState) return;
  emptyState.textContent = message;
  emptyState.style.display = "block";
  notesGrid.innerHTML = "";
}

function hideEmptyState() {
  if (!emptyState) return;
  emptyState.style.display = "none";
}

fetchNotes();

