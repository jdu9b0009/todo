const taskForm = document.querySelector("form");
const taskInput = document.querySelector("#task");
const dateTimeInput = document.querySelector("#date-time");
const taskList = document.querySelector("#tasks");
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".modal");
const taskEditInput = document.querySelector("#task-edit");
const dateTimeEditInput = document.querySelector("#date-time-edit");
const saveEditButton = document.querySelector("#save-edit");
const cancelEditButton = document.querySelector("#cancel-edit");

let tasks = [];
let editIndex;

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  renderTasks();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (taskInput.value.trim() === "" || dateTimeInput.value === "") {
    alert("すべてのフィールドに入力してください！");
    return;
  }

  const task = {
    title: taskInput.value,
    dateTime: dateTimeInput.value,
  };

  tasks.push(task);
  saveTasks();
  taskForm.reset();
  renderTasks();
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.title} // ${task.dateTime}</span>
      <button data-index="${index}" class="edit-button">Edit</button>
      <button data-index="${index}" class="delete-button">Delete</button>
    `;
    taskList.appendChild(li);
  });

  const editButtons = document.querySelectorAll(".edit-button");
  const deleteButtons = document.querySelectorAll(".delete-button");

  editButtons.forEach((button) =>
    button.addEventListener("click", handleEditButtonClick)
  );

  deleteButtons.forEach((button) =>
    button.addEventListener("click", handleDeleteButtonClick)
  );
}

function handleEditButtonClick(e) {
  editIndex = Number(e.target.dataset.index);
  const task = tasks[editIndex];
  taskEditInput.value = task.title;
  dateTimeEditInput.value = task.dateTime;
  showModal();
}

function handleDeleteButtonClick(e) {
  const index = Number(e.target.dataset.index);
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function showModal() {
  modalContainer.style.display = "block";
}

function hideModal() {
  modalContainer.style.display = "none";
}

cancelEditButton.addEventListener("click", (e) => {
  hideModal();
});

saveEditButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (taskEditInput.value.trim() === "" || dateTimeEditInput.value === "") {
    alert("すべてのフィールドに入力してください！");
    return;
  }

  const task = {
    title: taskEditInput.value,
    dateTime: dateTimeEditInput.value,
  };

  tasks[editIndex] = task;
  saveTasks();
  hideModal();
  renderTasks();
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Drag and Drop

slist(document.getElementById("tasks"));

function slist (target) {

target.classList.add("slist");
let items = target.getElementsByTagName("li"), current = null;

for (let i of items) {
  i.draggable = true;
  i.ondragstart = e => {
    current = i;
    for (let it of items) {
      if (it != current) { it.classList.add("hint"); }
    }
};

i.ondragenter = e => {
  if (i != current) { i.classList.add("active"); }
};

i.ondragleave = () => i.classList.remove("active");

i.ondragend = () => { for (let it of items) {
  it.classList.remove("hint");
    it.classList.remove("active");
}}; 

i.ondragover = e => e.preventDefault();

i.ondrop = e => {
  e.preventDefault();
  if (i != current) {
  let currentpos = 0, droppedpos = 0;
    for (let it=0; it<items.length; it++) {
      if (current == items[it]) { currentpos = it; }
        if (i == items[it]) { droppedpos = it; }
    }
      if (currentpos < droppedpos) {
        i.parentNode.insertBefore(current, i.nextSibling);
    } else {
        i.parentNode.insertBefore(current, i);
        }
      }
    };
  }
}