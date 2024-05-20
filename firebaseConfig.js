import { initializeApp } from 'firebase/app';
import { getFirestore,collection, addDoc, getDocs, updateDoc, deleteDoc  } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDjyFN7QVaW2rB4lEIQEXKIYA8lcV5n21E",
    authDomain: "test-6e5d5.firebaseapp.com",
    projectId: "test-6e5d5",
    storageBucket: "test-6e5d5.appspot.com",
    messagingSenderId: "154041694147",
    appId: "1:154041694147:web:586908b0f53048c84def76",
    measurementId: "G-TRR0923N9L"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db, collection, addDoc, getDocs, updateDoc, deleteDoc}