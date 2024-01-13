// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "issuetracker-by-nilay-patel.firebaseapp.com",
  projectId: "issuetracker-by-nilay-patel",
  storageBucket: "issuetracker-by-nilay-patel.appspot.com",
  messagingSenderId: "995906675161",
  appId: "1:995906675161:web:981fc88b263d1a355eb9c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);