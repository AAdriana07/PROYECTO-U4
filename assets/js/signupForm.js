import { auth, updateProfile } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { showMessage } from "./toastMessage.js";

const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", async (e) => {
  //Evitar que se recargue la página
  e.preventDefault();
  console.log("Formulario enviado");

  //Obtener los datos del formulario mediante sus id
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;
  const displayName = signUpForm["signup-name"].value;

  // Menejo de errores
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    //Actualizar perfil
    await updateProfile(auth.currentUser, {
      displayName,
    });
    //Mostrar menzaje de exito
    showMessage("Usuario resgistrado", "success");

    //Cerrar el modal
    const signupModal = document.querySelector("#signup-modal");
    const modal = bootstrap.Modal.getInstance(signupModal);
    modal.hide();

    //Limpiar el formulario
    signUpForm.reset();
  } catch (error) {
    //Registro fallido
    console.log(error);
    //Mostrar menzaje de error
    if (error.code === "auth/email-already-in-use") {
      showMessage("El correo ya está en uso", "error");
    } else if (error.code === "auth/invalid-email") {
      showMessage("El correo es inválido", "error");
    } else if (error.code === "auth/weak-password") {
      showMessage("La contraseña debe tener más de 5 digitos", "error");
    } else {
      showMessage(error.code, "error");
    }
  }
});
