import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDoc, doc, setDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// TODO: REPLACE THIS OBJECT WITH YOUR FIREBASE CONFIGURATION
// 1. Go to Firebase Console (console.firebase.google.com)
// 2. Open Project Settings (Gear icon)
// 3. Scroll down to "Your apps", select the Web icon (</>), register an app
// 4. Copy the firebaseConfig object and paste it here:
const firebaseConfig = {
  apiKey: "AIzaSyDPwMDQGu4VUEQYI65Vw3SwZdJHtOx4hGI",
  authDomain: "shubaaram-3960c.firebaseapp.com",
  projectId: "shubaaram-3960c",
  storageBucket: "shubaaram-3960c.firebasestorage.app",
  messagingSenderId: "51273456150",
  appId: "1:51273456150:web:3af81e2858fbf34d7cb337",
  measurementId: "G-E46E4KGS1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);

// Export useful functions so we can import them in other scripts
export { collection, addDoc, getDoc, doc, setDoc, query, where, getDocs, ref, uploadBytes, getDownloadURL };
