// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCDQzKqvHYdCSDEKng-Yqc_j4UfVEOQaY",
  authDomain: "saksham-community.firebaseapp.com",
  projectId: "saksham-community",
  storageBucket: "saksham-community.firebasestorage.app",
  messagingSenderId: "213239820836",
  appId: "1:213239820836:web:813322d9d21ee44e4bdeb1",
  measurementId: "G-78TJYWYDYG"
};

// Initialize Firebase only if it hasn't been initialized
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const analytics = getAnalytics(app);

// Initialize and export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);