import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

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
