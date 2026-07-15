import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDoc, doc, setDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// TODO: REPLACE THIS OBJECT WITH YOUR FIREBASE CONFIGURATION
// 1. Go to Firebase Console (console.firebase.google.com)
// 2. Open Project Settings (Gear icon)
// 3. Scroll down to "Your apps", select the Web icon (</>), register an app
// 4. Copy the firebaseConfig object and paste it here:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);

// Export useful functions so we can import them in other scripts
export { collection, addDoc, getDoc, doc, setDoc, query, where, getDocs, ref, uploadBytes, getDownloadURL };
