// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfJJjSC6_CbP25ZWbCpLCb1hi4Y3LCpwQ",
  authDomain: "healthy-hut-cb216.firebaseapp.com",
  projectId: "healthy-hut-cb216",
  storageBucket: "healthy-hut-cb216.appspot.com",
  messagingSenderId: "682935176553",
  appId: "1:682935176553:web:8ea1087dd75432784d81f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();