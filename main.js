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




const foldersList = document.querySelector(".folder-list");
const newFolderPrompt = document.querySelector(".newFolderInput");
const newFolderName = document.querySelector("#folderNameInput");
const folders = document.querySelectorAll("folder");


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
    selectedFolder.classList.remove("selectedFolder");
    e.target.classList.add("selectedFolder");

    // Load the Tasks present in the selected Folder
}

function getSelectedFolderID() {
    return Number(document.querySelector(".selectedFolder").id);
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



const saveButton = document.querySelector(".save-todo-btn");
const cancelButton = document.querySelector(".cancel-todo-btn");

const newTaskModal = document.querySelector(".new-task-modal");

const inputs = document.querySelectorAll("input");
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
    (0,_folder__WEBPACK_IMPORTED_MODULE_1__.addToTaskArray)(newTask);
    // Add the task to the selected folder instance
    addTasksToPage();
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
    const tasksArray = (0,_folder__WEBPACK_IMPORTED_MODULE_1__.getFolderInstance)((0,_folderDom__WEBPACK_IMPORTED_MODULE_0__.getSelectedFolderID)());
    console.log();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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REFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb21TY3JpcHRzL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tU2NyaXB0cy9mb2xkZXJEb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbVNjcmlwdHMvbW9kaWZ5VGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tU2NyaXB0cy90YXNrRG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9mb2xkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0aWFsaXplIGFzIGluaXRGb2xkZXJzIH0gZnJvbSBcIi4vZm9sZGVyRG9tXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplIGFzIGluaXROZXdUYXNrIH0gZnJvbSBcIi4vbW9kaWZ5VGFza1wiO1xuaW1wb3J0IHsgY3JlYXRlVGFzayB9IGZyb20gXCIuL3Rhc2tEb21cIjtcbmltcG9ydCB7IG9wZW5Ub0RvTW9kYWwgfSBmcm9tIFwiLi9tb2RpZnlUYXNrXCI7XG5pbXBvcnQgeyB0YXNrc0FycmF5IH0gZnJvbSBcIi4uXCI7XG5cbmNvbnN0IGNyZWF0ZU5ld1Rhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10b2RvLWJ0blwiKTtcbmNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIGluaXRGb2xkZXJzKCk7XG4gICAgaW5pdE5ld1Rhc2soKTtcbiAgICBjcmVhdGVOZXdUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuVG9Eb01vZGFsKTtcbn1cblxuXG5mdW5jdGlvbiBvcGVuRm9sZGVyKGZvbGRlcklkKSB7XG4gICAgXG59IiwiaW1wb3J0IHsgZm9sZGVyc0FycmF5IH0gZnJvbSBcIi4uL2ZvbGRlclwiO1xuaW1wb3J0IHsgYWRkVG9Gb2xkZXJBcnJheSB9IGZyb20gXCIuLi9mb2xkZXJcIjtcblxuXG5jb25zdCBmb2xkZXJzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9sZGVyLWxpc3RcIik7XG5jb25zdCBuZXdGb2xkZXJQcm9tcHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ld0ZvbGRlcklucHV0XCIpO1xuY29uc3QgbmV3Rm9sZGVyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9sZGVyTmFtZUlucHV0XCIpO1xuY29uc3QgZm9sZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJmb2xkZXJcIik7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG5cbiAgICBjb25zdCBvcGVuTmV3Rm9sZGVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRGb2xkZXJCdG5cIik7XG4gICAgb3Blbk5ld0ZvbGRlckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIG5ld0ZvbGRlclByb21wdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcbiAgICBcbiB9KTtcblxuICAgIGNvbnN0IGNyZWF0ZUZvbGRlckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlYXRlRm9sZGVyQnRuXCIpO1xuICAgIGNyZWF0ZUZvbGRlckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkRm9sZGVyKTtcblxuICAgIGNvbnN0IGNhbmNlbEZvbGRlckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FuY2VsRm9sZGVyQnRuXCIpO1xuICAgIGNhbmNlbEZvbGRlckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICByZXNldEZvbGRlcklucHV0KCk7XG4gICAgICAgIG5ld0ZvbGRlclByb21wdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgICB9KTtcblxuICAgIGZvbGRlcnMuZm9yRWFjaChmbCA9PiB7IGZsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzZWxlY3RGb2xkZXIpIH0pO1xufVxuXG5cbmZ1bmN0aW9uIGFkZEZvbGRlcigpIHtcbiAgICBhZGRUb0ZvbGRlckFycmF5KG5ld0ZvbGRlck5hbWUudmFsdWUpO1xuICAgIGxvYWRGb2xkZXJzKCk7XG4gICAgbmV3Rm9sZGVyUHJvbXB0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgIHJlc2V0Rm9sZGVySW5wdXQoKTtcbn1cblxuXG5mdW5jdGlvbiByZXNldEZvbGRlcklucHV0KCkge1xuICAgIG5ld0ZvbGRlck5hbWUudmFsdWUgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiBsb2FkRm9sZGVycygpIHtcbiAgICBmb2xkZXJzTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGZvbGRlcnNBcnJheS5mb3JFYWNoKGZsID0+IHtcblxuICAgICAgICBjb25zdCBmb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBmb2xkZXIuY2xhc3NMaXN0LmFkZChcImZvbGRlclwiKTtcbiAgICAgICAgZm9sZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzZWxlY3RGb2xkZXIpO1xuXG4gICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICBpY29uLnNyYyA9IFwiLi9pY29ucy9saXN0LnBuZ1wiO1xuXG4gICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgbmFtZS50ZXh0Q29udGVudCA9IGZsLm5hbWU7XG5cbiAgICAgICAgZm9sZGVyLmFwcGVuZENoaWxkKGljb24pO1xuICAgICAgICBmb2xkZXIuYXBwZW5kQ2hpbGQobmFtZSk7XG4gICAgICAgIGZvbGRlci5pZCA9IGZsLmlkO1xuICAgICAgICBmb2xkZXJzTGlzdC5hcHBlbmRDaGlsZChmb2xkZXIpOyBcbiAgICB9KTtcbiAgICBcbn1cblxuZnVuY3Rpb24gc2VsZWN0Rm9sZGVyKGUpIHtcbiAgICBjb25zb2xlLmxvZyhcIkZvbGRlciBjbGlja2VkIVwiKTtcbiAgICBjb25zdCBzZWxlY3RlZEZvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRGb2xkZXJcIik7XG4gICAgc2VsZWN0ZWRGb2xkZXIuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkRm9sZGVyXCIpO1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZEZvbGRlclwiKTtcblxuICAgIC8vIExvYWQgdGhlIFRhc2tzIHByZXNlbnQgaW4gdGhlIHNlbGVjdGVkIEZvbGRlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRGb2xkZXJJRCgpIHtcbiAgICByZXR1cm4gTnVtYmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRGb2xkZXJcIikuaWQpO1xufSIsImltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vdGFza1wiO1xuaW1wb3J0IHsgYWRkVG9UYXNrQXJyYXkgfSBmcm9tIFwiLi4vZm9sZGVyXCI7XG5cbmNvbnN0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNhdmUtdG9kby1idG5cIik7XG5jb25zdCBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC10b2RvLWJ0blwiKTtcblxuY29uc3QgbmV3VGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctdGFzay1tb2RhbFwiKTtcblxuY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpO1xuY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPVwidG9kby1ub3RlXCJdJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNhdmVUYXNrKTtcbiAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNhbmNlbFRhc2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlblRvRG9Nb2RhbCgpIHtcbiAgICBuZXdUYXNrTW9kYWwuc2hvd01vZGFsKCk7XG59XG5cbmxldCB0aXRsZSA9IFwiXCI7XG5sZXQgZGV1RGF0ZSA9IFwiXCI7XG5sZXQgcHJpb3JpdHkgPSAgXCJcIjtcbmxldCBkZXNjcmlwdGlvbiA9IFwiXCI7XG5cbmZ1bmN0aW9uIGdldElucHV0cygpIHtcbiAgICB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb1RpdGxlXCIpLnZhbHVlO1xuICAgIGRldURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9EYXRlXCIpLnZhbHVlO1xuICAgIHByaW9yaXR5ID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJwcmlvcml0eVwiXTpjaGVja2VkJykudmFsdWU7XG4gICAgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPVwidG9kby1ub3RlXCJdJykudmFsdWU7XG59XG5cbmZ1bmN0aW9uIHNhdmVUYXNrKCkge1xuICAgIGdldElucHV0cygpO1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRldURhdGUsIHByaW9yaXR5KTtcbiAgICBhZGRUb1Rhc2tBcnJheShuZXdUYXNrKTtcbiAgICAvLyBBZGQgdGhlIHRhc2sgdG8gdGhlIHNlbGVjdGVkIGZvbGRlciBpbnN0YW5jZVxuICAgIGFkZFRhc2tzVG9QYWdlKCk7XG4gICAgbmV3VGFza01vZGFsLmNsb3NlKCk7XG4gICAgcmVzZXRJbnB1dHMoKTtcbn1cblxuZnVuY3Rpb24gY2FuY2VsVGFzaygpIHtcbiAgICBuZXdUYXNrTW9kYWwuY2xvc2UoKTtcbiAgICByZXNldElucHV0cygpO1xufVxuXG5mdW5jdGlvbiByZXNldElucHV0cygpIHtcbiAgICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICAgIGlucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBcIlwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtpZD1cImZvdXJ0aC1wclwiXScpLmNoZWNrZWQgPSB0cnVlO1xuICAgIH0pO1xufSIsImltcG9ydCB7IGdldFNlbGVjdGVkRm9sZGVySUQgfSBmcm9tIFwiLi9mb2xkZXJEb21cIjtcbmltcG9ydCB7IGdldEZvbGRlckluc3RhbmNlIH0gZnJvbSBcIi4uL2ZvbGRlclwiO1xuXG5jb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpO1xuXG5jb25zdCBwcmlvcml0aWVzID0ge1xuICAgIFwiMVwiOiBcImltcG9ydGFudFwiLFxuICAgIFwiMlwiOiBcIm1lZGl1bVwiLFxuICAgIFwiM1wiOiBcImxvd1wiLFxuICAgIFwiNFwiOiBcIm5vbmVcIixcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkVGFza3MoKSB7XG4gICAgY29uc3QgdGFza3NBcnJheSA9IGdldEZvbGRlckluc3RhbmNlKGdldFNlbGVjdGVkRm9sZGVySUQoKSk7XG4gICAgY29uc29sZS5sb2coKTtcbiAgICB0YXNrc0FycmF5LnRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgIGNyZWF0ZVRhc2sodGFzayk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhc2sodGFzaykge1xuXG4gICAgY29uc3QgdG9kbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdG9kby5jbGFzc0xpc3QuYWRkKFwidG9kb1wiKTtcblxuICAgIGNvbnN0IGRpdjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGRpdjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJjaGVja2JveFwiKTtcbiAgICBjb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgdG9kb1RpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLXRpdGxlXCIpO1xuXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eVwiKTtcbiAgICBwcmlvcml0eS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2hhbmdlUHJpb3JpdHkpO1xuXG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGR1ZURhdGUuY2xhc3NMaXN0LmFkZChcInRvZG8tZGF0ZVwiKTtcblxuICAgIGRpdjEuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgIGRpdjEuYXBwZW5kQ2hpbGQodG9kb1RpdGxlKTtcblxuICAgIGRpdjIuYXBwZW5kQ2hpbGQocHJpb3JpdHkpO1xuICAgIGRpdjIuYXBwZW5kQ2hpbGQoZHVlRGF0ZSk7XG5cbiAgICB0b2RvVGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xuXG4gICAgc2V0UHJpb3JpdHkodGFzaywgcHJpb3JpdHkpO1xuICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmR1ZURhdGU7XG5cbiAgICB0b2RvLmFwcGVuZENoaWxkKGRpdjEpO1xuICAgIHRvZG8uYXBwZW5kQ2hpbGQoZGl2Mik7XG5cbiAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZCh0b2RvKTtcbn1cblxuXG5mdW5jdGlvbiBzZXRQcmlvcml0eSh0YXNrLCBwcmlvcml0eSkge1xuICAgIGxldCBwciA9IHByaW9yaXRpZXNbdGFzay5wcmlvcml0eV07XG4gICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZChwcik7XG4gICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSBwcjtcbn1cblxuZnVuY3Rpb24gY2hhbmdlUHJpb3JpdHkocHIpIHtcbiAgICBjb25zdCB0YXJnZXRUYXNrID0gcHIudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZSgpIHtcblxufSIsImltcG9ydCB7IGdldFNlbGVjdGVkRm9sZGVySUQgfSBmcm9tIFwiLi9kb21TY3JpcHRzL2ZvbGRlckRvbVwiO1xuXG5leHBvcnQgbGV0IGZvbGRlcnNBcnJheSA9IFtdO1xuXG5cbmFkZFRvRm9sZGVyQXJyYXkoXCJEZWZhdWx0XCIpO1xuXG5leHBvcnQgZnVuY3Rpb24gbmV3Rm9sZGVyKG5hbWUsIHRhc2tzID0gW10sIGlkID0gMCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIHRhc2tzOiB0YXNrcyxcbiAgICAgICAgaWQ6IGlkLFxuXG4gICAgICAgIGFkZFRhc2sodGFzaykge1xuICAgICAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZVRhc2sodGFzaykge1xuICAgICAgICAgICAgdGhpcy50YXNrcyA9IHRoaXMudGFza3MuZmlsdGVyKHRzID0+IHRzLmlkICE9PSB0YXNrLmlkKTtcbiAgICAgICAgfVxuICAgIH07XG59IFxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9Gb2xkZXJBcnJheShmb2xkZXJOYW1lKSB7XG4gICAgY29uc3QgZm9sZGVyID0gbmV3Rm9sZGVyKGZvbGRlck5hbWUpO1xuICAgIGZvbGRlci5pZCA9IGZvbGRlcnNBcnJheS5sZW5ndGggIT09IDAgPyBmb2xkZXJzQXJyYXkubGVuZ3RoIDogMDtcbiAgICBmb2xkZXJzQXJyYXkucHVzaChmb2xkZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9sZGVySW5zdGFuY2UoZm9sZGVySWQpIHtcbiAgICByZXR1cm4gZm9sZGVyc0FycmF5LmZpbHRlcihmbCA9PiBmbC5pZCA9PT0gZm9sZGVySWQpWzBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9UYXNrQXJyYXkodGFzaykge1xuICAgIGxldCBmb2xkZXJJZCA9IGdldFNlbGVjdGVkRm9sZGVySUQoKTtcbiAgICBmb2xkZXJzQXJyYXkuZm9yRWFjaChmbCA9PiB7XG4gICAgICAgIGlmKGZsLmlkID09PSBmb2xkZXJJZCkge1xuICAgICAgICAgICAgZmwuYWRkVGFzayh0YXNrKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5cbiIsImltcG9ydCB7aW5pdGlhbGl6ZSAsIGFkZFRhc2tzVG9QYWdlfSBmcm9tIFwiLi9kb21TY3JpcHRzL2RvbVwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCB7IGFkZFRvVGFza0FycmF5IH0gZnJvbSBcIi4vZm9sZGVyXCI7XG5pbXBvcnQgeyBsb2FkVGFza3MgfSBmcm9tIFwiLi9kb21TY3JpcHRzL3Rhc2tEb21cIjtcblxuaW5pdGlhbGl6ZSgpO1xuXG5sZXQgdGFzazEgPSBuZXcgVGFzayhcIkFiIGV4ZXJjaXNlXCIsIFwiZG8gMzAganVtcGluZyBqYWNrc1wiLCBcblwiMTQwMiAvIDggLyAyN1wiLCBcIjNcIiwgXCJ3b3Jrb3V0c1wiLCAwKTtcblxuYWRkVG9UYXNrQXJyYXkodGFzazEpO1xubG9hZFRhc2tzKCk7XG5cbiIsImV4cG9ydCBjbGFzcyBUYXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBcbiAgICAgICAgZGVzY3JpcHRpb24gPSBcIk5vIGRlc2NyaXB0aW9uXCIsXG4gICAgICAgIGR1ZURhdGUgPSBcIlwiLCBwcmlvcml0eSwgaWQpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgdG9nZ2xlQ29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZSA9ICF0aGlzLmlzQ29tcGxldGU7XG4gICAgfSAgXG5cbn1cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==