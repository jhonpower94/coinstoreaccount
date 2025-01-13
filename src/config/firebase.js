import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Set up Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDBBEUYFvU8Ys4R_xneFC1KxOkTly0Qm8s",
  authDomain: "coinstore-db7b9.firebaseapp.com",
  projectId: "coinstore-db7b9",
  storageBucket: "coinstore-db7b9.firebasestorage.app",
  messagingSenderId: "1036136380099",
  appId: "1:1036136380099:web:399c10d4dcd353cf4b1476"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);

const storage = getStorage(app);

// Listen only for logged in state

export {
  app,
  auth,
  db,
  storage,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
};
