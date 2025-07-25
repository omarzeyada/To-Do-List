const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const task = {
      text: taskText,
      completed: false,
    };

    tasks.push(task);
    updateLocalStorage();
    renderTasks();
    taskInput.value = "";
  } else {
    alert("Please write an assignment first");
  }
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", function () {
      task.completed = !task.completed;
      updateLocalStorage();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      tasks.splice(index, 1);
      updateLocalStorage();
      renderTasks();
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const newText = prompt("Edit your task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        updateLocalStorage();
        renderTasks();
      }
    });

    let divButtons = document.createElement("div");
    divButtons.className = "buttons";

    divButtons.appendChild(editBtn);
    divButtons.appendChild(deleteBtn);
    li.appendChild(divButtons);
    taskList.appendChild(li);
  });
}

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
