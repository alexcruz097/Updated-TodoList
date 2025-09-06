const listContainer = document.querySelector(".list-container");
const addBTN = document.querySelector(".add-btn");
// form
const todoText = document.querySelector("#todo-form");
const todoDateInput = document.querySelector("#todo-date");
const todoForm = document.querySelector(".todo-form")
const showFormBTN = document.querySelector(".show-form-btn")
const todoList = [];

// create random color
const randomColor = () => {
  let r = Math.floor(Math.random() * 155);
  let g = Math.floor(Math.random() * 155);
  let b = Math.floor(Math.random() * 155);
  return `rgb(${r}, ${g} ,${b})`;
};

const showForm = () => {
todoForm.classList.toggle("show-form")
todoForm.classList.toggle("hide-form")
};


const createBTN = (className, innerText) => {
  let editBTN = document.createElement("button");
  editBTN.classList.add(className);
  editBTN.textContent = innerText;
  return editBTN;
};
// create todo Template
const todoTemplate = (todoText, date) => {
  // create li
  let Li = document.createElement("li");
  Li.classList.add("todo");
  // random backcolor for each item
  Li.style.backgroundColor = randomColor();
  // create edit/delete btn and p for date
  let editBTN = createBTN("editBTN", "Edit");
  let deleteBTN = createBTN("deleteBTN", "Delete");
  let p = document.createElement("p");
  p.classList.add("due-date");
  p.textContent = `Due: ${date}`;
  // append to LI
  Li.textContent = todoText;
  Li.appendChild(editBTN);
  Li.appendChild(p);
  Li.appendChild(deleteBTN);
  return Li;
};
// create item and push to arr

const createTodo = (e) => {
  e.preventDefault();
  // get textt
  // get date and format it
  const dateObject = new Date(todoDateInput.value);
  let dueDate = dateObject.toLocaleDateString();
  // push new todo to the array
  todoList.push({
    text: todoText.value,
    dueDate: dueDate,
    completed: false,
  });

  // append new item into the pate
  let listItem = todoTemplate(todoText.value, dueDate);
  listContainer.appendChild(listItem);
  // clear form
  todoText.value = "";
  todoDateInput.valueAsDate = null;

  // hide form 
  showForm()
};
showFormBTN.addEventListener("click", showForm)
addBTN.addEventListener("click", createTodo);

//append to the page

// const createItem = (e) => {
//   e.preventDefault();
//   let promptItem = prompt("Add item list");
//   // create edit button
//   let editBTN = createBTN("editBTN", "Edit");
//   //create delete button
//   let deleteBTN = createBTN("deleteBTN", "Delete");
//   // create element
//   let newItem = document.createElement("li");
//   // add value to new item
//   newItem.textContent = promptItem;
//   // class
//   newItem.classList.add("todo");
//   // add random background color
//   newItem.style.backgroundColor = randomColor();
//   // add edit button into the list item
//   newItem.appendChild(editBTN);
//   // add delete btn
//   newItem.appendChild(deleteBTN);
//   // add newitem to container
//   listContainer.appendChild(newItem);
//   // clear the text
// };
// const deleteItem = (event) => {
//   // if li is click then crossed it out
//   event.target.parentNode.remove();
// };

// const editItem = (event) => {
//   let updatedItem = prompt("Update your todo item");
//   // add item to the list
//   event.target.parentNode.innerHTML = `${updatedItem} <button class="editBTN">Edit</button> <button class="deleteBTN">Delete</button>`;
// };

// // add item event listener
// addBTN.addEventListener("click", createItem);

// // delete item listener
// listContainer.addEventListener("click", function (event) {
//   if (event.target.classList.contains("deleteBTN")) {
//     deleteItem(event);
//   }
//   // add event to edit button
//   if (event.target.classList.contains("editBTN")) {
//     editItem(event);
//   }
// });
