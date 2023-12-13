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
    let folderId = Number(getSelectedFolderID());
    foldersArray.forEach(fl => {
        if(fl.id == folderId) {
            task.id = fl.tasks.length;
            task.folderId = folderId;
            fl.addTask(task);
        }
    });
}

export function removeFromTasks(e) {
    console.log(e.target);
    const task = e.target.parentElement.parentElement.parentElement;
    const taskId = Number(task.id);
    const folderId = Number(task.dataset.folderId);
    foldersArray.forEach(fl => {
        if(fl.id == folderId) {
            fl.removeTask(taskId);
        }
    });
    const folder = getSelectedFolderID();
    if(folder === "all") { 
        loadAllTasks();
    }
    else {
        loadTasks();
    }
}


