const todoInput = document.getElementById("input-box");
const todoList = document.getElementById("list-container");
const completedList = document.getElementById("completed-task");

document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  const storedCompletedTasks = localStorage.getItem("completedTasks");

  if (storedTasks) {
    todoList.innerHTML = storedTasks;
  }

  if (storedCompletedTasks) {
    completedList.innerHTML = storedCompletedTasks;
  }
}

function saveTasks() {
  localStorage.setItem("tasks", todoList.innerHTML);
  localStorage.setItem("completedTasks", completedList.innerHTML);
}

function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText === "") {
    alert("Please enter a valid task.");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" onchange="completeTodo(this)">
    <span>${todoText}</span>
    <div class="todo-task-item">
        <button class="btn-update" onclick="editTodo(this)">Edit</button>
        <button class="btn-delete" onclick="deleteTodo(this)">Delete</button>
    </div>
    `;

  todoList.appendChild(li);
  todoInput.value = "";

  saveTasks();
}

function editTodo(button) {
  const li = button.parentNode.parentNode;
  const span = li.querySelector("span");
  const newText = prompt("Edit task:", span.textContent);

  if (newText !== null) {
    span.textContent = newText;
    saveTasks();
  }
}

function deleteTodo(button) {
  const li = button.parentNode.parentNode;
  li.remove();
  saveTasks();
}

function completeTodo(checkbox) {
  const li = checkbox.parentNode;

  if (checkbox.checked) {
    li.classList.add("completed");
    completedList.appendChild(li);
  } else {
    li.classList.remove("completed");
    todoList.appendChild(li);
  }
  saveTasks();
}
