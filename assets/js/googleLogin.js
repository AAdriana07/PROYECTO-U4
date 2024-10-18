import {
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

import { auth } from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const googleButton = document.querySelector("#google-btn");

googleButton.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();

  //Forzamos la eleccion de la cuenta
  provider.setCustomParameters({
    prompt: "select_account",
  });

  try {
    const credentials = await signInWithPopup(auth, provider);

    //Cerrar el modal
    const signinModal = document.querySelector("#signin-modal");
    const modal = bootstrap.Modal.getInstance(signinModal);
    modal.hide();

    showMessage("Sesión iniciada", "success");
  } catch (error) {
    console.log(error);
  }
});
