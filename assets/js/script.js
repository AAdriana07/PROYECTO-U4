import { auth, storage } from "./firebase.js";

//Autenticación
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";

import { checkLogin } from "./checkLogin.js";

//Importamos el archivo de registro
import "./signupForm.js";
import "./signOut.js";
import "./signinForm.js";
import "./googleLogin.js";

onAuthStateChanged(auth, async (user) => {
  console.log(user);
  checkLogin(user);
});

//Manejo de la autenticacion
onAuthStateChanged(auth, async (user) => {
  console.log(user);
  checkLogin(user);
});

// Función para manejar el formulario de tarea
document.getElementById("task-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const fileInput = document.getElementById("file-input").files[0];

  if (fileInput) {
    // Subir la imagen
    const storageRef = ref(storage, `images/${fileInput.name}`);
    await uploadBytes(storageRef, fileInput);
    const url = await getDownloadURL(storageRef);

    // Aquí puedes guardar la tarea en Firestore, incluyendo la URL de la imagen
    createTask(title, description, url);

    // Limpiar el formulario
    document.getElementById("task-form").reset();
  } else {
    alert("Por favor, selecciona una imagen.");
  }
});

// Función para mostrar las tareas (incluyendo la imagen)
const createTask = (title, description, imageUrl) => {
  const tasksContainer = document.getElementById("tasks-container");

  const taskArticle = document.createElement("article");
  taskArticle.className = "task-container border border-2 rounded-2 p-3";

  taskArticle.innerHTML = `
    <h4 class="text-light">${title}</h4>
    <img src="${imageUrl}" alt="${title}" class="img-fluid" />
    <hr />
    <p class="text-light">${description}</p>
    
  `;

  tasksContainer.appendChild(taskArticle);
};
