import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkzC-gQGZTR-twKOUPqTR5yo2JW8WkHm0",
  authDomain: "web-dev-todo-list.firebaseapp.com",
  projectId: "web-dev-todo-list",
  storageBucket: "web-dev-todo-list.firebasestorage.app",
  messagingSenderId: "31088576263",
  appId: "1:31088576263:web:7f35ac244ae239fa5fa7a2",
  measurementId: "G-YC9EVC3819"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };