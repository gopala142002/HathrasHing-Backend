import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDFjWYOuOxXpbnInzTi2h4cAGWzY8eM1ak",
  authDomain: "hathrashing.firebaseapp.com",
  projectId: "hathrashing",
  storageBucket: "hathrashing.appspot.com",
  messagingSenderId: "134186296335",
  appId: "1:134186296335:web:76dd04ac15a241f2b7af7a",
  measurementId: "G-8RKBR7PX2X"
};
export const app=initializeApp(firebaseConfig);
export const database=getFirestore(app);
export const storage=getStorage();
