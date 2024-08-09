// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBzSLZ6kyfdeSyKFRuOJYMkAnTTM3LG9co",
  authDomain: "react-sacco-app.firebaseapp.com",
  projectId: "react-sacco-app",
  storageBucket: "react-sacco-app.appspot.com",
  messagingSenderId: "248671323717",
  appId: "1:248671323717:web:51df4825d1c7b9dcdac52c",
  measurementId: "G-12LGW8KEQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };
