// function to add Task
function addTask(e) {
	let inputValue = document.getElementById("Input").value;
	const listItems = document.getElementById("listitem");
	// check if inputValue is not false
	if (!inputValue) return
	// create an li first start with checkbox, then the li and edit button and lastly deletbutton
	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.classList.add("checkBox");

	// create li
	const li = document.createElement("li");
	li.classList.add("todo");
	li.appendChild(checkbox);
	li.appendChild(document.createTextNode(inputValue));
	listItems.appendChild(li);
	// savetodo function here
	saveTodo(inputValue);
	// showMessage();
	showMessage();

	// create edit icon
	const editButton = document.createElement("button");
	const editIcon = document.createElement("i");
	editIcon.classList.add("fa-solid", "fa-pen");
	editButton.classList.add("edit");
	editButton.appendChild(editIcon);
	li.appendChild(editButton);

	// create delete button
	const deleteButton = document.createElement("button");
	const deleteIcon = document.createElement("i");
	deleteIcon.classList.add("fa-solid", "fa-trash");
	deleteButton.classList.add("delete");
	deleteButton.appendChild(deleteIcon);
	li.appendChild(deleteButton);

	document.getElementById("Input").value = "";
	checkbox.addEventListener("click", checkTodo);
	editButton.addEventListener("click", editTodo);
	deleteButton.addEventListener("click", deleteTodo);
}

// icon to add task
const addIcon = document.getElementById("icon");
addIcon.addEventListener("click", addTask);

// {
// function to save todo
function saveTodo(task) {
	const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	tasks.push(task);
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// function to get todo
document.addEventListener("DOMContentLoaded", getTodo);
function getTodo() {
	const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	const listItems = document.getElementById("listitem");

	tasks.forEach((task) => {
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.classList.add("checkBox");

		// create li
		const li = document.createElement("li");
		li.classList.add("todo");
		li.appendChild(checkbox);
		li.appendChild(document.createTextNode(task));
		listItems.appendChild(li);

		// create edit icon
		const editButton = document.createElement("button");
		const editIcon = document.createElement("i");
		editIcon.classList.add("fa-solid", "fa-pen");
		editButton.classList.add("edit");
		editButton.appendChild(editIcon);
		li.appendChild(editButton);

		// create delete button
		const deleteButton = document.createElement("button");
		const deleteIcon = document.createElement("i");
		deleteIcon.classList.add("fa-solid", "fa-trash");
		deleteButton.classList.add("delete");
		deleteButton.appendChild(deleteIcon);
		li.appendChild(deleteButton);

		checkbox.addEventListener("click", checkTodo);
		editButton.addEventListener("click", editTodo);
		deleteButton.addEventListener("click", deleteTodo);
	});
}

// check for completed todo's
function checkTodo(e) {
	if (e.target.checked) {
		const confirmDelete = confirm("Are you sure you want to mark this task as completed?");
		if (!confirmDelete) {
			e.target.checked = false; // Uncheck if the user cancels
			return;
		}

		const listItems = document.getElementById("listitem");
		const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
		const todo = e.target.parentElement;
		const todoText = todo.childNodes[1].textContent.trim();
		const editButton = todo.childNodes[2];
		const deleteButton = todo.childNodes[3];
		const index = tasks.indexOf(todoText);

		if (index !== -1) {
			const newTasks = tasks.filter((task) => task !== todoText);
			todo.style.textDecoration = "line-through";
			editButton.style.color = "gray";
			deleteButton.style.color = "gray";
			localStorage.setItem("tasks", JSON.stringify(newTasks));
		}

		setTimeout(() => {
			listItems.removeChild(todo);
		}, 5000);
	}
}


// function to editTask
function editTodo(e) {
	const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	const todo = e.target.parentElement.parentElement;
	let todoTextNode = todo.childNodes[1]
	let todoText = todoTextNode.textContent.trim();
	const index = tasks.indexOf(todoText); // Find the index in the tasks array

	if (index !== -1) {
		const newInput = prompt("Edit Task", todoText);
		if (newInput) {
			tasks[index] = newInput; // Update the task in the array
			localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks to localStorage
			todoTextNode.textContent = newInput;
		}
	}
}

// function to delete
function deleteTodo(e) {
	if (confirm("Are you sure you want to delete this task?")) {
		const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
		const todo = e.target.parentElement.parentElement
		const listItems = document.getElementById("listitem");
		const todoText = todo.childNodes[1].textContent.trim()
		const newTasks = tasks.filter((task) => task !== todoText);
		localStorage.setItem("tasks", JSON.stringify(newTasks));
		listItems.removeChild(todo)
	}
}

// function to showMessage

function showMessage() {
	const message = document.getElementById("showmessage");
	message.style.color = "white";
	message.innerText = "Todo successfully created";

	setTimeout(() => {
		message.innerText = "";
	}, 3000);
}
