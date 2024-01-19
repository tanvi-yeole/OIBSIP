const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

listcontainer.innerHTML = localStorage.getItem("listcontainer");

function addtask() {
  if (inputbox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");

    let check = document.createElement("input");
    check.type = "checkbox";

    let p = document.createElement("p");
    p.innerHTML = inputbox.value;

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "Delete";

    deleteBtn.addEventListener("click", deleteTask);

    li.appendChild(check);
    li.appendChild(p);
    li.appendChild(deleteBtn);
    listcontainer.appendChild(li);
  }
  inputbox.value = "";
  saveToLocalStorage();
}

function deleteTask(e) {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
  }
}

// listcontainer.addEventListener("click", function(e) {
//   if (e.target.classList.contains("delete-btn")) {
//     deleteTask(e);
//   }
// });

function saveToLocalStorage() {
    localStorage.setItem("listcontainer", listcontainer.innerHTML);
}