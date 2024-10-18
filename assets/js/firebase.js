// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK5Ncqf0HtcvWMfRLrFkSE2lHO2iZuBk8",
  authDomain: "diario-digital-f5e89.firebaseapp.com",
  projectId: "diario-digital-f5e89",
  storageBucket: "diario-digital-f5e89.appspot.com",
  messagingSenderId: "79394816484",
  appId: "1:79394816484:web:dbe6ccca980d4cc62787f1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore();

// Operaciones CRUD
export const createTask = (
  title,
  description,
  userName,
  userImage,
  userEmail,
  timeData
) =>
  addDoc(collection(db, "tasks"), {
    title,
    description,
    userName,
    userImage,
    userEmail,
    timeData,
  });

export const onGetTask = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newData) =>
  updateDoc(doc(db, "tasks", id), newData);

export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export { updateProfile };
