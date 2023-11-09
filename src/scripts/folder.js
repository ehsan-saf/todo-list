const foldersList = document.querySelector(".folders");
const newFolderPrompt = document.querySelector(".newFolderInput");
const newFolderName = document.querySelector("#folderNameInput");

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
}


function addFolder() {
    createFolder(newFolderName.value);
    newFolderPrompt.classList.add("hide");
    resetFolderInput();
}

function resetFolderInput() {
    newFolderName.value = "";
}

function createFolder(folderName) {

    const folder = document.createElement("div");
    folder.classList.add("folder");

    const icon = document.createElement("img");
    icon.src = "./icons/list.png";

    const name = document.createElement("p");
    name.textContent = folderName;

    folder.appendChild(icon);
    folder.appendChild(name);
    foldersList.appendChild(folder);
}