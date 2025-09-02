// const listContainer = document.querySelector(".list-container");
// const inputText = document.querySelector(".itemName");
// const addBTN = document.querySelector(".addBTN");
// //  get text
// inputText.addEventListener("input", function (evt) {
//   inputText = this.value;
// });
// // add item
// addBTN.addEventListener("click", () => {
//   // we create a new element to append it to the list
//   let newElement = document.createElement("li");
//   let editBTN = document.createElement("button");
//   editBTN.textContent = "Edit";
//   editBTN.classList.add("editBTN")
//   // add text to the element
//   newElement.textContent = item;
//   // append btn to new item
//   newElement.appendChild(editBTN);
//   // append element to the container
//   listContainer.appendChild(newElement);
// });

// // delete the items
// listContainer.addEventListener("click", (event) => {
// // delete item only if div is press and not the edit button
//   event.target.tagName == "LI"? event.target.remove() : null
// // edit items
// event.target.tagName=="BUTTON"? editFunction(event) : null
// });
// // edit item
// const editFunction = (event)=>{
//   let editedItem = prompt("Edit the item list")
// event.target.parentNode.innerHTML = `${editedItem} <button>Edit</button>`
// }

const listContainer = document.querySelector(".list-container");
const inputText = document.querySelector(".itemName");
const addBTN = document.querySelector(".addBTN");

// create random color
const randomColor = () => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g} ,${b})`;
};

console.log(randomColor())
const createItem = (e) => {
  e.preventDefault();
  // create edit button
  let editBTN = document.createElement("button");
  editBTN.textContent = "Edit";
  // create element
  let newItem = document.createElement("li");
  // add value to new item
  newItem.textContent = inputText.value;
  // class
  newItem.classList.add("todo");
  // add random background color
newItem.style.backgroundColor= randomColor();


  // add edit button into the list item
  newItem.appendChild(editBTN);
  // add newitem to container
  listContainer.appendChild(newItem);
  // clear the text
  inputText.value = "";
};

const deleteItem = (event) => {
  // if li is click then crossed it out
  event.target.tagName == "LI"
    ? event.target.classList.toggle("crossTodo")
    : null;
};

const editItem = (event) => {
  if (event.target.tagName == "BUTTON") {
    let updatedItem = prompt("Update your todo item");
    // add item to the list
    event.target.parentNode.innerHTML = `${updatedItem} <button>Edit</button>`;
  } else {
    null;
  }
};

// add item event listener
addBTN.addEventListener("click", createItem);
// delete item listener
listContainer.addEventListener("click", function (event) {
  // callback function to have access to evnet
  deleteItem(event);
  // add event to edit button
  editItem(event);
});
