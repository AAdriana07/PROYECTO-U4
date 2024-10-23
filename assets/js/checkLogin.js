import { setupTasks } from "./setupTasks.js";

const loggedIn = document.querySelectorAll(".logged-in");
const loggedOut = document.querySelectorAll(".logged-out");
const mainContainer = document.querySelector("#main-container");
const saludo = document.querySelector("#saludo");

export const checkLogin = (user) => {
  // Modificamos el nav dependiendo si el usuario esta logueado o no
  if (user) {
    loggedIn.forEach((element) => (element.style.display = "block"));
    loggedOut.forEach((element) => (element.style.display = "none"));

    //Mostramos el main conatiner
    mainContainer.style.display = "block";
    saludo.textContent = `Bienvenid@ ${user.email}`;

    // Cargamos las tareas
    setupTasks(user);
  } else {
    loggedOut.forEach((element) => (element.style.display = "block"));
    loggedIn.forEach((element) => (element.style.display = "none"));
    //Ocultamos el main container
    mainContainer.style.display = "none";
    saludo.textContent = "";
  }
};