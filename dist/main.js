/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domScripts/dom.js":
/*!*******************************!*\
  !*** ./src/domScripts/dom.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initialize: () => (/* binding */ initialize)
/* harmony export */ });
/* harmony import */ var _folderDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./folderDom */ "./src/domScripts/folderDom.js");
/* harmony import */ var _modifyTask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifyTask */ "./src/domScripts/modifyTask.js");
/* harmony import */ var _taskDom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./taskDom */ "./src/domScripts/taskDom.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! .. */ "./src/index.js");






const createNewTaskBtn = document.querySelector(".add-todo-btn");
const todoList = document.querySelector(".todo-list");

function initialize() {
    (0,_folderDom__WEBPACK_IMPORTED_MODULE_0__.initialize)();
    (0,_modifyTask__WEBPACK_IMPORTED_MODULE_1__.initialize)();
    createNewTaskBtn.addEventListener("click", _modifyTask__WEBPACK_IMPORTED_MODULE_1__.openToDoModal);
}


function openFolder(folderId) {
    
}

/***/ }),

/***/ "./src/domScripts/folderDom.js":
/*!*************************************!*\
  !*** ./src/domScripts/folderDom.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSelectedFolderID: () => (/* binding */ getSelectedFolderID),
/* harmony export */   initialize: () => (/* binding */ initialize)
/* harmony export */ });
/* harmony import */ var _folder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../folder */ "./src/folder.js");
/* harmony import */ var _taskDom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskDom */ "./src/domScripts/taskDom.js");





const foldersList = document.querySelector(".folder-list");
const newFolderPrompt = document.querySelector(".newFolderInput");
const newFolderName = document.querySelector("#folderNameInput");
const folders = document.querySelectorAll("folder");
const folderName = document.querySelector(".folder-name");


function initialize() {

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
    (0,_folder__WEBPACK_IMPORTED_MODULE_0__.addToFolderArray)(newFolderName.value);
    loadFolders();
    newFolderPrompt.classList.add("hide");
    resetFolderInput();
}


function resetFolderInput() {
    newFolderName.value = "";
}

function loadFolders() {
    foldersList.innerHTML = "";
    _folder__WEBPACK_IMPORTED_MODULE_0__.foldersArray.forEach(fl => {

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
    if(selectedFolder) {
        selectedFolder.classList.remove("selectedFolder");
    }
    e.target.classList.add("selectedFolder");
    (0,_taskDom__WEBPACK_IMPORTED_MODULE_1__.loadTasks)();
    setFolderName();
    // Load the Tasks present in the selected Folder
}

function getSelectedFolderID() {
    return Number(document.querySelector(".selectedFolder").id);
}

function setFolderName() {
    folderName.textContent = (0,_folder__WEBPACK_IMPORTED_MODULE_0__.getFolderInstance)(getSelectedFolderID()).name;
}

/***/ }),

/***/ "./src/domScripts/modifyTask.js":
/*!**************************************!*\
  !*** ./src/domScripts/modifyTask.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initialize: () => (/* binding */ initialize),
/* harmony export */   openToDoModal: () => (/* binding */ openToDoModal)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../task */ "./src/task.js");
/* harmony import */ var _folder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../folder */ "./src/folder.js");
/* harmony import */ var _taskDom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./taskDom */ "./src/domScripts/taskDom.js");




const saveButton = document.querySelector(".save-todo-btn");
const cancelButton = document.querySelector(".cancel-todo-btn");

const newTaskModal = document.querySelector(".new-task-modal");

const inputs = document.querySelectorAll('input:not([type="radio"])');
const textarea = document.querySelector('textarea[name="todo-note"]');

function initialize() {
    saveButton.addEventListener("click", saveTask);
    cancelButton.addEventListener("click", cancelTask);
}

function openToDoModal() {
    newTaskModal.showModal();
}

let title = "";
let deuDate = "";
let priority =  "";
let description = "";

function getInputs() {
    title = document.getElementById("todoTitle").value;
    deuDate = document.getElementById("todoDate").value;
    priority =  document.querySelector('input[name="priority"]:checked').value;
    description = document.querySelector('textarea[name="todo-note"]').value;
}

