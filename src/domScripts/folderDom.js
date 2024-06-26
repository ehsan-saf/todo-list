import { foldersArray, getFolderInstance , addToFolderArray, removeFolder, updateFolderArray } from "../folder";
import { loadAllTasks, loadTasks } from "./taskDom";


const foldersList = document.querySelector(".folder-list");
const newFolderPrompt = document.querySelector(".newFolderInput");
const newFolderName = document.querySelector("#folderNameInput");
const folders = document.querySelectorAll(".folder");
const folderName = document.querySelector(".folder-name");


export function initialize() {

    const openNewFolderBtn = document.getElementById("addFolderBtn");
    openNewFolderBtn.addEventListener("click", () => {
    newFolderPrompt.classList.remove("hide");
    
 });

    const createFolderBtn = document.getElementById("createFolderBtn");
    createFolderBtn.addEventListener("click", addFolder);

    const cancelFolderBtn = document.getElementById("cancelFolderBtn");
    cancelFolderBtn.addEventListener("click", () => {
        resetFolderInput();
        newFolderPrompt.classList.add("hide");
    });

    folders.forEach(fl => { fl.addEventListener("click", selectFolder); });
    if(!foldersArray.some(fl => fl.name === "Default")) {
        addToFolderArray("Default");
    };
    loadFolders();
    selectDefaultFolder();
}


function selectDefaultFolder() {
    document.querySelector(".folder-list .folder").classList.add("selectedFolder");
}


function addFolder() {
    addToFolderArray(newFolderName.value);
    loadFolders();
    newFolderPrompt.classList.add("hide");
    resetFolderInput();
    selectAddedFolder();
}


function resetFolderInput() {
    newFolderName.value = "";
}

export function loadFolders() {
    foldersList.innerHTML = "";
    foldersArray.forEach(fl => {

        const folder = document.createElement("div");
        folder.classList.add("folder");
        folder.addEventListener("click", selectFolder);

        const div = document.createElement("div");

        const icon = document.createElement("img");
        icon.src = "./icons/list.png";

        const name = document.createElement("p");
        name.textContent = fl.name;

        const removeButton = document.createElement("button");
        removeButton.classList.add(".removeFolder");
        removeButton.addEventListener("click", removeFolder);

        const removeIcon = document.createElement("img");
        removeIcon.src = "./icons/remove.png";

        removeButton.appendChild(removeIcon);

        div.appendChild(icon);
        div.appendChild(name);

        folder.appendChild(div);

        if(fl.id !== 0) {
        folder.appendChild(removeButton);
        }

        folder.id = fl.id;

        foldersList.appendChild(folder); 
    });
    
}

function selectFolder(e) {
    const selectedFolder = document.querySelector(".selectedFolder");
    if(selectedFolder) {
        selectedFolder.classList.remove("selectedFolder");
    }
    e.target.classList.add("selectedFolder");
    const folderId = getSelectedFolderID();
    loadTasks();
    if(folderId === "all") { 
        folderName.textContent = "All Tasks";
    }
    else if(folderId === "today") {
        folderName.textContent = "Today Tasks";
    }
    else {
        setFolderName();
    }
    
    
}

export function getSelectedFolderID() {
    return document.querySelector(".selectedFolder").id;
}

function setFolderName() {
    folderName.textContent = getFolderInstance(getSelectedFolderID()).name;
}

function selectAddedFolder() {
    document.querySelector(".folder-list  .folder:last-child").classList.add("selectedFolder");
    setFolderName();
    loadTasks();
}

