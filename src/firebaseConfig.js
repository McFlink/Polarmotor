// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmwp7i-T0lI0zlykUzEFaXuNEr3ZwEZ-A",
  authDomain: "polarmotor-57bba.firebaseapp.com",
  projectId: "polarmotor-57bba",
  storageBucket: "polarmotor-57bba.firebasestorage.app",
  messagingSenderId: "139761689808",
  appId: "1:139761689808:web:fdc9cceaa189631c70ead5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getFirestore } from "firebase/firestore";

export const db = getFirestore(app);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
