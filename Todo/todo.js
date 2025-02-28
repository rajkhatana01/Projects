const input = document.querySelector("#inputArea");
const taskButton = document.querySelector("#btn");
let list = document.querySelector("#taskList");


let taskId = localStorage.getItem('taskId') ? parseInt(localStorage.getItem('taskId')) : 1;

let isEditing  = false;
let currentEditingId = null;

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function updateLocalStorage(){

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('taskId', taskId);

}


function displayTasks(){

    list.innerHTML = " ";

    if(tasks.length >0){
        tasks.forEach((task, index, arr) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" ${task.status? 'checked' : ''} onclick="isComplete(${task.id} , ${index})">
                <span>${task.text}</span>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;
            list.appendChild(li);

        });

    }
   
}

function addTask() {
    const taskText = input.value.trim();
    if (taskText) {
        if (isEditing) {

            tasks = tasks.map((task) => {
                if (task.id === currentEditingId) {
                    return { ...task, text: taskText };
                }
                return task;
            });

            isEditing = false;
            currentEditingId = null;
        } else {

            tasks.push({ id: taskId, text: taskText, status: false });
            taskId++;
        }
        input.value = '';
        displayTasks();
        updateLocalStorage();
    }
}



input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const taskText = input.value.trim();
        if (taskText) {
            addTask();
        }
    }
});


function isComplete(id,index){
    tasks[index].status = !tasks[index].status;
    // tasks = tasks.map(task => {
    //     if (task.id === id) {
    //         return { ...task, status: !task.status };
    //     }
    //     return task;
    // });
    // displayTasks();
    updateLocalStorage();
}


function deleteTask(id){
    tasks =  tasks.filter((task) =>{
       return (task.id !== id);
    })

    tasks.forEach((task, index) => {
        task.id = index + 1;
    });

    taskId = tasks.length + 1;
    displayTasks();
    updateLocalStorage();
}


function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if(task){
        input.value = task.text;
        isEditing = true;
        currentEditingId = id;
        input.focus();
    }

}


taskButton.addEventListener('click', addTask);

displayTasks();
