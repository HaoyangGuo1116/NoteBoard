# Motivational Notes Board
A three-page front-end web project that combines daily motivation with personal reflection.
Users can read random inspirational quotes, create their own digital notes, and manage them on a simple sticky-note-style board — all powered by Firebase Firestore.


## Overview
Motivational Notes Board is a lightweight website designed to encourage users through small moments of inspiration.
It allows users to:
View a random motivational quote each time they visit the homepage.
Create personal notes and save them using Firebase.
View and delete their notes on a “notes board” page.

## Features

| Feature | Description |
|----------|-------------|
| Random Quote Page | Displays a random inspirational message from a local dataset. |
| Notes Board | Lists all saved notes from Firebase in a sticky-note grid. |
| Create Note | Allows users to write and save new notes to the database. |
| Delete Note | Removes a note from Firebase instantly. |
| Firebase Storage | Stores notes securely in Firestore (no backend server required). |
| Responsive Design | Works smoothly across desktop and mobile devices. |


## Project Structure
```text
project-root/
├── index.html                      # Random quote page
├── notes.html                      # Notes board page
├── create.html                     # Create new note page
├── /assets
│   ├── /css
│   │   └── style.css               # Shared styles for all pages
│   └── /js
│       ├── quotes.js               # Random quote generator
│       ├── firebase-config.js      # Firebase initialization
│       ├── create-note.js          # Note creation logic
│       └── notes.js                # Notes display + delete logic
└── README.md
```
