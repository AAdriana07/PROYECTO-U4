import {
  createTask,
  onGetTask,
  deleteTask,
  updateTask,
  getTask,
} from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const taskForm = document.querySelector("#task-form");
const tasksContainer = document.querySelector("#session-two");

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
          timeData
        );
        // Mostrar mensaje de éxito
        showMessage("Tarea creada", "success");
        // Limpiar el formulario
      } else {
        // Actualizar tarea
        await updateTask(editId, { title, description, timeData });
        // Mostrar mensaje de éxito
        showMessage("Tarea actualizada", "success");

        // Cambiar el estado de edición
        editStatus = false;
        // Cambiar el id de edición
        editId = "";

        // Cambiamos lo que muestra el formulario
        document.getElementById("form-title").innerHTML =
          "Agregar una nueva tarea";
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
      <article class="task-container p-3 my-3">
        <header class="usuario d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-3">
            <img class="task-profile-picture rounded-circle" src="${
              data.userImage ? data.userImage : "./assets/img/icono.png"
            }" alt="${data.userName}" />
            <i class="bi bi-chat-square-text"></i>
            <p class="m-0"></p>
            <i class="bi bi-globe"></i>
            <p class="m-0 gap-5">${data.timeData}</p>
          </div>
        </header>
        <hr />
        <h4>${data.title}</h4>
        <p>${data.description}</p>
        ${
          user.email === data.userEmail
            ? `<hr /> <div class="botones">
          <button class="btn btn-info btn-editar" data-id="${doc.id}"><i class="bi bi-pencil-fill"></i></button>
          <button class="btn btn-danger btn-eliminar" data-id="${doc.id}"><i class="bi bi-trash3-fill"></i></button>
          <button type="button" class="btn btn-primary btn-comentar" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i class="bi bi-chat-square-dots"></i>
          </button>
        </div>`
            : `<div></div>`
        }
      </article>
      `;
    });

    // Mostrar las tareas en el DOM
    tasksContainer.innerHTML = tasksHtml;

    // UPDATE
    // Obtenemos los botones de editar
    const btnsEditar = document.querySelectorAll(".btn-editar");

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
        document.getElementById("form-title").innerHTML = "Editar tarea";
        taskForm["btn-agregar"].value = "Guardar cambios";
      });
    });

    // DELETE
    // Obtenemos los botones de eliminar
    const btnsEliminar = document.querySelectorAll(".btn-eliminar");

    // Iteramos sobre cada botón
    btnsEliminar.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id);
        showMessage("Tarea eliminada", "success");
      });
    });
  });
};
