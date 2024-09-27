// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDx2JOC70I7MRV0VMYm7DwILU2zNiScrFA",
  authDomain: "expensestracker-b80bc.firebaseapp.com",
  projectId: "expensestracker-b80bc",
  storageBucket: "expensestracker-b80bc.appspot.com",
  messagingSenderId: "576200108010",
  appId: "1:576200108010:web:88593e35f04a9b677e7493"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {
  db
}