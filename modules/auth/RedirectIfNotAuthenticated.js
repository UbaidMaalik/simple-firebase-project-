const redirectIfNotAuthenticated = () => {
  try {
    const auth = firebase.auth();

    auth.onAuthStateChanged((user) => {
      if (!user) {
        localStorage.removeItem("authUser");
        return redirect("signin");
      }

      const displayName = document.getElementById("displayName");
      displayName.textContent = user.displayName;
    });
  } catch (error) {
    console.log(error);
  }
};

redirectIfNotAuthenticated();
