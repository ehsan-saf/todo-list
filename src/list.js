

function createList(listName) {

    const list = document.createElement("div");
    list.classList.add("list");

    const icon = document.createElement("img");
    icon.src = "./icons/list.png";

    const name = document.createElement("p");
    name.textContent = listName;
}