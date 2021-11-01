window.projectId = window.location.search.split("=")[1]; // Grab project ID from the URL

// Manage developers input using select2 library (jquery)
$(document).ready(function () {
  $("#developersList").select2(
    {
      tags: true,
      tokenSeparators: [","],
    },
    function () {}
  );

  $("#developersList").change(function () {
    window.developers = $(this).val();
  });
});

/**
 * Update the project
 */
const updateProject = async function (e) {
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
    done: this.done.value === "true",
  };

  try {
    const firestore = firebase.firestore();
    const collection = firestore.collection("projects").doc(projectId);

    await collection.set(projectData);

    showAlert("success", "Project updated successfully");

    redirect("projects");
  } catch (error) {
    console.log(error);
  }
};

const form = getByID("edit-project-form");

// Attach event listener to the edit form
form.addEventListener("submit", updateProject);

/**
 * Get a project by ID
 */
const getProjectById = async () => {
  try {
    const projectCollection = firebase
      .firestore()
      .collection("projects")
      .doc(projectId);

    const doc = await projectCollection.get();
    const project = doc.data();

    window.developers = project.developers; // attach project developers to window object

    prepopuluteForm(project);
  } catch (error) {
    console.log(error);
  }
};

getProjectById();

/**
 * Populate edit form with the project data (received from DB)
 */
const prepopuluteForm = ({
  name,
  budget,
  client,
  client_email,
  client_contact,
  developers,
  starting_date,
  deadline,
  description,
  done,
}) => {
  form.project_name.value = name;
  form.client_name.value = client;
  form.project_budget.value = budget;
  form.client_email.value = client_email;
  form.client_contact.value = client_contact;

  let developerOptions = ``;

  // Iterate through the developers and add them to the list (select)
  developers.map((developer) => {
    developerOptions += `<option value="${developer}" selected>${developer}</option>`;
  });

  form.developersList.innerHTML = developerOptions;
  form.starting_date.value = starting_date;
  form.deadline.value = deadline;
  form.description.value = description;
  form.done.value = done;
};
