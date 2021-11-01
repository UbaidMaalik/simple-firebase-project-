$(document).ready(function () {
  $("#developers").select2({
    tags: true,
    tokenSeparators: [","],
  });

  $("#developers").change(function () {
    window.developers = $(this).val();
  });
});

const addProject = async function (e) {
  e.preventDefault();

  const projectData = {
    client: this.client_name.value,
    client_email: this.client_email.value,
    client_contact: this.client_contact.value,
    budget: this.project_budget.value,
    starting_date: this.starting_date.value,
    deadline: this.deadline.value,
    name: this.project_name.value,
    description: this.description.value,
    developers,
    user_id: firebase.auth().currentUser.uid,
  };

  try {
    const firestore = firebase.firestore();
    const collection = firestore.collection("projects");

    const res = await collection.add(projectData);

    showAlert("success", "Project added successfully");

    this.reset();
  } catch (error) {
    console.log(error);
  }
};

const form = getByID("new-project-form");

form.addEventListener("submit", addProject);
