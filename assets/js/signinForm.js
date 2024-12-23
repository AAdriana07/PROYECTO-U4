import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { showMessage } from "./toastMessage.js";

const signInForm = document.querySelector("#signin-form");

signInForm.addEventListener("submit", async (e) => {
  //Evitar que se recargue la página
  e.preventDefault();
  console.log("Formulario enviado");

  //Obtener los datos del formulario mediante sus id
  const email = signInForm["signin-email"].value;
  const password = signInForm["signin-password"].value;

  // Menejo de errores
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    //Mostrar menzaje de exito
    showMessage("Sesión iniciada", "success");

    //Cerrar el modal
    const signinModal = document.querySelector("#signin-modal");
    const modal = bootstrap.Modal.getInstance(signinModal);
    modal.hide();

    //Limpiar el formulario
    signInForm.reset();
  } catch (error) {
    //Registro fallido
    console.log(error);
    // Mostrar mensaje de error
    if (error.code === "auth/invalid-credential") {
      showMessage("Credenciales incorrectas", "error");
    }
    if (error.code === "auth/invalid-email") {
      showMessage("Iniciando sesión", "success");
    } else {
      showMessage(error.code, "error");
    }
  }
});
