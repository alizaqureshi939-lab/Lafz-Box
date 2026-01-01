// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtTMOI5twBKIQaE7q7gCELWrrybS_ulH4",
  authDomain: "lafz-box.firebaseapp.com",
  projectId: "lafz-box",
  storageBucket: "lafz-box.firebasestorage.app",
  messagingSenderId: "988478084150",
  appId: "1:988478084150:web:697f278746a99d0e203497"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);