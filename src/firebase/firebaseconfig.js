import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC8TAw99F7tNtE9-Jx8TGiH-4SylM9CdbE",
  authDomain: "whisper-walls.firebaseapp.com",
  projectId: "whisper-walls",
  storageBucket: "whisper-walls.appspot.com",
  messagingSenderId: "451819033176",
  appId: "1:451819033176:web:8a62cc92b839009254702d",
  measurementId: "G-ZEHXDFCWSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};
