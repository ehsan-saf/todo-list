import { getEventTask, loadTasks } from "./domScripts/taskDom";

export class Task {

    constructor(title, 
        description = "No description",
        dueDate = "", priority, id, folderId) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.isComplete = false;
            this.id = id;
            this.folderId = folderId;
            this.toggleComplete = toggleComplete;
        }
}

export function toggleComplete() {
    this.isComplete = !this.isComplete;
} 

export function changePriority(event) {
    const task = getEventTask(event);
    task.priority++;
    if(task.priority === 5) {
        task.priority = 1;
    }
    loadTasks();
}

