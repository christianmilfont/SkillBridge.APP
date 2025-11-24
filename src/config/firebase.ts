// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7hI3JSOPKJ7Nfkd2PR5dEETbztFMGYA0",
  authDomain: "skillbridge-app-19682.firebaseapp.com",
  projectId: "skillbridge-app-19682",
  storageBucket: "skillbridge-app-19682.firebasestorage.app",
  messagingSenderId: "866139153632",
  appId: "1:866139153632:web:52aa4a7596a803e8f0dc85",
  measurementId: "G-FNX6Y5E16E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);