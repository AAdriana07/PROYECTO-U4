const imput = document.getElementById("signup-password");
const incon = document.querySelector(".bi");

incon.addEventListener("click", (e) => {
  if (imput.type === "password") {
    imput.type = "text";
    incon.classList.remove("bi-eye-slash-fill");
    incon.classList.add("bi-eye-fill");
  } else {
    imput.type = "password";
    incon.classList.add("bi-eye-slash-fill");
    incon.classList.remove("bi-eye-fill");
  }
});
