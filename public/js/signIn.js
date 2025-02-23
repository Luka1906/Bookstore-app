export const setUpSignIn = () => {
  const togglePasswordIcons = document.querySelectorAll(".toggle-password");

  togglePasswordIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      const passwordField = document.querySelector(`#${icon.dataset.target}`);

      if (!passwordField) return;

      const clickedIcon = event.currentTarget; // The clicked icon

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

  const clearForm = (form) => {
    form.querySelectorAll("input").forEach((input) => {
      input.value = "";
      input.classList.remove("input-error");
    });

    form.querySelectorAll(".error-message").forEach((error) => {
      error.textContent = "";
    });
    if (form.querySelector(".pass-match-icon")) {
      form.querySelector(".pass-match-icon").classList.add("hidden");
    }
  };

  loginLink.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    clearForm(registerForm);
  });

  registerLink.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    clearForm(loginForm);
  });

  //  Register and Login Form Validations

  const usernameField = document.querySelector("#name-reg");
  const regEmailField = document.querySelector("#email-reg");
  const regPasswordField = document.querySelector("#password2");
  const confirmPasswordField = document.querySelector("#password3");
  const logEmailField = document.querySelector("#email");
  const logPasswordField = document.querySelector("#password1");

  //   Username Validate Function
  const validateUsername = () => {
    const username = usernameField.value;
    const usernameError = document.querySelector(".usernameError");
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

  const validateEmail = (emailInput, errorSelector) => {
    const email = emailInput.value;
    const emailError = document.querySelector(errorSelector);
    console.log(emailError);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!email) {
      emailError.textContent = "Email is required";
      emailInput.classList.add("input-error");
    } else if (!emailRegex.test(email)) {
      emailError.textContent = "Invalid email format";
      emailInput.classList.add("input-error");
    } else {
      emailError.textContent = "";
      emailInput.classList.remove("input-error");
    }
  };

  //   Password Validate Function

  let isPasswordValid = false;
  const validatePassword = (passwordInput, errorSelector) => {
    const password = passwordInput.value;
    const passwordError = document.querySelector(errorSelector);
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!password) {
      passwordError.textContent = "Password is required.";
      passwordInput.classList.add("input-error");
      isPasswordValid = false;
    } else if (!passwordRegex.test(password)) {
      passwordError.textContent =
        "Password must be at least 3 characters long, contain at least one uppercase letter, one number, and one special character.";
      passwordInput.classList.add("input-error");
      isPasswordValid = false;
    } else {
      passwordError.textContent = "";
      passwordInput.classList.remove("input-error");
      isPasswordValid = true;
    }
    if (confirmPasswordField.value) {
      validateConfirmPassword();
    }
  };

  //   ConfirmPassword Validate Function

  const validateConfirmPassword = () => {
    const confirmPassword = confirmPasswordField.value;
    const password = regPasswordField.value;
    const confirmPasswordError = document.querySelector(
      ".confirmPasswordError"
    );

    const passwordMatchIcon = document.querySelector(".pass-match-icon");

    if (!confirmPassword) {
      confirmPasswordError.textContent = "Confirm password is required.";
      confirmPasswordField.classList.add("input-error");
      passwordMatchIcon.classList.add("hidden");
    } else if (confirmPassword !== password) {
      confirmPasswordError.textContent = "Passwords do not match.";
      confirmPasswordField.classList.add("input-error");
      passwordMatchIcon.classList.add("hidden");
    } else if (!isPasswordValid) {
      // Hide match icon if password format is incorrect

      passwordMatchIcon.classList.add("hidden");
    } else {
      confirmPasswordError.textContent = "";
      confirmPasswordField.classList.remove("input-error");
      passwordMatchIcon.classList.remove("hidden");
    }
  };

  // Event listeners for real-time validation
  usernameField.addEventListener("input", validateUsername);
  usernameField.addEventListener("blur", validateUsername);
  regEmailField.addEventListener("input", () =>
    validateEmail(regEmailField, ".emailRegError")
  );
  regEmailField.addEventListener("blur", () =>
    validateEmail(regEmailField, ".emailRegError")
  );
  logEmailField.addEventListener("input", () =>
    validateEmail(logEmailField, ".emailLogError")
  );

  logEmailField.addEventListener("blur", () =>
    validateEmail(logEmailField, ".emailLogError")
  );
  regPasswordField.addEventListener("input", () =>
    validatePassword(regPasswordField, ".passwordRegError")
  );
  regPasswordField.addEventListener("blur", () =>
    validatePassword(regPasswordField, ".passwordRegError")
  );
  logPasswordField.addEventListener("input", () =>
    validatePassword(logPasswordField, ".passwordLogError")
  );
  logPasswordField.addEventListener("blur", () =>
    validatePassword(logPasswordField, ".passwordLogError")
  );
  confirmPasswordField.addEventListener("input", validateConfirmPassword);
  confirmPasswordField.addEventListener("blur", validateConfirmPassword);

  //   Register Form Submission
  registerForm.addEventListener("submit", (event) => {
    validateUsername(); //Check if username is valid
    validateEmail(regEmailField, ".emailRegError"); //Check if email is valid
    validatePassword(regPasswordField, ".passwordRegError"); //Check if password is valid
    validateConfirmPassword(); //Check if confirm password is valid

    // If there are any error messages (fields with the "error" class), prevent form submission;

    if (document.querySelectorAll(".input-error").length > 0) {
      event.preventDefault();
    }
  });

  // Login Form Submission

  loginForm.addEventListener("submit", (event) => {
    validateEmail(logEmailField, ".emailLogError");
    validatePassword(logPasswordField, ".passwordLogError")

    if (document.querySelectorAll(".input-error").length > 0) {
      event.preventDefault();
    }
  });
};
