import { setupTasks } from "./setupTasks.js";
import { setupComments } from "./setupComments.js";

const loggedIn = document.querySelectorAll(".logged-in");
const loggedOut = document.querySelectorAll(".logged-out");
const feedContainer = document.querySelector("#feed-container");
const saludo = document.querySelector("#saludo");

export const checkLogin = (user) => {
  // Modificamos el nav dependiendo si el usuario esta logueado o no
  if (user) {
    loggedIn.forEach((element) => (element.style.display = "block"));
    loggedOut.forEach((element) => (element.style.display = "none"));

    //Mostramos el main conatiner
    feedContainer.style.display = "flex";
    saludo.textContent = `Bienvenid@ ${user.email}`;

    // Cargamos las tareas
    setupTasks(user);
    setupComments(user);
  } else {
    loggedOut.forEach((element) => (element.style.display = "block"));
    loggedIn.forEach((element) => (element.style.display = "none"));
    //Ocultamos el main container
    feedContainer.style.display = "none";
    saludo.textContent = "";
  }
};
