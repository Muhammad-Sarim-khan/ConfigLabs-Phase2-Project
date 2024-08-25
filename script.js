const input = document.getElementById("input");
const taskContainer = document.querySelector(".task-container .list-items");
const doneContainer = document.querySelector(".done-container .list-items");
const buttons = document.querySelector('.buttons');
const taskCountElement = document.getElementById("task-count");
const doneCountElement = document.getElementById("done-count");


let taskToUpdate = null; 

function addtask(event) {
    event.preventDefault();

    if (input.value === "") {
        alert("Please enter a task!");
    } else {
        if (taskToUpdate) {
            updateTask(taskToUpdate, input.value);
            taskToUpdate = null; 
        } else {
            createTask(input.value);
        }
        input.value = "";
        updateTaskCounts();
        savedata();
    }
}

function createTask(taskText) {
    let li = document.createElement("li");
    let taskSpan = document.createElement("span");
    taskSpan.classList.add("task-text");
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    const buttonsClone = buttons.cloneNode(true);
    buttonsClone.style.display = "inline"; 
    li.appendChild(buttonsClone);
    attachButtonListeners(li, taskSpan);
    taskContainer.appendChild(li);
    savedata();
}

function attachButtonListeners(li, taskSpan) {
    const completedButton = li.querySelector('.complete-btn');
    completedButton.onclick = () => {
        completeTask(li, taskSpan);
        updateTaskCounts();
        savedata();
    };

    const deleteButton = li.querySelector('.delete-btn');
    deleteButton.onclick = () => {
        deleteTask(li);
        updateTaskCounts(); 
        savedata();
    };

    const updateButton = li.querySelector('.edit-btn');
    updateButton.onclick = () => prepareTaskForUpdate(taskSpan, li);
}

function completeTask(li, taskSpan) {
    taskSpan.style.textDecoration = "line-through"; 
    taskSpan.style.color = "#78CFB0";

    const buttons = li.querySelectorAll("button");
    buttons.forEach(button => button.remove());

    taskContainer.removeChild(li);
    doneContainer.appendChild(li);
    savedata();
}

function deleteTask(li) {
    li.remove(); 
    savedata();
}

function prepareTaskForUpdate(taskSpan, li) {
    input.value = taskSpan.textContent; 
    taskToUpdate = li; 
}

function updateTask(li, newText) {
    li.querySelector('.task-text').textContent = newText; 
    savedata();
}

function updateTaskCounts() {
    taskCountElement.textContent = taskContainer.children.length; 
    doneCountElement.textContent = doneContainer.children.length; 
}

function savedata() {
    const tasksToDoHTML = taskContainer.innerHTML;
    const tasksDoneHTML = doneContainer.innerHTML;

    localStorage.setItem("tasksToDo", tasksToDoHTML);
    localStorage.setItem("tasksDone", tasksDoneHTML);
}

function showtask() {
    const tasksToDoHTML = localStorage.getItem("tasksToDo");
    const tasksDoneHTML = localStorage.getItem("tasksDone");

    if (tasksToDoHTML) {
        taskContainer.innerHTML = tasksToDoHTML;
        restoreButtonListeners(taskContainer);
    }

    if (tasksDoneHTML) {
        doneContainer.innerHTML = tasksDoneHTML;
    }

    updateTaskCounts();
}

function restoreButtonListeners(container) {
    const tasks = container.querySelectorAll("li");
    tasks.forEach(task => {
        const taskSpan = task.querySelector(".task-text");
        attachButtonListeners(task, taskSpan);
    });
}

showtask();


