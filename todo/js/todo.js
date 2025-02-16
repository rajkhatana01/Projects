const input = document.querySelector("#inputArea");
const button = document.querySelector("#btn");
const list = document.querySelector("#taskList");


function display(){
    list.innerHTML="";
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task,index) => {
        const li = document.createElement('li');
        li.className = task.complete? 'complete' : '  ';
        li.innerHTML = `
            <input type="checkbox" ${task.complete ? "checked" : ' '} onclock = "toggleComplete(${index})">
            <span>${task.value}</span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        list.appendChild(li);
    });
}



function addTask(){
    
}