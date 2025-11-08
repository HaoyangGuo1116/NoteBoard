import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBOPRTo7MoJf0Xx0TeigLt8mp5ZLeKQG7E",
  authDomain: "webdev-9a6e4.firebaseapp.com",
  projectId: "webdev-9a6e4",
  storageBucket: "webdev-9a6e4.firebasestorage.app",
  messagingSenderId: "346442282317",
  appId: "1:346442282317:web:80831876c99b34bd72b304"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
