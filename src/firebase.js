// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm6Y2OXCFAPzKxtT9T_PHk6obqWvGC9fA",
  authDomain: "todo-app-a93c9.firebaseapp.com",
  projectId: "todo-app-a93c9",
  storageBucket: "todo-app-a93c9.appspot.com",
  messagingSenderId: "911854701816",
  appId: "1:911854701816:web:477877a06d5859bd29ff0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)







