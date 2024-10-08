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
  apiKey: "AIzaSyDd8QgHnlD9KZr2xlW-qWo1eT2nvgLq9QE",
  authDomain: "keplaget-9649d.firebaseapp.com",
  projectId: "keplaget-9649d",
  storageBucket: "keplaget-9649d.appspot.com",
  messagingSenderId: "1051602869457",
  appId: "1:1051602869457:web:4c022f19135ce2ec8379f0"
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
