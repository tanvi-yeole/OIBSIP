const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");
const completetasklist = document.getElementById("completed-task");
const taskcheck = document.querySelectorAll(".check-box");
listcontainer.innerHTML = localStorage.getItem("listcontainer");
if(check.checked){
  completetasklist.appendChild(li);
}
else{
  listcontainer.appendChild(li);
}

function addtask() {
  if (inputbox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");

    let check = document.createElement("input");
    check.type = "checkbox";
    check.classList.add("check-box");
     check.addEventListener('change', () => {
      if (check.checked) {
        completetasklist.appendChild(li);
      } else {
        listcontainer.appendChild(li);
      }
    });
    
    let p = document.createElement("p");
    p.innerHTML = inputbox.value;

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "Delete";

    let EditBtn = document.createElement("button");
    EditBtn.classList.add("edit-btn");
    EditBtn.innerHTML = "Edit";

    
    li.appendChild(check);
    li.appendChild(p);
    li.appendChild(deleteBtn);
    li.appendChild(EditBtn);
    listcontainer.appendChild(li);
    localStorage.setItem('tasks', JSON.stringify(Array.from(listcontainer.children).map(li => li.textContent)));

    deleteBtn.addEventListener('click', (event)=> {
      if (event.target.classList.contains("delete-btn")) {
        event.target.parentElement.remove();
      }
    });
    EditBtn.addEventListener('click', (event)=> {
      if (event.target.classList.contains("edit-btn")) {
        let edit = prompt("Edit your task");
        let p = event.target.parentElement.querySelector("p");
        p.innerHTML = edit;
      }
    });
  }
  
saveToLocalStorage();
  inputbox.value = "";
}
function saveToLocalStorage() {
  localStorage.setItem("listcontainer", listcontainer.innerHTML);
}
