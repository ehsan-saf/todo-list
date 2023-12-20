import { getSelectedFolderID } from "./domScripts/folderDom";
import { loadTasks, loadAllTasks } from "./domScripts/taskDom";

export let foldersArray = [];


export function newFolder(name, tasks = [], id = 0) {
    return {
        name: name,
        tasks: tasks,
        id: id,

        addTask(task) {
            this.tasks.push(task);
        },

        removeTask(taskId) {
            this.tasks = this.tasks.filter(ts => ts.id !== taskId);
            this.tasks.forEach((ts, index) =>  {
                ts.id = index;
            });
        }
    };
} 

export function addToFolderArray(folderName) {
    const folder = newFolder(folderName);
    folder.id = foldersArray.length !== 0 ? foldersArray.length : 0;
    foldersArray.push(folder);
}

export function getFolderInstance(folderId) {
    return foldersArray.filter(fl => fl.id == folderId)[0];
}

export function addToTaskArray(task) {
    let folderId = getSelectedFolderID();
    if(folderId === "all" || folderId === "today"){
        folderId = 0;
    }
    else {
        folderId = Number(folderId);
    }
    foldersArray.forEach(fl => {
        if(fl.id == folderId) {
            task.id = fl.tasks.length;
            task.folderId = folderId;
            fl.addTask(task);
        }
    });
}

export function removeFromTasks(e) {
    const todo = e.target.closest(".todo");
    const taskId = Number(todo.id);
    const folderId = Number(todo.dataset.folderId);
    foldersArray.forEach(fl => {
        if(fl.id == folderId) {
            fl.removeTask(taskId);
        }
    });
    loadTasks();
}

export function getTask(taskId, folderId) {
    const folder = getFolderInstance(folderId);
    return folder.tasks.find(ts => ts.id == taskId);
}


