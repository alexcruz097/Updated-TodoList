const listContainer = document.querySelector(".list-container");
const addBTN = document.querySelector(".add-btn");
const removeBTN = document.querySelector(".deleteBTN");
// form
const todoText = document.querySelector("#todo-form");
const todoDateInput = document.querySelector("#todo-date");
const todoForm = document.querySelector(".todo-form");
const addFormBTN = document.querySelector(".add-form-btn");
const editBTN = document.querySelector(".editBTN");
const editButtonForm = document.querySelector(".edit-btn");
const todoList = [
  { todo: "Go to work", dueDate: "02/15/2025", completed: false, id: "12324" },
  {
    todo: "Go to the park",
    dueDate: "5/25/2025",
    completed: false,
    id: "7465745",
  },
  {
    todo: "Go to program get a job",
    dueDate: "4/29/2026",
    completed: false,
    id: "34564",
  },
];

// create random color
const randomColor = () => {
  let r = Math.floor(Math.random() * 155);
  let g = Math.floor(Math.random() * 155);
  let b = Math.floor(Math.random() * 155);
  return `rgb(${r}, ${g} ,${b})`;
};

// dynamicaly two form
const addForm = () => {
  todoForm.classList.toggle("show-form");
  todoForm.classList.toggle("hide-form");
  addBTN.style = "display: block";
  editButtonForm.style = "display:none;";
};

const editForm = () => {
  todoForm.classList.toggle("show-form");
  todoForm.classList.toggle("hide-form");
  addBTN.style = "display:none;";
  editButtonForm.style = "display:block;";
};

const createBTN = (className, innerText) => {
  let editBTN = document.createElement("button");
  editBTN.classList.add(className);
  editBTN.textContent = innerText;
  return editBTN;
};
// create todo Template
const todoTemplate = (todoText, date, id) => {
  // create li
  let Li = document.createElement("li");
  Li.classList.add("todo");
  // create edit/delete btn and p for date
  let editBTN = createBTN("editBTN", "Edit");
  let deleteBTN = createBTN("deleteBTN", "Delete");
  let p = document.createElement("p");
  p.classList.add("due-date");
  p.textContent = `Due: ${date}`;
  // append to LI
  Li.textContent = todoText;
  Li.id = id;
  Li.appendChild(editBTN);
  Li.appendChild(p);
  Li.appendChild(deleteBTN);
  return Li;
};
//generate todo
const generateTodo = () => {
  listContainer.innerHTML = "";
  todoList.map((todo) => {
    listContainer.appendChild(todoTemplate(todo.todo, todo.dueDate, todo.id));
  });
};
window.onload = generateTodo;

// create item and push to arr
const createTodo = (e) => {
  e.preventDefault();
  let randomID = Math.floor(
    Math.random() * Math.floor(Math.random() * Date.now())
  );
  // get date and format it
  const dateObject = new Date(todoDateInput.value);
  let dueDate = dateObject.toLocaleDateString();
  // push new todo to the array
  let newTodo = {
    todo: todoText.value,
    dueDate: dueDate,
    completed: false,
    id: randomID,
  };
  todoList.push(newTodo);
  // after pushing generate todo
  generateTodo();
  // clear form
  todoText.value = "";
  todoDateInput.valueAsDate = null;

  // hide form
  addForm();
};

const editTodo = () => {
  alert("click");
};

addFormBTN.addEventListener("click", addForm);
addBTN.addEventListener("click", createTodo);
editButtonForm.addEventListener("click", (e) => {
  e.preventDefault();
  editTodo();
  
});

listContainer.addEventListener("click", (e) => {
  // delete Item
  if (e.target.classList.contains("deleteBTN")) {
    // remove item from the  arr
    todoList.map((todo, index) => {
      if (todo.id == e.target.parentNode.id) {
        todoList.splice(index, 1);
      }
    });
    // remove item from the node
    e.target.parentNode.remove();
  }
  // edit item
  if (e.target.classList.contains("editBTN")) {
    editForm();
    console.log(e.target.parentNode.id)
  }
});
