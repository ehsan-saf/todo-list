const todoList = document.querySelector(".todo-list");

export function createTask(task) {

    const todo = document.createElement("div");
    todo.classList.add("todo");

    const div1 = document.createElement("div");
    const div2 = document.createElement("div");

    const checkbox = document.createElement("div");
    checkbox.classList.add("checkbox");
    const todoTitle = document.createElement("h2");
    todoTitle.classList.add("todo-title");

    const priority = document.createElement("div");
    priority.classList.add("priority");

    const dueDate = document.createElement("p");
    dueDate.classList.add("todo-date");

    div1.appendChild(checkbox);
    div1.appendChild(todoTitle);

    div2.appendChild(priority);
    div2.appendChild(dueDate);

    todoTitle.textContent = task.title;
    priority.classList.add(task.priority);
    priority.textContent = task.priority;
    dueDate.textContent = task.dueDate;

    todo.appendChild(div1);
    todo.appendChild(div2);

    todoList.appendChild(todo);
}


function setPriority() {
    
}

function getDate() {

}