const listContainer = document.querySelector(".list-container");
const addBTN = document.querySelector(".add-btn");
const removeBTN = document.querySelector(".deleteBTN");
const editBTN = document.querySelector(".editBTN");

// form
const todoTextInput = document.querySelector("#todo-form");
const todoDateInput = document.querySelector("#todo-date");
const todoForm = document.querySelector(".todo-form");
const addButtonSubmit = document.querySelector(".add-form-btn");
const editButtonSubmit = document.querySelector(".edit-btn");

const cancelForm = document.querySelector(".cancel-form");
const todoList = [
  {
    todo: "Learn to Program",
    dueDate: "02/15/2025",
    completed: false,
    id: "12324",
  },
];

// dynamicaly two form
const addForm = () => {
  todoForm.classList.toggle("show-form");
  todoForm.classList.toggle("hide-form");
  addBTN.style = "display: block";
  editButtonSubmit.style = "display:none;";
};

const editForm = (e) => {
  todoForm.classList.toggle("show-form");
  todoForm.classList.toggle("hide-form");
  addBTN.style = "display:none;";
  editButtonSubmit.style = "display:block;";
};
cancelForm.addEventListener("click", (e) => {
  e.preventDefault();
  addForm();
});
// =========template creation
// create button
const createBTN = (className, innerText) => {
  let editBTN = document.createElement("button");
  editBTN.classList.add(className);
  editBTN.textContent = innerText;
  return editBTN;
};
// create todo Template
const todoTemplate = (todoTextInput, date, id) => {
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
  Li.textContent = todoTextInput;
  Li.id = id;
  Li.appendChild(editBTN);
  Li.appendChild(p);
  Li.appendChild(deleteBTN);
  return Li;
};
//generate todo function
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
  // get dat, format it and make it local time zone
  const dateObject = new Date(todoDateInput.value + "T00:00:00");
  let dueDate = dateObject.toLocaleDateString();
  // push new todo to the array
  let newTodo = {
    todo: todoTextInput.value,
    dueDate: dueDate,
    completed: false,
    id: randomID,
  };
  todoList.push(newTodo);
  // after pushing generate todo
  generateTodo();
  // clear form
  todoTextInput.value = "";
  todoDateInput.valueAsDate = null;

  // hide form
  addForm();
};

// ================ Edit functionality
let editID = "";
const editTodo = () => {
  const dateObject = new Date(todoDateInput.value + + "T00:00:00");
  let dueDate = dateObject.toLocaleDateString();
  todoList.map((todo) => {
    if (todo.id == editID) {
      (todo.todo = todoTextInput.value),
        (todo.dueDate = dueDate),
        (todo.completed = false),
        (todo.id = editID);
    }
  });
  // clear form
  todoTextInput.value = "";
  todoDateInput.valueAsDate = null;
  // generate items
  generateTodo();
  // hideForm
  addForm();
};

addButtonSubmit.addEventListener("click", addForm);
addBTN.addEventListener("click", createTodo);
editButtonSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  editTodo();
});

listContainer.addEventListener("click", (e) => {
  //=============== delete functionality
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
    // show form
    editForm();
    // update new todo
    editID = e.target.parentNode.id;
  }
});
