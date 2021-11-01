const redirectHomeIfAuthenticated = () => {
  try {
    const auth = firebase.auth();

    auth.onAuthStateChanged((user) => {
      if (user) {
        return redirect("index");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

redirectHomeIfAuthenticated();
