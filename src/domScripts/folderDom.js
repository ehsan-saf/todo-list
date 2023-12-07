import { foldersArray } from "../folder";
import { addToFolderArray } from "../folder";


const foldersList = document.querySelector(".folder-list");
const newFolderPrompt = document.querySelector(".newFolderInput");
const newFolderName = document.querySelector("#folderNameInput");
const folders = document.querySelectorAll("folder");


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

    folders.forEach(fl => { fl.addEventListener("click", selectFolder) });
}


function addFolder() {
    addToFolderArray(newFolderName.value);
    loadFolders();
    newFolderPrompt.classList.add("hide");
    resetFolderInput();
}


function resetFolderInput() {
    newFolderName.value = "";
}

function loadFolders() {
    foldersList.innerHTML = "";
    foldersArray.forEach(fl => {

        const folder = document.createElement("div");
        folder.classList.add("folder");
        folder.addEventListener("click", selectFolder);

        const icon = document.createElement("img");
        icon.src = "./icons/list.png";

        const name = document.createElement("p");
        name.textContent = fl.name;

        folder.appendChild(icon);
        folder.appendChild(name);
        folder.id = fl.id;
        foldersList.appendChild(folder); 
    });
    
}

function selectFolder(e) {
    console.log("Folder clicked!");
    const selectedFolder = document.querySelector(".selectedFolder");
    selectedFolder.classList.remove("selectedFolder");
    e.target.classList.add("selectedFolder");

    // Load the Tasks present in the selected Folder
}

export function getSelectedFolderID() {
    return Number(document.querySelector(".selectedFolder").id);
}