let taskInput = document.querySelector('#main-input-box input');
let list = document.querySelector('.ul');
let removeBtn = document.querySelector('.remove-button');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        taskAddition();
    }
});

function taskAddition() {
    let inputValue = taskInput.value.trim();
    if (inputValue === "") return;

    let taskId = Date.now().toString(); // Unique ID for each task

    let task = {
        id: taskId,
        text: inputValue,
        completed: false
    };

    saveTaskToLocalStorage(task);
    addTaskToDOM(task);
    taskInput.value = "";
}

// Function to add task to the DOM
function addTaskToDOM(task) {
    let li = document.createElement('li');
    li.innerHTML = `<input style="cursor:pointer;" type="checkbox" class="checkbox" data-id="${task.id}"> ${task.text}`;
    if (task.completed) {
        li.classList.add('complete');
        li.querySelector('input').checked = true;
    }
    list.append(li);
}

// Save task to localStorage
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

// Handle checking tasks and removing them
list.addEventListener('click', function (event) {
    if (event.target.nodeName === 'INPUT' && event.target.type === 'checkbox') {
        let checkbox = event.target;
        let listTask = checkbox.parentElement;
        listTask.classList.toggle('complete');
        
        updateTaskStatus(checkbox.dataset.id, checkbox.checked);
    }
});

// Update task completion status in localStorage
function updateTaskStatus(taskId, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        if (task.id === taskId) {
            task.completed = isCompleted;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove selected tasks when clicking the remove button
removeBtn.addEventListener('click', function () {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let updatedTasks = tasks.filter(task => {
        let checkbox = document.querySelector(`input[data-id="${task.id}"]`);
        return !checkbox.checked; // Keep only unchecked tasks
    });

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    loadTasksAfterDeletion();
});

// Reload tasks in the DOM after deletion
function loadTasksAfterDeletion() {
    list.innerHTML = ""; // Clear list
    loadTasks(); // Reload tasks from storage
}
