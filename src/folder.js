const foldersList = document.querySelector(".folders");

export default function createFolder(folderName) {

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