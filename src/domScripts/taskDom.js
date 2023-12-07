import { getSelectedFolderID } from "./folderDom";
import { getFolderInstance } from "../folder";

const todoList = document.querySelector(".todo-list");

const priorities = {
    "1": "important",
    "2": "medium",
    "3": "low",
    "4": "none",
};

export function loadTasks() {
    const tasksArray = getFolderInstance(getSelectedFolderID());
    console.log();
    tasksArray.tasks.forEach(task => {
        createTask(task);
    });
}

function createTask(task) {

    const todo = document.createElement("div");
    todo.classList.add("todo");

    const div1 = document.createElement("div");
    const div2 = document.createElement("div");

    const checkbox = document.createElement("div");
    checkbox.classList.add("checkbox");
    const todoTitle = document.createElement("h2");
    todoTitle.classList.add("todo-title");

    const priority = document.createElement("div");
    priority.classList.add("priority");
    priority.addEventListener("click", changePriority);

    const dueDate = document.createElement("p");
    dueDate.classList.add("todo-date");

    div1.appendChild(checkbox);
    div1.appendChild(todoTitle);

    div2.appendChild(priority);
    div2.appendChild(dueDate);

    todoTitle.textContent = task.title;

    setPriority(task, priority);
    dueDate.textContent = task.dueDate;

    todo.appendChild(div1);
    todo.appendChild(div2);

    todoList.appendChild(todo);
}


function setPriority(task, priority) {
    let pr = priorities[task.priority];
    priority.classList.add(pr);
    priority.textContent = pr;
}

function changePriority(pr) {
    const targetTask = pr.target.parentElement.parentElement;
}

function getDate() {

}