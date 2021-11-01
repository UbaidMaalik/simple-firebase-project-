const projectsWrapper = getByID("projects-wrapper");

async function getProjects() {
  try {
    const user_id = JSON.parse(localStorage.getItem("authUser")).uid;

    console.log(user_id);
    const firestore = firebase.firestore();
    const projectsCollection = firestore
      .collection("projects")
      .where("user_id", "==", user_id);

    const docs = await projectsCollection.get();
    const projects = [];

    docs.forEach((doc) => {
      const {
        name,
        budget,
        client,
        client_email,
        client_contact,
        developers,
        description,
        starting_date,
        deadline,
        done,
      } = doc.data();

      projects.push({
        id: doc.id,
        name,
        budget,
        client,
        client_email,
        client_contact,
        developers,
        description,
        starting_date,
        deadline,
        done,
      });
    });

    return projects;
  } catch (error) {
    console.log(error);
  }
}

getProjects().then((projects) => {
  showProjects(projects);
});

const showProjects = (projects) => {
  projects.forEach(
    (
      {
        id,
        name,
        budget,
        client,
        client_email,
        client_contact,
        developers,
        starting_date,
        deadline,
        done,
      },
      index
    ) => {
      const noOfDaysLeft = moment(deadline.split("-")).diff(
        starting_date.split("-"),
        "days"
      );

      projectsWrapper.innerHTML += `
      <tr>
          <td>${index + 1}</td>
          <td>${name}</td>
          <td>${budget}</td>
          <td>${client}</td>
          <td>${client_contact}</td>
          <td>${client_email}</td>
          <td>${starting_date}</td>
          <td>${deadline}</td>
          <td>${getStatus(noOfDaysLeft, done)}</td>
          <td>${developers.join("|")}</td>
          <td>
            <div class="btn-group btn-group-sm">
              <button class="btn btn-info" onclick="markAsDone(event)" value="${id},${done}">
                Mark as Done
              </button>

              <a href="/edit-project.html?projectId=${id}" class="btn btn-light">Edit</a>

              <button class="btn btn-danger" onclick="deleteProject(event)" value="${id}">
                Delete
              </button>
            </div>
          </td>
      </tr>
      `;
    }
  );
};

const getStatus = (noOfDaysLeft, done) => {
  let status;

  if (noOfDaysLeft < 1 && !done) {
    status = "<span class='badge badge-danger'>Deadline Crossed</span>";
  } else if (noOfDaysLeft > 1 && !done) {
    status = `<span class='badge badge-primary'>${noOfDaysLeft}</span>`;
  } else if (done) {
    status = "<span class='badge badge-success'>Done</span>";
  }

  return status;
};

/**
 * Mark a project as done/completed
 */
async function markAsDone(e) {
  const val = e.target.value.split(",");
  const projectID = val[0];
  const done = val[1] === "true";

  if (confirm("Are you sure ?")) {
    try {
      const projectCollection = firebase
        .firestore()
        .collection("projects")
        .doc(projectID);
      await projectCollection.update({ done: !done });

      location.reload();
    } catch (error) {
      console.log(error);
    }
  }
}

/**
 * Delete a project
 */
async function deleteProject(e) {
  const projectID = e.target.value;

  if (confirm("Are you sure ?")) {
    try {
      const projectCollection = firebase
        .firestore()
        .collection("projects")
        .doc(projectID);
      await projectCollection.delete();

      location.reload();
    } catch (error) {
      console.log(error);
    }
  }
}