function saveTask() {
    getInputs();
    const newTask = new _task__WEBPACK_IMPORTED_MODULE_0__.Task(title, description, deuDate, priority);
    // Add the task to the selected folder instance
    (0,_folder__WEBPACK_IMPORTED_MODULE_1__.addToTaskArray)(newTask);
    (0,_taskDom__WEBPACK_IMPORTED_MODULE_2__.loadTasks)();
    newTaskModal.close();
    resetInputs();
}

function cancelTask() {
    newTaskModal.close();
    resetInputs();
}

function resetInputs() {
    inputs.forEach(input => {
        input.value = "";
        textarea.value = "";
        document.querySelector('input[id="fourth-pr"]').checked = true;
    });
}

/***/ }),

/***/ "./src/domScripts/taskDom.js":
/*!***********************************!*\
  !*** ./src/domScripts/taskDom.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadTasks: () => (/* binding */ loadTasks)
/* harmony export */ });
/* harmony import */ var _folderDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./folderDom */ "./src/domScripts/folderDom.js");
/* harmony import */ var _folder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../folder */ "./src/folder.js");



const todoList = document.querySelector(".todo-list");

const priorities = {
    "1": "important",
    "2": "medium",
    "3": "low",
    "4": "none",
};

function loadTasks() {
    todoList.innerHTML = "";
    const tasksArray = (0,_folder__WEBPACK_IMPORTED_MODULE_1__.getFolderInstance)((0,_folderDom__WEBPACK_IMPORTED_MODULE_0__.getSelectedFolderID)());
    tasksArray.tasks.forEach(task => {
        createTask(task);
    });
}

function createTask(task) {

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
    priority.addEventListener("click", changePriority);

    const dueDate = document.createElement("p");
    dueDate.classList.add("todo-date");

    div1.appendChild(checkbox);
    div1.appendChild(todoTitle);

    div2.appendChild(priority);
    div2.appendChild(dueDate);

    todoTitle.textContent = task.title;

    setPriority(task, priority);
    dueDate.textContent = task.dueDate;

    todo.appendChild(div1);
    todo.appendChild(div2);

    todoList.appendChild(todo);
}


function setPriority(task, priority) {
    let pr = priorities[task.priority];
    priority.classList.add(pr);
    priority.textContent = pr;
}

function changePriority(pr) {
    const targetTask = pr.target.parentElement.parentElement;
}

function getDate() {

}

/***/ }),

/***/ "./src/folder.js":
/*!***********************!*\
  !*** ./src/folder.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToFolderArray: () => (/* binding */ addToFolderArray),
/* harmony export */   addToTaskArray: () => (/* binding */ addToTaskArray),
/* harmony export */   foldersArray: () => (/* binding */ foldersArray),
/* harmony export */   getFolderInstance: () => (/* binding */ getFolderInstance),
/* harmony export */   newFolder: () => (/* binding */ newFolder)
/* harmony export */ });
/* harmony import */ var _domScripts_folderDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domScripts/folderDom */ "./src/domScripts/folderDom.js");


let foldersArray = [];


addToFolderArray("Default");

function newFolder(name, tasks = [], id = 0) {
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

function addToFolderArray(folderName) {
    const folder = newFolder(folderName);
    folder.id = foldersArray.length !== 0 ? foldersArray.length : 0;
    foldersArray.push(folder);
}

function getFolderInstance(folderId) {
    return foldersArray.filter(fl => fl.id === folderId)[0];
}

function addToTaskArray(task) {
    let folderId = (0,_domScripts_folderDom__WEBPACK_IMPORTED_MODULE_0__.getSelectedFolderID)();
    foldersArray.forEach(fl => {
        if(fl.id === folderId) {
            fl.addTask(task);
        }
    });
}




/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _domScripts_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domScripts/dom */ "./src/domScripts/dom.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _folder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./folder */ "./src/folder.js");
/* harmony import */ var _domScripts_taskDom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domScripts/taskDom */ "./src/domScripts/taskDom.js");





(0,_domScripts_dom__WEBPACK_IMPORTED_MODULE_0__.initialize)();

let task1 = new _task__WEBPACK_IMPORTED_MODULE_1__.Task("Ab exercise", "do 30 jumping jacks", 
"1402 / 8 / 27", "3", "workouts", 0);

