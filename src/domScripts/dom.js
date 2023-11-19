import { initialize as initFolders } from "./folderDom";
import { createTask } from "./taskDom";

export function initialize() {
    initFolders();
}

export function addTask(task) {
    createTask(task);
}

function openFolder(folderId) {
    
}