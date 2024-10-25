// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-EXAMPLE1234567890abcdefgHIJKLMN",
  authDomain: "dosgreywater.firebaseapp.com",
  projectId: "dosgreywater",
  storageBucket: "dosgreywater.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };