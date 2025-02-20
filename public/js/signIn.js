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
  const loginLink = document.querySelector("#login-query");
  const registerLink = document.querySelector("#register-query");
  const loginForm = document.querySelector(".signIn-form");
  const registerForm = document.querySelector(".register-form");

  loginLink.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
  });

  registerLink.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
  });

  //  Register Form Validations

  const usernameField = document.querySelector("#name-reg");
  console.log(usernameField);
  const emailField = document.querySelector("#email-reg");
  const passwordField = document.querySelector("#password2");
  const confirmPasswordField = document.querySelector("#password3");

  //   Username Validate Function
  const validateUsername = () => {
    const username = usernameField.value;
    const usernameError = document.querySelector("#usernameError");
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    if (!username) {
      usernameError.textContent = "Username is required";

      usernameField.classList.add("input-error");
    } else if (username.length < 3) {
      usernameError.textContent =
        "Username must be at least 3 characters long.";
      usernameField.classList.add("input-error");
    } else if (!usernameRegex.test(username)) {
      usernameError.textContent =
        "Username can only contain letters and numbers.";
      usernameField.classList.add("input-error");
    } else {
      usernameError.textContent = "";
      usernameField.classList.remove("input-error");
    }
  };

  //   Email Validate Function

  const validateEmail = () => {
    const email = emailField.value;
    const emailError = document.querySelector("#emailError");
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!email) {
      emailError.textContent = "Email is required";
      emailField.classList.add("input-error");
    } else if (!emailRegex.test(email)) {
      emailError.textContent = "Invalid email format";
      emailField.classList.add("input-error");
    } else {
      emailError.textContent = "";
      emailField.classList.remove("input-error");
    }
  };

  //   Password Validate Function

  const validatePassword = () => {
    const password = passwordField.value;
    const passwordError = document.querySelector("#passwordError");
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!password) {
      passwordError.textContent = "Password is required.";
      passwordField.classList.add("input-error");
    } else if (!passwordRegex.test(password)) {
      passwordError.textContent =
        "Password must contain at least one uppercase letter, one number, and one special character.";
      passwordField.classList.add("input-error");
    } else {
      passwordError.textContent = "";
      passwordField.classList.remove("input-error");
    }
  };

//   ConfirmPassword Validate Function

const validateConfirmPassword = () => {
    const confirmPassword = confirmPasswordField.value;
    const password = passwordField.value;
    const confirmPasswordError = document.querySelector("#confirmPasswordError");
    const paswordMatchIcon = document.querySelector(".pass-match-icon")

    if(!confirmPasswordError) {
        confirmPasswordError.textContent = "Confirm password is required.";
        confirmPasswordField.classList.add("input-error");
        paswordMatchIcon.classList.add("hidden")

    } else if (confirmPassword !== password) {
        confirmPasswordError.textContent = "Passwords do not match.";
        confirmPasswordField.classList.add("input-error");
        paswordMatchIcon.classList.add("hidden")

} else {
    confirmPasswordError.textContent = "";
    confirmPasswordField.classList.remove("input-error");
    paswordMatchIcon.classList.remove("hidden")
    
}
}
  // Event listeners for real-time validation
  usernameField.addEventListener("input", validateUsername);
  emailField.addEventListener("input", validateEmail);
  passwordField.addEventListener("input", validatePassword);
  confirmPasswordField.addEventListener("input",validateConfirmPassword)

  //   Form Submission
  registerForm.addEventListener("submit", (event) => {
    validateUsername(); //Check if username is valid
    validateEmail(); //Check if email is valid
    validatePassword(); //Check if password is valid
    validateConfirmPassword(); //Check if confirm password is valid

    // If there are any error messages (fields with the "error" class), prevent form submission;

    if (document.querySelectorAll(".input-error").length > 0) {
      event.preventDefault();
    }
  });
};
