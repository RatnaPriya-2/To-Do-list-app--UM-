let taskList = document.getElementById("task-list");
let addTaskButton = document.getElementById("add-task-button");
let taskInput = document.getElementById("task-input");
let taskToEdit = null;
let notification;

/**
 * Show notification with smooth class toggling
 */
const manageNotification = (message) => {
  let errorMessage = document.querySelector(".error-message p");
  let errorContainer = document.querySelector(".error-message");

  // Reset any previous animation
  errorContainer.classList.remove("show");

  // Clear previous timeout if multiple notifications come quickly
  clearTimeout(notification);

  // Set the message text
  errorMessage.innerText = message;

  // Ensure class is applied on next frame → smoother animation
  requestAnimationFrame(() => {
    errorContainer.classList.add("show");
  });

  // Auto-hide after 1.5 sec
  notification = setTimeout(() => {
    errorContainer.classList.remove("show");
  }, 1500);
};

/**
 * Save all current tasks into localStorage
 */
const saveTasksToLocalStorage = () => {
  let tasks = [];
  let taskItems = taskList.querySelectorAll("li");

  taskItems.forEach((item) => {
    let taskText = item.querySelector(".task-text span").innerText;
    let isChecked = item.querySelector(".task-checkbox").checked;

    tasks.push({ task: taskText, checked: isChecked });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

/**
 * Creates a new task <li> element and attaches all necessary event listeners
 */
const createTaskElement = (taskText, isChecked) => {
  let listItem = document.createElement("li");

  // Generate unique ID (perfect for label → checkbox pairing)
  let uniqueId = crypto.randomUUID();

  // NOTE: added quotes around id attribute to be safe (HTML rule)
  listItem.innerHTML = `
    <label for="${uniqueId}" class="task-text">
      <input type="checkbox" class="task-checkbox" id="${uniqueId}" />
      <span>${taskText}</span>
    </label>
    <div class="task-icons">
      <img src="./assets/delete.png" alt="Delete" class="delete-icon" />
      <img src="./assets/edit.png" alt="Edit" class="edit-icon" />
    </div>
  `;

  taskList.appendChild(listItem);

  // Clear input after adding
  taskInput.value = "";

  // DELETE BUTTON
  let deleteIcon = listItem.querySelector(".delete-icon");
  deleteIcon.addEventListener("click", () => {
    listItem.remove(); // Remove task
    manageNotification("Task successfully deleted");
    saveTasksToLocalStorage();
  });

  // EDIT BUTTON
  let editIcon = listItem.querySelector(".edit-icon");
  editIcon.addEventListener("click", () => {
    // Load text into input and store reference
    taskInput.value = listItem.querySelector(".task-text span").innerText;
    taskToEdit = listItem;
  });

  // CHECKBOX TOGGLE
  let checkbox = listItem.querySelector(".task-checkbox");
  let taskTextElement = listItem.querySelector(".task-text span");

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      // Mark completed
      taskTextElement.style.textDecoration = "line-through";
      manageNotification("Task marked as completed");
    } else {
      // Mark incomplete
      taskTextElement.style.textDecoration = "none";
      manageNotification("Task marked as incomplete");
    }
    saveTasksToLocalStorage();
  });

  // If coming from localStorage, apply pre-checked state
  if (isChecked) {
    checkbox.checked = "true";
    //checkbox.setAttribute("checked", "true");
    taskTextElement.style.textDecoration = "line-through";
  }

  saveTasksToLocalStorage();
};

/**
 * Add task or handle edit mode
 */
const addTask = () => {
  let taskText = taskInput.value.trim();

  // Load existing tasks to check for duplicates
  let alreadyAddedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  let isDuplicate = alreadyAddedTasks.some(
    (task) => task.task.toLowerCase() === taskText.toLowerCase()
  );

  // --- EDITING MODE ---
  if (taskToEdit && taskText !== "") {
    let oldText = taskToEdit.querySelector(".task-text span").innerText;

    // No changes made
    if (oldText.toLowerCase() === taskText.toLowerCase()) {
      manageNotification("No changes made to the task");
      taskToEdit = null;
      taskInput.value = "";
      return;
    }

    // Apply changes
    taskToEdit.querySelector(".task-text span").innerText = taskText;
    manageNotification("Task successfully edited");
    taskToEdit = null;
    taskInput.value = "";
    saveTasksToLocalStorage();
    return;
  }

  // --- ADD NEW TASK ---
  if (taskText === "") {
    manageNotification("Please enter a task");
    return;
  }

  if (!isDuplicate) {
    createTaskElement(taskText);
    manageNotification("Task successfully added");
  } else {
    manageNotification("Task already exists");
  }
};

/**
 * Load tasks from localStorage on page start
 */
const fetchTasksFromLocalStorage = () => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    createTaskElement(task.task, task.checked);
  });
};

fetchTasksFromLocalStorage();

// Event listeners
addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
