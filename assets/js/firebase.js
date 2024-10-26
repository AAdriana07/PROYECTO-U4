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

//AGREGANDO FIREBASE STORAGE
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";

// Your web app's Firebase configuration
//Credenciales del Proyecto
const firebaseConfig = {
  //se cambio
  apiKey: "AIzaSyAMevh-H9YOW0YxDPAdg_k7uFDx2lCjx34",
  authDomain: "red-social-ls.firebaseapp.com",
  projectId: "red-social-ls",
  storageBucket: "red-social-ls.appspot.com",
  messagingSenderId: "317274275041",
  appId: "1:317274275041:web:967c954ec20057cbc38ba0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore();

//INCIALIZAR STORAGE
export const storage = getStorage(app);
//HASTA AQUI
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
