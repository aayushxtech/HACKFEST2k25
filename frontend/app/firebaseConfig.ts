// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCDQzKqvHYdCSDEKng-Yqc_j4UfVEOQaY",
  authDomain: "saksham-community.firebaseapp.com",
  projectId: "saksham-community",
  storageBucket: "saksham-community.appspot.com", // Make sure this is set
  messagingSenderId: "213239820836",
  appId: "1:213239820836:web:813322d9d21ee44e4bdeb1",
  // measurementId: "G-78TJYWYDYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize storage
const storage = getStorage(app);

export { storage };