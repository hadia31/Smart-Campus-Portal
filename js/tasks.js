// ===== 1. Elements =====
const taskForm     = document.getElementById("taskForm");
const taskTitle    = document.getElementById("taskTitle");
const taskCourse   = document.getElementById("taskCourse");
const taskDue      = document.getElementById("taskDue");
const taskPriority = document.getElementById("taskPriority");
const taskList     = document.getElementById("taskList");
const taskMessage  = document.getElementById("taskMessage");
const taskCount    = document.getElementById("taskCount");

// ===== 2. Data: localStorage se purane tasks lo (ya khali array) =====
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== 3. User ko message dikhana =====
function showMessage(text, type) {
  taskMessage.textContent = text;
  taskMessage.className = "message " + type;   // "success" ya "error"

  // 3 second baad message hata do
  setTimeout(function () {
    taskMessage.textContent = "";
    taskMessage.className = "message";
  }, 3000);
}

// ===== 4. Tasks screen par dikhana =====
function displayTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskCount.textContent = "No tasks yet. Add your first task above.";
    return;
  }

  const pending = tasks.filter(function (t) { return !t.completed; }).length;
  taskCount.textContent = tasks.length + " task(s) | " + pending + " pending";

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "task-item priority-" + task.priority.toLowerCase();
    if (task.completed) {
      li.classList.add("completed");
    }

    // Task ki details
    const info = document.createElement("div");
    info.className = "task-info";

    const title = document.createElement("strong");
    title.textContent = task.title;

    const details = document.createElement("small");
    details.textContent = task.course + " | Due: " + task.due + " | Priority: " + task.priority;

    info.appendChild(title);
    info.appendChild(details);

    // Buttons
    const actions = document.createElement("div");
    actions.className = "task-actions";

    const doneBtn = document.createElement("button");
    doneBtn.className = "btn-small btn-done";
    doneBtn.textContent = task.completed ? "Undo" : "Complete";
    doneBtn.addEventListener("click", function () {
      toggleTask(task.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-small btn-delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });

    actions.appendChild(doneBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(info);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

// ===== 5. Task add karna =====
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();                       // page refresh rokna

  const title = taskTitle.value.trim();
  const due   = taskDue.value;

  // Validation
  if (title === "") {
    showMessage("Please enter a task title.", "error");
    return;
  }
  if (due === "") {
    showMessage("Please select a due date.", "error");
    return;
  }

  const newTask = {
    id: Date.now(),                             // unique number
    title: title,
    course: taskCourse.value,
    due: due,
    priority: taskPriority.value,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  displayTasks();
  taskForm.reset();
  showMessage("Task added successfully.", "success");
});

// ===== 6. Complete / Undo =====
function toggleTask(id) {
  tasks.forEach(function (task) {
    if (task.id === id) {
      task.completed = !task.completed;
    }
  });
  saveTasks();
  displayTasks();
  showMessage("Task status updated.", "success");
}

// ===== 7. Delete =====
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  saveTasks();
  displayTasks();
  showMessage("Task deleted.", "success");
}

// Page khulte hi saved tasks dikhao
displayTasks();
