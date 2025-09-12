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

const cancelForm = document.querySelector(".cancel-form-btn");

// filter buttons
const filterBTNS = document.querySelector(".filter-list");
// let todoList equal to local storage
const todoList = JSON.parse(localStorage.getItem("todoList") || []);

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
  addBTN.style = "display: none;";
  editButtonSubmit.style = "display:block;";
};
cancelForm.addEventListener("click", (e) => {
  e.preventDefault();
  addForm();
});
// =========template creation
// create button
const createBTN = (className, innerText) => {
  let createBTN = document.createElement("button");
  createBTN.classList.add(className);
  createBTN.textContent = innerText;
  return createBTN;
};

const setLocalStorage = () => {
  const todoList_serialized = JSON.stringify(todoList);
  // push new item to local storage
  return localStorage.setItem("todoList", todoList_serialized);
};
// create todo Template
const todoTemplate = (todoTextInput, date, id) => {
  // create li
  let Li = document.createElement("li");
  Li.classList.add("todo");
  // create edit/delete btn and p for date
  let editBTN = createBTN("editBTN", "Edit");
  let deleteBTN = createBTN("deleteBTN", "X");
  let completedBTN = createBTN("completedBTN", "Complete");
  let p = document.createElement("p");
  p.classList.add("due-date");
  p.textContent = `Due: ${date}`;
  // append to LI
  Li.textContent = todoTextInput;
  Li.id = id;
  Li.appendChild(editBTN);
  Li.appendChild(p);
  Li.appendChild(deleteBTN);
  Li.appendChild(completedBTN);
  return Li;
};
//generate todo function
const generateTodo = () => {
  listContainer.innerHTML = "";
  let todoList_deserialized = JSON.parse(localStorage.getItem("todoList"));
  // add a style if item is completed
  todoList_deserialized.map((todo) => {
    if (todo.completed == false) {
      listContainer.appendChild(todoTemplate(todo.todo, todo.dueDate, todo.id));
    }
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

  // add validation to input
  if (todoTextInput.value === "" && todoDateInput.value === "") {
    alert(`please input both: Todo and DueDate`);
  } else if (todoTextInput.value === "") {
    alert(`please type what is your Todo`);
  } else if (todoDateInput.value === "") {
    alert("Please input your due date for your task.");
  } else {
    let newTodo = {
      todo: todoTextInput.value,
      dueDate: dueDate,
      completed: false,
      id: randomID,
    };
    todoList.push(newTodo);
    // add new array to local storage
    setLocalStorage();

    // after pushing generate todo
    generateTodo();
    // clear form
    todoTextInput.value = "";
    todoDateInput.valueAsDate = null;

    // hide form
    addForm();
  }
};

// ================ Edit functionality
let editID = "";
const editTodo = () => {
  console.log(todoDateInput.value);
  if (todoTextInput.value === "" && todoDateInput.value === "") {
    alert(`please input both: Todo and DueDate`);
  } else if (todoTextInput.value === "") {
    alert(`please type what is your Todo`);
  } else if (todoDateInput.value === "") {
    alert("Please input your due date for your task.");
  } else {
    const dateObject = new Date(todoDateInput.value + "T00:00:00");
    let dueDate = dateObject.toLocaleDateString();
    todoList.map((todo) => {
      if (todo.id == editID) {
        (todo.todo = todoTextInput.value),
          (todo.dueDate = dueDate),
          (todo.completed = false),
          (todo.id = editID);
      }
    });
    // add new array to local storage
    setLocalStorage();

    // clear form
    todoTextInput.value = "";
    todoDateInput.valueAsDate = null;
    // generate items
    generateTodo();
    // hideForm
    addForm();
  }
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
    // update the local storage
    setLocalStorage();
    e.target.parentNode.remove();
  }
  // edit item
  if (e.target.classList.contains("editBTN")) {
    // show form
    editForm();
    // update new todo
    editID = e.target.parentNode.id;
  }

  //==================================== filter

  // completed
  if (e.target.classList.contains("completedBTN")) {
    // iterate
    todoList.map((todo, index) => {
      if (todo.id == e.target.parentNode.id) {
        todo.completed = true;
        // remove the completed from the page
        e.target.parentNode.remove();
      }
    });
    // update local storage
    setLocalStorage();
    console.log(localStorage.getItem("todoList"));
  }
});

//==================================== filter
filterBTNS.addEventListener("click", (e) => {
  // upcoming Filter=============
  if (e.target.classList.contains("upcoming-filter")) {
    generateTodo();
  }

  // ==============filter by completed
  if (e.target.classList.contains("completed-filter-btn")) {
    let completedTodo = todoList.filter((todo) => {
      return todo.completed === true;
    });
    // append filter to page
    listContainer.textContent = "";
    completedTodo.map((todo) => {
      if (todo.completed == true) {
        let completedLi = todoTemplate(todo.todo, todo.dueDate, todo.id);
        completedLi.classList.add("completed-todo");
        listContainer.appendChild(completedLi);
      }
    });
  }
  //============== filter by today
  // Create a new Date object representing the current date and time
  const currentDate = new Date();
  // Get the day of the month (1-31)
  const day = currentDate.getDate();
  // Get the month (0-11, so add 1 for the actual month number)
  const month = currentDate.getMonth() + 1;
  // Get the full year (e.g., 2025)
  const year = currentDate.getFullYear();

  if (e.target.classList.contains("today-filter-btn")) {
    let todayTodo = todoList.filter((todo) => {
      return todo.dueDate === `${month}/${day}/${year}`;
    });
    // if there are no due date today
    if (todayTodo.length === 0) {
      listContainer.textContent = "Great! No due dates due today";
    } else {
      // append filter to page
      listContainer.textContent = "";
      todayTodo.map((todo) => {
        listContainer.appendChild(
          todoTemplate(todo.todo, todo.dueDate, todo.id)
        );
      });
    }
  }
});
