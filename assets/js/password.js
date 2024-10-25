const imput = document.getElementById("signup-password");
const incon = document.querySelector("#toggle-eye");

console.log("toggle eye script");

incon.addEventListener("click", (e) => {
  console.log("toggle eye clicked");
  if (imput.attributes["type"].value === "password") {
    imput.attributes["type"].value = "text";
    incon.classList.remove("bi-eye-slash-fill");
    incon.classList.add("bi-eye-fill");
  } else {
    imput.attributes["type"].value = "password";
    incon.classList.add("bi-eye-slash-fill");
    incon.classList.remove("bi-eye-fill");
  }
});

const imputConfirm = document.getElementById("confirm-password");
const inconConfirm = document.querySelector("#toggle-eye2");

inconConfirm.addEventListener("click", (e) => {
  console.log("toggle eye clicked");
  if (imputConfirm.attributes["type"].value === "password") {
    imputConfirm.attributes["type"].value = "text";
    inconConfirm.classList.remove("bi-eye-slash-fill");
    inconConfirm.classList.add("bi-eye-fill");
  } else {
    imputConfirm.attributes["type"].value = "password";
    inconConfirm.classList.add("bi-eye-slash-fill");
    inconConfirm.classList.remove("bi-eye-fill");
  }
});
