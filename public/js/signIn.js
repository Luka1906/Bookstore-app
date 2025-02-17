export const setUpSignIn = () => {
  const togglePasswordIcons = document.querySelectorAll(".toggle-password");

  togglePasswordIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      const passwordField = document.querySelector(`#${icon.dataset.target}`);

      if (!passwordField) return;

      const clickedIcon = event.target; // The clicked icon

      if (passwordField.type === "password") {
        passwordField.type = "text"; // Show password
        clickedIcon.classList.remove("fa-eye");
        clickedIcon.classList.add("fa-eye-slash");
      } else {
        passwordField.type = "password"; // Hide password
        clickedIcon.classList.add("fa-eye");
        clickedIcon.classList.remove("fa-eye-slash");
      }
    });
  });

//   Hiding and Showing
const loginLink= document.querySelector("#login-query");
const registerLink = document.querySelector("#register-query");
const loginForm = document.querySelector(".signIn-form");
const registerForm = document.querySelector(".register-form");


loginLink.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden")

})

registerLink.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden")

})



};
