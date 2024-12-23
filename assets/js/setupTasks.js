import {
  createTask,
  onGetTask,
  deleteTask,
  updateTask,
  getTask,
} from "./firebase.js";
import { showMessage } from "./toastMessage.js";
import { showComments } from "./setupComments.js";

// STORAGE 28/20
import { uploadImage } from "./firebase.js";

const taskForm = document.querySelector("#task-form");
const tasksContainer = document.querySelector("#session-two");
// STORAGE 28/20
const imageInput = document.querySelector("#image-input"); // Añade un input para la imagen

// Variables para la edición
let editStatus = false;
let editId = "";

export const setupTasks = (user) => {
  console.log(user.displayName);

  // CREATE
  taskForm.addEventListener("submit", async (e) => {
    // Prevenir que la página se recargue
    e.preventDefault();

    // Obtener los datos del formulario
    const title = taskForm["title"].value;
    const description = taskForm["description"].value;
    //STORAGE 28/10

    let imageUrl = "";
    if (imageInput.files.length > 0) {
      const imageFile = imageInput.files[0];
      imageUrl = await uploadImage(imageFile); // Sube la imagen y guarda la URL
    }
    // Crear una nueva tarea
    try {
      const timeData = new Date().toLocaleString("es-PE", {
        timeZone: "America/Lima",
      });
      if (!editStatus) {
        // Crear tarea
        await createTask(
          title,
          description,
          user.displayName,
          user.photoURL,
          user.email,
          timeData,
          //STORAGE 28/10
          imageUrl //Guarda la URL de la imagen en la BD
        );
        // Mostrar mensaje de éxito
        showMessage("Publicación creada", "success");
        // Limpiar el formulario
      } else {
        // Actualizar tarea
        await updateTask(editId, { title, description, timeData, imageUrl });
        // Mostrar mensaje de éxito
        showMessage("Publicación actualizada", "success");

        // Cambiar el estado de edición
        editStatus = false;
        // Cambiar el id de edición
        editId = "";

        // Cambiamos lo que muestra el formulario
        document.getElementById("form-title").innerHTML =
          "Agregar una nueva publicación";
        taskForm["btn-agregar"].value = "Crear tarea";
      }

      // Limpiar el formulario
      taskForm.reset();
    } catch (error) {
      // Mostrar mensaje de error
      showMessage(error.code, "error");
    }
  });

  // READ
  onGetTask((querySnapshot) => {
    let tasksHtml = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      tasksHtml += `
      <article class="task-container border border-2 rounded-2 p-3 my-3">
        <header class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-3">
            <img class="task-profile-picture rounded-circle" src="${
              data.userImage ? data.userImage : "./assets/img/icono.png"
            }" alt="${data.userName}" />
            <p class="m-0"><b>${data.userName}</b></p>
            <i class="bi bi-globe"></i>
            <p class="m-0 gap-5">${data.timeData}</p>
          </div>
          ${
            user.email === data.userEmail
              ? `<div>
            <button class="btn btn-editar btn-primary btn1" data-id="${doc.id}"><i class="bi bi-pencil-fill"></i></button>
            <button class="btn btn-eliminar btn-primary btn1" data-id="${doc.id}"><i class="bi bi-trash3-fill"></i></button>
          </div>`
              : `<div></div>`
          }
        </header>
        <hr />
        <h4>${data.title}</h4>
        <p>${data.description}</p>
        <!--STORAGE 28/10}-->
        ${
          data.imageUrl
            ? `<img src="${data.imageUrl}" alt="Tarea imagen" class="task-image" />`
            : ""
        }
        <hr />
        
        <button type="button" class="btn btn-comentar btn-primary btn2" data-id="${
          doc.id
        }" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i class="bi bi-chat-square-text-fill"></i></button>
        
      </article>
      `;
    });
    /*
    <input
          type="submit"
          value="No hay comentarios"
          id="btn-comentarios"
          data-id="${doc.id}"
          class="btn btn-primary"
        />
    */

    // Mostrar las tareas en el DOM
    tasksContainer.innerHTML = tasksHtml;

    // UPDATE
    // Obtenemos los botones de editar
    const btnsEditar = document.querySelectorAll(".btn-editar");
    const btnsComentar = document.querySelectorAll(".btn-comentar");

    // Iteramos sobre cada botón
    btnsEditar.forEach((btn) => {
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        // Obtenemos el documento
        const doc = await getTask(dataset.id);
        // Obtenemos los datos
        const task = doc.data();

        // LLenamos el formulario con los datos
        taskForm["title"].value = task.title;
        taskForm["description"].value = task.description;

        // Actualizamos el estado de edición y el id edición
        editStatus = true;
        editId = doc.id;

        // Cambiamos lo que muestra el formulario
        document.getElementById("form-title").innerHTML = "Editar publicación";
        taskForm["btn-agregar"].value = "Guardar cambios";
      });
    });

    btnsComentar.forEach((btn) => {
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        // ID de la tarea
        const taskId = dataset.id;

        localStorage.setItem("idPost", taskId);
        showComments(taskId);
      });
    });

    // DELETE
    // Obtenemos los botones de eliminar
    const btnsEliminar = document.querySelectorAll(".btn-eliminar");

    // Iteramos sobre cada botón
    btnsEliminar.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id);
        showMessage("Publicación eliminada", "success");
      });
    });
  });
};
