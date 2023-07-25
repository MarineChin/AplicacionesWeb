// Variables para almacenar los datos
let data = JSON.parse(localStorage.getItem("data")) || [];

let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let editedIndex = -1;
let deleteAllBtn = document.getElementById("deleteAllBtn");


// Agregar evento de envío del formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "El tipo de producto no puede estar en blanco";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();

    if (editedIndex === -1) {
      // Si no se está editando, cierra el modal automáticamente después de agregar un nuevo producto
      add.setAttribute("data-bs-dismiss", "modal");
      add.click();
    } else {
      // Si se está editando, no cierra el modal automáticamente
      removeCloseAttribute();
    }
  }
};

let removeCloseAttribute = () => {
  // Elimina el atributo data-bs-dismiss del botón Close
  let closeButton = document.querySelector(".modal-footer .btn-secondary");
  closeButton.removeAttribute("data-bs-dismiss");
};

let acceptData = () => {
  if (editedIndex === -1) {
    data.push({
      text: textInput.value,
      date: dateInput.value,
      description: textarea.value,
    });
  } else {
    data[editedIndex] = {
      text: textInput.value,
      date: dateInput.value,
      description: textarea.value,
    };
    editedIndex = -1;
  }

  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
      <div id=${y}>
        <span class="fw-bold">${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.description}</p>
        <span class="options">
          <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
          <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
        </span>
      </div>
    `);
  });

  resetForm();
};


deleteAllBtn.addEventListener("click", () => {
  if (confirm("Tas chan seguro?")) {
    deleteAllTasks();
  }
});

let deleteAllTasks = () => {
  tasks.innerHTML = "";
  data = []; // Clear the data array
  localStorage.setItem("data", JSON.stringify(data));
};
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  let index = parseInt(selectedTask.id);
  editedIndex = index;
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
  editedIndex = -1;
};


window.addEventListener("load", () => {
  createTasks();
});
