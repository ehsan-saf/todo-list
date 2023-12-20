import { Task } from "../task";
import { addToTaskArray } from "../folder";
import { getEventTask, loadTasks } from "./taskDom";
import { format } from "date-fns";

const saveButton = document.querySelector(".save-todo-btn");
const cancelButton = document.querySelector(".cancel-todo-btn");

const newTaskModal = document.querySelector(".new-task-modal");

const inputs = document.querySelectorAll('input:not([type="radio"])');
const textarea = document.querySelector('textarea[name="todo-note"]');

let saveMode = 1;
let targetTask;

export function initialize() {
    saveButton.addEventListener("click", saveTask);
    cancelButton.addEventListener("click", cancelTask);
}

export function openToDoModal() {
    saveMode = 1;
    newTaskModal.showModal();
}

const titleInput = document.getElementById("todoTitle");
const dateInput = document.getElementById("todoDate");
const descriptionInput = document.querySelector('textarea[name="todo-note"]');

let title = "";
let dueDate = "";
let priority = 4;
let description = "";


function getInputs() {
    title = titleInput.value;
    dueDate = formatDate(dateInput.value);
    priority =  Number(document.querySelector('input[name="priority"]:checked').value);
    description = descriptionInput.value;
}

function saveTask() {
    getInputs();
    if(saveMode === 2) {
        updateTask();
    }
    else {
    const newTask = new Task(title, description, dueDate, priority);
    // Add the task to the selected folder instance
    addToTaskArray(newTask);
    }
    loadTasks();
    newTaskModal.close();
    resetInputs();
}

export function showInfo(event) {
    saveMode = 2;
    targetTask = getEventTask(event);
    newTaskModal.showModal();
    titleInput.value = targetTask.title;
    dateInput.value  = targetTask.dueDate;
    selectPriority(targetTask.priority);
    descriptionInput.value = targetTask.description;
}

function updateTask() {
    targetTask.title = title;
    targetTask.description = description;
    targetTask.dueDate = dueDate;
    targetTask.priority = priority;
}

function selectPriority(pr) {
    console.log(pr);
    let id = "";
    switch (pr) {
        case 1:
            id = "first-pr";
            break;
    
        case 2:
            id = "second-pr";
            break;
        
        case 3:
            id = "third-pr";
            break;
        
        case 4:
            id = "fourth-pr";
            break;
    }
    
    document.getElementById(id).checked = true;
}


function cancelTask() {
    newTaskModal.close();
    resetInputs();
}

function resetInputs() {
    inputs.forEach(input => {
        input.value = "";
        textarea.value = "";
        document.querySelector('input[id="fourth-pr"]').checked = true;
    });
}

function formatDate(date) {
    if(date.trim().length === 0) {
        return format(new Date(), 'yyyy-MM-dd');
    }
    return date;
}