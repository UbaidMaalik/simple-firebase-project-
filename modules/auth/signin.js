const form = getByID("signin-form");
const signinBtn = getByID("signin-btn");

/**
 * Attempt Signin
 * @param Event e
 * @return void
 */
const attemptSignIn = async function (e) {
  e.preventDefault();

  signinBtn.setAttribute("disabled", true);

  // Get values
  const email = this.email.value;
  const password = this.password.value;

  // Attempt Signin
  try {
    const auth = firebase.auth();

    const res = await auth.signInWithEmailAndPassword(email, password);

    showAlert("success", "Signed in successfully");
    signinBtn.removeAttribute("disabled");

    localStorage.setItem("authUser", JSON.stringify(res));
    redirect("index");
  } catch (error) {
    showAlert("danger", error.message);
    signinBtn.removeAttribute("disabled");
  }
};

form.addEventListener("submit", attemptSignIn);
