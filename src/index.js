import createFolder from "./folder";

const CreateFolderBtn = document.getElementById("createFolderBtn");
CreateFolderBtn.addEventListener("click", addFolder);

function addFolder() {
    console.log("Add button");
    const folderName = document.querySelector("#folderNameInput").value;
    createFolder(folderName);
}