(0,_folder__WEBPACK_IMPORTED_MODULE_2__.addToTaskArray)(task1);
(0,_domScripts_taskDom__WEBPACK_IMPORTED_MODULE_3__.loadTasks)();



/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
class Task {

    constructor(title, 
        description = "No description",
        dueDate = "", priority, id) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.isComplete = false;
        }

    toggleComplete() {
        this.isComplete = !this.isComplete;
    }  

}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbVNjcmlwdHMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb21TY3JpcHRzL2ZvbGRlckRvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tU2NyaXB0cy9tb2RpZnlUYXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb21TY3JpcHRzL3Rhc2tEb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2ZvbGRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluaXRpYWxpemUgYXMgaW5pdEZvbGRlcnMgfSBmcm9tIFwiLi9mb2xkZXJEb21cIjtcbmltcG9ydCB7IGluaXRpYWxpemUgYXMgaW5pdE5ld1Rhc2sgfSBmcm9tIFwiLi9tb2RpZnlUYXNrXCI7XG5pbXBvcnQgeyBjcmVhdGVUYXNrIH0gZnJvbSBcIi4vdGFza0RvbVwiO1xuaW1wb3J0IHsgb3BlblRvRG9Nb2RhbCB9IGZyb20gXCIuL21vZGlmeVRhc2tcIjtcbmltcG9ydCB7IHRhc2tzQXJyYXkgfSBmcm9tIFwiLi5cIjtcblxuY29uc3QgY3JlYXRlTmV3VGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRvZG8tYnRuXCIpO1xuY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgaW5pdEZvbGRlcnMoKTtcbiAgICBpbml0TmV3VGFzaygpO1xuICAgIGNyZWF0ZU5ld1Rhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Ub0RvTW9kYWwpO1xufVxuXG5cbmZ1bmN0aW9uIG9wZW5Gb2xkZXIoZm9sZGVySWQpIHtcbiAgICBcbn0iLCJpbXBvcnQgeyBmb2xkZXJzQXJyYXksIGdldEZvbGRlckluc3RhbmNlIH0gZnJvbSBcIi4uL2ZvbGRlclwiO1xuaW1wb3J0IHsgYWRkVG9Gb2xkZXJBcnJheSB9IGZyb20gXCIuLi9mb2xkZXJcIjtcbmltcG9ydCB7IGxvYWRUYXNrcyB9IGZyb20gXCIuL3Rhc2tEb21cIjtcblxuXG5jb25zdCBmb2xkZXJzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9sZGVyLWxpc3RcIik7XG5jb25zdCBuZXdGb2xkZXJQcm9tcHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ld0ZvbGRlcklucHV0XCIpO1xuY29uc3QgbmV3Rm9sZGVyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9sZGVyTmFtZUlucHV0XCIpO1xuY29uc3QgZm9sZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJmb2xkZXJcIik7XG5jb25zdCBmb2xkZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb2xkZXItbmFtZVwiKTtcblxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcblxuICAgIGNvbnN0IG9wZW5OZXdGb2xkZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZEZvbGRlckJ0blwiKTtcbiAgICBvcGVuTmV3Rm9sZGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgbmV3Rm9sZGVyUHJvbXB0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuICAgIFxuIH0pO1xuXG4gICAgY29uc3QgY3JlYXRlRm9sZGVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGVGb2xkZXJCdG5cIik7XG4gICAgY3JlYXRlRm9sZGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRGb2xkZXIpO1xuXG4gICAgY29uc3QgY2FuY2VsRm9sZGVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW5jZWxGb2xkZXJCdG5cIik7XG4gICAgY2FuY2VsRm9sZGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHJlc2V0Rm9sZGVySW5wdXQoKTtcbiAgICAgICAgbmV3Rm9sZGVyUHJvbXB0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgIH0pO1xuXG4gICAgZm9sZGVycy5mb3JFYWNoKGZsID0+IHsgZmwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGVjdEZvbGRlcikgfSk7XG59XG5cblxuZnVuY3Rpb24gYWRkRm9sZGVyKCkge1xuICAgIGFkZFRvRm9sZGVyQXJyYXkobmV3Rm9sZGVyTmFtZS52YWx1ZSk7XG4gICAgbG9hZEZvbGRlcnMoKTtcbiAgICBuZXdGb2xkZXJQcm9tcHQuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG4gICAgcmVzZXRGb2xkZXJJbnB1dCgpO1xufVxuXG5cbmZ1bmN0aW9uIHJlc2V0Rm9sZGVySW5wdXQoKSB7XG4gICAgbmV3Rm9sZGVyTmFtZS52YWx1ZSA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGxvYWRGb2xkZXJzKCkge1xuICAgIGZvbGRlcnNMaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgZm9sZGVyc0FycmF5LmZvckVhY2goZmwgPT4ge1xuXG4gICAgICAgIGNvbnN0IGZvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGZvbGRlci5jbGFzc0xpc3QuYWRkKFwiZm9sZGVyXCIpO1xuICAgICAgICBmb2xkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGVjdEZvbGRlcik7XG5cbiAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIGljb24uc3JjID0gXCIuL2ljb25zL2xpc3QucG5nXCI7XG5cbiAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBuYW1lLnRleHRDb250ZW50ID0gZmwubmFtZTtcblxuICAgICAgICBmb2xkZXIuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgICAgIGZvbGRlci5hcHBlbmRDaGlsZChuYW1lKTtcbiAgICAgICAgZm9sZGVyLmlkID0gZmwuaWQ7XG4gICAgICAgIGZvbGRlcnNMaXN0LmFwcGVuZENoaWxkKGZvbGRlcik7IFxuICAgIH0pO1xuICAgIFxufVxuXG5mdW5jdGlvbiBzZWxlY3RGb2xkZXIoZSkge1xuICAgIGNvbnNvbGUubG9nKFwiRm9sZGVyIGNsaWNrZWQhXCIpO1xuICAgIGNvbnN0IHNlbGVjdGVkRm9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RlZEZvbGRlclwiKTtcbiAgICBpZihzZWxlY3RlZEZvbGRlcikge1xuICAgICAgICBzZWxlY3RlZEZvbGRlci5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRGb2xkZXJcIik7XG4gICAgfVxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZEZvbGRlclwiKTtcbiAgICBsb2FkVGFza3MoKTtcbiAgICBzZXRGb2xkZXJOYW1lKCk7XG4gICAgLy8gTG9hZCB0aGUgVGFza3MgcHJlc2VudCBpbiB0aGUgc2VsZWN0ZWQgRm9sZGVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWxlY3RlZEZvbGRlcklEKCkge1xuICAgIHJldHVybiBOdW1iZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RlZEZvbGRlclwiKS5pZCk7XG59XG5cbmZ1bmN0aW9uIHNldEZvbGRlck5hbWUoKSB7XG4gICAgZm9sZGVyTmFtZS50ZXh0Q29udGVudCA9IGdldEZvbGRlckluc3RhbmNlKGdldFNlbGVjdGVkRm9sZGVySUQoKSkubmFtZTtcbn0iLCJpbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL3Rhc2tcIjtcbmltcG9ydCB7IGFkZFRvVGFza0FycmF5IH0gZnJvbSBcIi4uL2ZvbGRlclwiO1xuaW1wb3J0IHsgbG9hZFRhc2tzIH0gZnJvbSBcIi4vdGFza0RvbVwiO1xuXG5jb25zdCBzYXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zYXZlLXRvZG8tYnRuXCIpO1xuY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtdG9kby1idG5cIik7XG5cbmNvbnN0IG5ld1Rhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXRhc2stbW9kYWxcIik7XG5cbmNvbnN0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0Om5vdChbdHlwZT1cInJhZGlvXCJdKScpO1xuY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPVwidG9kby1ub3RlXCJdJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNhdmVUYXNrKTtcbiAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNhbmNlbFRhc2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlblRvRG9Nb2RhbCgpIHtcbiAgICBuZXdUYXNrTW9kYWwuc2hvd01vZGFsKCk7XG59XG5cbmxldCB0aXRsZSA9IFwiXCI7XG5sZXQgZGV1RGF0ZSA9IFwiXCI7XG5sZXQgcHJpb3JpdHkgPSAgXCJcIjtcbmxldCBkZXNjcmlwdGlvbiA9IFwiXCI7XG5cbmZ1bmN0aW9uIGdldElucHV0cygpIHtcbiAgICB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb1RpdGxlXCIpLnZhbHVlO1xuICAgIGRldURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9EYXRlXCIpLnZhbHVlO1xuICAgIHByaW9yaXR5ID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJwcmlvcml0eVwiXTpjaGVja2VkJykudmFsdWU7XG4gICAgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPVwidG9kby1ub3RlXCJdJykudmFsdWU7XG59XG5cbmZ1bmN0aW9uIHNhdmVUYXNrKCkge1xuICAgIGdldElucHV0cygpO1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRldURhdGUsIHByaW9yaXR5KTtcbiAgICAvLyBBZGQgdGhlIHRhc2sgdG8gdGhlIHNlbGVjdGVkIGZvbGRlciBpbnN0YW5jZVxuICAgIGFkZFRvVGFza0FycmF5KG5ld1Rhc2spO1xuICAgIGxvYWRUYXNrcygpO1xuICAgIG5ld1Rhc2tNb2RhbC5jbG9zZSgpO1xuICAgIHJlc2V0SW5wdXRzKCk7XG59XG5cbmZ1bmN0aW9uIGNhbmNlbFRhc2soKSB7XG4gICAgbmV3VGFza01vZGFsLmNsb3NlKCk7XG4gICAgcmVzZXRJbnB1dHMoKTtcbn1cblxuZnVuY3Rpb24gcmVzZXRJbnB1dHMoKSB7XG4gICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICBpbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gXCJcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbaWQ9XCJmb3VydGgtcHJcIl0nKS5jaGVja2VkID0gdHJ1ZTtcbiAgICB9KTtcbn0iLCJpbXBvcnQgeyBnZXRTZWxlY3RlZEZvbGRlcklEIH0gZnJvbSBcIi4vZm9sZGVyRG9tXCI7XG5pbXBvcnQgeyBnZXRGb2xkZXJJbnN0YW5jZSB9IGZyb20gXCIuLi9mb2xkZXJcIjtcblxuY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcblxuY29uc3QgcHJpb3JpdGllcyA9IHtcbiAgICBcIjFcIjogXCJpbXBvcnRhbnRcIixcbiAgICBcIjJcIjogXCJtZWRpdW1cIixcbiAgICBcIjNcIjogXCJsb3dcIixcbiAgICBcIjRcIjogXCJub25lXCIsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFRhc2tzKCkge1xuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgY29uc3QgdGFza3NBcnJheSA9IGdldEZvbGRlckluc3RhbmNlKGdldFNlbGVjdGVkRm9sZGVySUQoKSk7XG4gICAgdGFza3NBcnJheS50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBjcmVhdGVUYXNrKHRhc2spO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUYXNrKHRhc2spIHtcblxuICAgIGNvbnN0IHRvZG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRvZG8uY2xhc3NMaXN0LmFkZChcInRvZG9cIik7XG5cbiAgICBjb25zdCBkaXYxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBkaXYyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjaGVja2JveC5jbGFzc0xpc3QuYWRkKFwiY2hlY2tib3hcIik7XG4gICAgY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHRvZG9UaXRsZS5jbGFzc0xpc3QuYWRkKFwidG9kby10aXRsZVwiKTtcblxuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHlcIik7XG4gICAgcHJpb3JpdHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoYW5nZVByaW9yaXR5KTtcblxuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWRhdGVcIik7XG5cbiAgICBkaXYxLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICBkaXYxLmFwcGVuZENoaWxkKHRvZG9UaXRsZSk7XG5cbiAgICBkaXYyLmFwcGVuZENoaWxkKHByaW9yaXR5KTtcbiAgICBkaXYyLmFwcGVuZENoaWxkKGR1ZURhdGUpO1xuXG4gICAgdG9kb1RpdGxlLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcblxuICAgIHNldFByaW9yaXR5KHRhc2ssIHByaW9yaXR5KTtcbiAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5kdWVEYXRlO1xuXG4gICAgdG9kby5hcHBlbmRDaGlsZChkaXYxKTtcbiAgICB0b2RvLmFwcGVuZENoaWxkKGRpdjIpO1xuXG4gICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQodG9kbyk7XG59XG5cblxuZnVuY3Rpb24gc2V0UHJpb3JpdHkodGFzaywgcHJpb3JpdHkpIHtcbiAgICBsZXQgcHIgPSBwcmlvcml0aWVzW3Rhc2sucHJpb3JpdHldO1xuICAgIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQocHIpO1xuICAgIHByaW9yaXR5LnRleHRDb250ZW50ID0gcHI7XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVByaW9yaXR5KHByKSB7XG4gICAgY29uc3QgdGFyZ2V0VGFzayA9IHByLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGdldERhdGUoKSB7XG5cbn0iLCJpbXBvcnQgeyBnZXRTZWxlY3RlZEZvbGRlcklEIH0gZnJvbSBcIi4vZG9tU2NyaXB0cy9mb2xkZXJEb21cIjtcblxuZXhwb3J0IGxldCBmb2xkZXJzQXJyYXkgPSBbXTtcblxuXG5hZGRUb0ZvbGRlckFycmF5KFwiRGVmYXVsdFwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld0ZvbGRlcihuYW1lLCB0YXNrcyA9IFtdLCBpZCA9IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICB0YXNrczogdGFza3MsXG4gICAgICAgIGlkOiBpZCxcblxuICAgICAgICBhZGRUYXNrKHRhc2spIHtcbiAgICAgICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICAgICAgICAgIHRoaXMudGFza3MgPSB0aGlzLnRhc2tzLmZpbHRlcih0cyA9PiB0cy5pZCAhPT0gdGFzay5pZCk7XG4gICAgICAgIH1cbiAgICB9O1xufSBcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRvRm9sZGVyQXJyYXkoZm9sZGVyTmFtZSkge1xuICAgIGNvbnN0IGZvbGRlciA9IG5ld0ZvbGRlcihmb2xkZXJOYW1lKTtcbiAgICBmb2xkZXIuaWQgPSBmb2xkZXJzQXJyYXkubGVuZ3RoICE9PSAwID8gZm9sZGVyc0FycmF5Lmxlbmd0aCA6IDA7XG4gICAgZm9sZGVyc0FycmF5LnB1c2goZm9sZGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvbGRlckluc3RhbmNlKGZvbGRlcklkKSB7XG4gICAgcmV0dXJuIGZvbGRlcnNBcnJheS5maWx0ZXIoZmwgPT4gZmwuaWQgPT09IGZvbGRlcklkKVswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRvVGFza0FycmF5KHRhc2spIHtcbiAgICBsZXQgZm9sZGVySWQgPSBnZXRTZWxlY3RlZEZvbGRlcklEKCk7XG4gICAgZm9sZGVyc0FycmF5LmZvckVhY2goZmwgPT4ge1xuICAgICAgICBpZihmbC5pZCA9PT0gZm9sZGVySWQpIHtcbiAgICAgICAgICAgIGZsLmFkZFRhc2sodGFzayk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuXG4iLCJpbXBvcnQge2luaXRpYWxpemUgLCBhZGRUYXNrc1RvUGFnZX0gZnJvbSBcIi4vZG9tU2NyaXB0cy9kb21cIjtcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrXCI7XG5pbXBvcnQgeyBhZGRUb1Rhc2tBcnJheSB9IGZyb20gXCIuL2ZvbGRlclwiO1xuaW1wb3J0IHsgbG9hZFRhc2tzIH0gZnJvbSBcIi4vZG9tU2NyaXB0cy90YXNrRG9tXCI7XG5cbmluaXRpYWxpemUoKTtcblxubGV0IHRhc2sxID0gbmV3IFRhc2soXCJBYiBleGVyY2lzZVwiLCBcImRvIDMwIGp1bXBpbmcgamFja3NcIiwgXG5cIjE0MDIgLyA4IC8gMjdcIiwgXCIzXCIsIFwid29ya291dHNcIiwgMCk7XG5cbmFkZFRvVGFza0FycmF5KHRhc2sxKTtcbmxvYWRUYXNrcygpO1xuXG4iLCJleHBvcnQgY2xhc3MgVGFzayB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgXG4gICAgICAgIGRlc2NyaXB0aW9uID0gXCJObyBkZXNjcmlwdGlvblwiLFxuICAgICAgICBkdWVEYXRlID0gXCJcIiwgcHJpb3JpdHksIGlkKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICAgICAgdGhpcy5pc0NvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIHRvZ2dsZUNvbXBsZXRlKCkge1xuICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSAhdGhpcy5pc0NvbXBsZXRlO1xuICAgIH0gIFxuXG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=