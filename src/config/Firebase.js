// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: .env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "do-rering.firebaseapp.com",
  projectId: "do-rering",
  storageBucket: "do-rering.appspot.com",
  messagingSenderId: "951803853877",
  appId: "1:951803853877:web:cdd0ceacaff1b77096457c",
  measurementId: "G-ZWT8F8040G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);