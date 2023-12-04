import { Task } from "../task";
import { addTasksToPage } from "./dom";
import { tasksArray } from "..";

const saveButton = document.querySelector(".save-todo-btn");
const cancelButton = document.querySelector(".cancel-todo-btn");

const newTaskModal = document.querySelector(".new-task-modal");

const inputs = document.querySelectorAll("input");
const textarea = document.querySelector('textarea[name="todo-note"]');

export function initialize() {
    saveButton.addEventListener("click", saveTask);
    cancelButton.addEventListener("click", cancelTask);
}

export function openToDoModal() {
    newTaskModal.showModal();
}

let title = "";
let deuDate = "";
let priority =  "";
let description = "";

function getInputs() {
    title = document.getElementById("todoTitle").value;
    deuDate = document.getElementById("todoDate").value;
    priority =  document.querySelector('input[name="priority"]:checked').value;
    description = document.querySelector('textarea[name="todo-note"]').value;
}

function saveTask() {
    getInputs();
    const newTask = new Task(title, description, deuDate, priority);
    tasksArray.push(newTask);
    addTasksToPage();
    newTaskModal.close();
    resetInputs();
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