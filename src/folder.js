import { getSelectedFolderID } from "./domScripts/folderDom";

export let foldersArray = [];


addToFolderArray("Default");

export function newFolder(name, tasks = [], id = 0) {
    return {
        name: name,
        tasks: tasks,
        id: id,

        addTask(task) {
            this.tasks.push(task);
        },

        removeTask(task) {
            this.tasks = this.tasks.filter(ts => ts.id !== task.id);
        }
    };
} 

export function addToFolderArray(folderName) {
    const folder = newFolder(folderName);
    folder.id = foldersArray.length !== 0 ? foldersArray.length : 0;
    foldersArray.push(folder);
}

export function getFolderInstance(folderId) {
    return foldersArray.filter(fl => fl.id === folderId)[0];
}

export function addToTaskArray(task) {
    let folderId = getSelectedFolderID();
    foldersArray.forEach(fl => {
        if(fl.id === folderId) {
            fl.addTask(task);
        }
    });
}


