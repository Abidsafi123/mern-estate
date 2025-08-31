// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-1d8f6.firebaseapp.com",
  projectId: "mern-estate-1d8f6",
  storageBucket: "mern-estate-1d8f6.firebasestorage.app",
  messagingSenderId: "834615982559",
  appId: "1:834615982559:web:ce1d17d838ca460dbcec6a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);