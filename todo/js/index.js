const input = document.querySelector("#inputArea");
const taskButton= document.querySelector("#btn");
let list = document.querySelector("#taskList");

//render means display fuction
function renderTasks() {
    list.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${index})">
            <span>${task.text}</span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        list.appendChild(li);
    });
}

//this function will send new tasks to localstorage and ten call render function to display list
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

//to toggle the value of completed when checkbox is clicked
function toggleComplete(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

//to dekete the task from list when delete button is clicked
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

//function to add tasks to list when enter key is hit
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

taskButton.addEventListener('click', addTask);

renderTasks();


