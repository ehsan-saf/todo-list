import { initialize as initFolders } from "./folderDom";
import { initialize as initNewTask } from "./modifyTask";
import { createTask } from "./taskDom";
import { openToDoModal } from "./modifyTask";
import { tasksArray } from "..";

const createNewTaskBtn = document.querySelector(".add-todo-btn");
const todoList = document.querySelector(".todo-list");

export function initialize() {
    initFolders();
    initNewTask();
    createNewTaskBtn.addEventListener("click", openToDoModal);
}

export function addTasksToPage() {
    todoList.innerHTML = "";
    tasksArray.forEach(task =>  { createTask(task) });
}


function openFolder(folderId) {
    
}