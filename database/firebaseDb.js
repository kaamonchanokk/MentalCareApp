import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBwExOnfFrMsbAPwWBzrPVb9DUH6MRtMuw",
    authDomain: "mentalhealthapp-7299d.firebaseapp.com",
    projectId: "mentalhealthapp-7299d",
    storageBucket: "mentalhealthapp-7299d.appspot.com",
    messagingSenderId: "494513654861",
    appId: "1:494513654861:web:c788e12a612075ed396004",
    measurementId: "G-6XHNMWSREF"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export default db;