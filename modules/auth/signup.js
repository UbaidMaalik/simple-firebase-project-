const form = getByID("signup-form");
const signupBtn = getByID("signup-btn");

/**
 * Create a new user
 * @param Event e
 * @return void
 */
const creatAccount = async function (e) {
  e.preventDefault();

  signupBtn.setAttribute("disabled", true);

  // Get values
  const email = this.email.value;
  const password = this.password.value;
  const password_conf = this.password_conf.value;

  // Match passwords
  if (password !== password_conf) {
    showAlert("danger", "Passwords do not match");
  }

  // Attempt Signup
  try {
    const auth = firebase.auth();

    await auth.createUserWithEmailAndPassword(email, password);

    showAlert("success", "Account created successfully");
    signupBtn.removeAttribute("disabled");
  } catch (error) {
    showAlert("danger", error.message);
    signupBtn.removeAttribute("disabled");
  }
};

form.addEventListener("submit", creatAccount);
