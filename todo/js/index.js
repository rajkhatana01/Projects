const input = document.querySelector("#inputArea");
const taskButton = document.querySelector("#btn");
let list = document.querySelector("#taskList");
let isEditing = false;
let currTaskIndex = null;


function displayTasks() {
    list.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="isComplete(${index})">
            <span id="item${++index}">${task.text}</span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        list.appendChild(li);
    });
}

function addTask() {
    const taskText = input.value.trim();
    if (taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        input.value = '';
        displayTasks();
    }
}

function isComplete(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if(tasks[index].text === true){
        document.querySelector(`#item${++index}`).style.textDecoration = 'line-through';
    }
    displayTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index,1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    input.value = tasks[index].text;
    isEditing = true;
    currTaskIndex = index;
    input.focus();
}

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const taskText = input.value.trim();
        if (taskText) {
            if (isEditing) {
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                tasks[currTaskIndex].text = taskText;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                isEditing = false;
                currTaskIndex = null;
            } else {
                addTask();
            }
            input.value = '';
            displayTasks();
        }
    }
});

taskButton.addEventListener('click', addTask);

displayTasks();
