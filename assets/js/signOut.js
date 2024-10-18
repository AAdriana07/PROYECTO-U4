import { signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { auth } from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const signOutButton = document.querySelector("#logout");

signOutButton.addEventListener("click", async () => {
  try {
    await signOut(auth);
    showMessage("Sesión cerrada", "success");
  } catch (error) {
    console.log(error);
    showMessage("Error al cerrar sesión", "error");
  }
});
