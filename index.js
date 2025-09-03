const listContainer = document.querySelector(".list-container");
const addBTN = document.querySelector(".addBTN");

// create random color
const randomColor = () => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g} ,${b})`;
};

const createBTN = (className, innerText) => {
  let editBTN = document.createElement("button");
  editBTN.classList.add(className);
  editBTN.textContent = innerText;
  return editBTN;
};
const deleteItem = (event) => {
  // if li is click then crossed it out
  event.target.parentNode.remove();
};

const editItem = (event) => {
  let updatedItem = prompt("Update your todo item");
  // add item to the list
  event.target.parentNode.innerHTML = `${updatedItem} <button class="editBTN">Edit</button> <button class="deleteBTN">Delete</>`;
};

const createItem = (e) => {
  e.preventDefault();
  let promptItem = prompt("Add item list");
  // create edit button
  let editBTN = createBTN("editBTN", "Edit");
  //create delete button
  let deleteBTN = createBTN("deleteBTN", "Delete");
  // create element
  let newItem = document.createElement("li");
  // add value to new item
  newItem.textContent = promptItem;
  // class
  newItem.classList.add("todo");
  // add random background color
  newItem.style.backgroundColor = randomColor();
  // add edit button into the list item
  newItem.appendChild(editBTN);
  // add delete btn
  newItem.appendChild(deleteBTN);
  // add newitem to container
  listContainer.appendChild(newItem);
  // clear the text
};

// add item event listener
// delete item listener
listContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("addBTN")) {
    addBTN.addEventListener("click", createItem);
  }

  if (event.target.classList.contains("deleteBTN")) {
    deleteItem(event);
  }
  // add event to edit button
  if (event.target.classList.contains("editBTN")) {
    editItem(event);
  }
});
