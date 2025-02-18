const input = document.querySelector("#inputArea");
const taskButton = document.querySelector("#btn");
let list = document.querySelector("#taskList");
let isEditing = false;
let currentEditIndex = null;

// Render means display function
function renderTasks() {
    list.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${index})">
            <span>${task.text}</span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        list.appendChild(li);
    });
}

// This function will send new tasks to localStorage and then call render function to display list
function addTask() {
    const taskText = input.value.trim();
    if (taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        input.value = '';
        renderTasks();
    }
}

// To toggle the value of completed when checkbox is clicked
function toggleComplete(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// To delete the task from list when delete button is clicked
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// To edit the task from list when edit button is clicked
function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    input.value = tasks[index].text;
    isEditing = true;
    currentEditIndex = index;
    input.focus();
}

// Function to handle both adding new tasks and editing existing ones
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const taskText = input.value.trim();
        if (taskText) {
            if (isEditing) {
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                tasks[currentEditIndex].text = taskText;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                isEditing = false;
                currentEditIndex = null;
            } else {
                addTask();
            }
            input.value = '';
            renderTasks();
        }
    }
});

taskButton.addEventListener('click', addTask);

renderTasks();
