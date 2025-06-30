import "firebase/firestore";
/* import firebase from "firebase/app"; */
import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey:  process.env.APIKEY,
  authDomain: "pawsome-3ecdf.firebaseapp.com",
  projectId: "pawsome-3ecdf",
  storageBucket: "pawsome-3ecdf.firebasestorage.app",
  messagingSenderId: "975468319931",
  appId: "1:975468319931:web:acf7257acf39858211459e",
  measurementId: "G-YCSVDWTRMZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized:", app.automaticDataCollectionEnabled); 
export const db = getFirestore(app);
console.log("Firestore initialized:", db.app.name);
export const auth = getAuth(app);