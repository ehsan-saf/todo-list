import { Task } from "../task";
import { addToTaskArray } from "../folder";
import { getEventTask, loadTasks } from "./taskDom";

const saveButton = document.querySelector(".save-todo-btn");
const cancelButton = document.querySelector(".cancel-todo-btn");

const newTaskModal = document.querySelector(".new-task-modal");

const inputs = document.querySelectorAll('input:not([type="radio"])');
const textarea = document.querySelector('textarea[name="todo-note"]');

export function initialize() {
    saveButton.addEventListener("click", saveTask);
    cancelButton.addEventListener("click", cancelTask);
}

export function openToDoModal() {
    newTaskModal.showModal();
}

const titleInput = document.getElementById("todoTitle");
const dateInput = document.getElementById("todoDate");
const priorityInput = document.querySelector('input[name="priority"]:checked');
const descriptionInput = document.querySelector('textarea[name="todo-note"]');

let title = "";
let deuDate = "";
let priority =  "";
let description = "";


function getInputs() {
    title = titleInput.value;
    deuDate = dateInput.value;
    priority =  Number(priorityInput.value);
    description = descriptionInput.value;
}

function saveTask() {
    getInputs();
    const newTask = new Task(title, description, deuDate, priority);
    // Add the task to the selected folder instance
    addToTaskArray(newTask);
    loadTasks();
    newTaskModal.close();
    resetInputs();
}

export function showInfo(event) {
    const task = getEventTask(event);
    newTaskModal.showModal();
    titleInput.value = task.title;
    dateInput.value  = task.dueDate;
    selectPriority(task.priority);
    descriptionInput.value = task.description;
}

function selectPriority(pr) {
    const id = "";
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
    console.log(document.getElementById(id));
    // document.getElementById(id).checked = true;
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