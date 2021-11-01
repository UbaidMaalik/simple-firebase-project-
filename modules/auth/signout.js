const signOut = async () => {
  try {
    const auth = firebase.auth();
    await auth.signOut();

    redirect("signin");
  } catch (error) {
    console.log(error);
  }
};

const signoutBtn = getByID("signout-btn");

signoutBtn.addEventListener("click", signOut);
