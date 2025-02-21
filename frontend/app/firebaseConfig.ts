// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // Add this import
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
//   measurementId: "G-78TJYWYDYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);  // Add this export