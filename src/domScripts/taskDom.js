import { getSelectedFolderID } from "./folderDom";
import { foldersArray, getFolderInstance, getTask, removeFromTasks } from "../folder";
import { changePriority } from "../task"
import { showInfo } from "./modifyTask";
import { format, isToday, parseISO } from "date-fns";


const priorities = {
    1: "important",
    2: "medium",
    3: "low",
    4: "none",
};


const todoList = document.querySelector(".todo-list");


export function loadTasks() {
    todoList.innerHTML = "";
    const selectFolder = getSelectedFolderID();
    if(selectFolder === "all") { 
        loadAllTasks();
    }
    else if (selectFolder === "today") {
        loadToday();
    }
    else {
        const folder = getFolderInstance(getSelectedFolderID());
        folder.tasks.forEach(task => {
        createTask(task);
        });
    }
    
}

export function loadAllTasks() {
    foldersArray.forEach(folder => {
        folder.tasks.forEach(task => {
            if(parseISO(task.dueDate))
            createTask(task);
        });
    });
}

function loadToday() {
    foldersArray.forEach(folder => {
        folder.tasks.forEach(task => {
            if(isDateToday(task.dueDate)) {
                createTask(task);
            }
        });
    });
}

function createTask(task) {

    const todo = document.createElement("div");
    todo.classList.add("todo");

    const div1 = document.createElement("div");
    const div2 = document.createElement("div");

    const checkbox = document.createElement("button");
    checkbox.classList.add("checkbox");

    if(task.isComplete) {
        checkbox.style.backgroundImage = "url(./icons/checkbox.png)";
    }

    checkbox.addEventListener("mouseover", (e) => {
        const task = getEventTask(e);
        if(!task.isComplete) {
            e.target.style.backgroundImage = "url(./icons/checkbox.gif)";
        }
    });

    checkbox.addEventListener("mouseleave", (e) => {
        const task = getEventTask(e);
        if(!task.isComplete) {
            e.target.style.backgroundImage = "";
        }
    });

    checkbox.addEventListener("click", changeChecked);

    const todoTitle = document.createElement("h2");
    todoTitle.classList.add("todo-title");

    const priority = document.createElement("div");
    priority.classList.add("priority");
    priority.addEventListener("click", changePriority);

    const dueDate = document.createElement("p");
    dueDate.classList.add("todo-date");

    const infoButton = document.createElement("button");
    const infoIcon = document.createElement("img");
    infoIcon.src = "./icons/info.png";
    infoButton.appendChild(infoIcon);

    infoButton.id = "info";
    infoButton.addEventListener("click", showInfo);

    const removeButton = document.createElement("button");
    const removeIcon = document.createElement("img");
    removeIcon.src = "./icons/remove.png";
    removeButton.appendChild(removeIcon);

    removeButton.id = "remove";
    removeButton.addEventListener("click", removeFromTasks);

    removeIcon.addEventListener("mouseover", () => {
        removeIcon.src = "./icons/remove.gif";
    });
    removeIcon.addEventListener("mouseleave", () => {
        removeIcon.src = "./icons/remove.png";
    });

    div1.appendChild(checkbox);
    div1.appendChild(todoTitle);

    div2.appendChild(priority);
    div2.appendChild(dueDate);
    div2.appendChild(infoButton);
    div2.appendChild(removeButton);

    todoTitle.textContent = task.title;

    setPriority(task, priority);
    dueDate.textContent = formatDate(task.dueDate);

    todo.appendChild(div1);
    todo.appendChild(div2);

    todo.id = task.id;
    todo.dataset.folderId = task.folderId;

    todoList.appendChild(todo);
}


function setPriority(task, priority) {
    let pr = priorities[task.priority];
    priority.classList.add(pr);
    priority.textContent = pr;
}

function formatDate(date) {
    
    return format(parseISO(date), "yyyy / MM / dd");
}

function isDateToday(date) {
    if(isToday(parseISO(date))) {
         return true;
    }
    return false;
}

export function changeChecked(event) {
    const task = getEventTask(event);
    task.toggleComplete();
    loadTasks();
}

export function getEventTask(event) {
    const ts = event.target.closest(".todo");
    const task = getTask(ts.id, ts.dataset.folderId);
    return task;
}