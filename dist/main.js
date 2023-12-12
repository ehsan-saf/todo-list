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
const folders = document.querySelectorAll(".folder");
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

    folders.forEach(fl => { fl.addEventListener("click", selectFolder); });
    (0,_folder__WEBPACK_IMPORTED_MODULE_0__.addToFolderArray)("Default");
}


function addFolder() {
    (0,_folder__WEBPACK_IMPORTED_MODULE_0__.addToFolderArray)(newFolderName.value);
    loadFolders();
    newFolderPrompt.classList.add("hide");
    resetFolderInput();
    selectAddedFolder();
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
    const folderId = getSelectedFolderID();
    if(folderId === "all") { 
        (0,_taskDom__WEBPACK_IMPORTED_MODULE_1__.loadAllTasks)();
        folderName.textContent = "All Tasks";
    }
    else if(folderId === "today") {
        folderName.textContent = "Today Tasks";
    }
    else {
        (0,_taskDom__WEBPACK_IMPORTED_MODULE_1__.loadTasks)();
        setFolderName(folderId);
    }
    
    
}

function getSelectedFolderID() {
    return document.querySelector(".selectedFolder").id;
}

function setFolderName() {
    folderName.textContent = (0,_folder__WEBPACK_IMPORTED_MODULE_0__.getFolderInstance)(getSelectedFolderID()).name;
}

function selectAddedFolder() {
    document.querySelector(".folder-list  .folder:last-child").classList.add("selectedFolder");
    setFolderName();
    (0,_taskDom__WEBPACK_IMPORTED_MODULE_1__.loadTasks)();
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
/* harmony export */   loadAllTasks: () => (/* binding */ loadAllTasks),
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
    const folder = (0,_folder__WEBPACK_IMPORTED_MODULE_1__.getFolderInstance)((0,_folderDom__WEBPACK_IMPORTED_MODULE_0__.getSelectedFolderID)());
    folder.tasks.forEach(task => {
        createTask(task);
    });
}

function loadAllTasks() {
    todoList.innerHTML = "";
    _folder__WEBPACK_IMPORTED_MODULE_1__.foldersArray.forEach(folder => {
        folder.tasks.forEach(task => {
            createTask(task);
        });
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
    return foldersArray.filter(fl => fl.id == folderId)[0];
}

function addToTaskArray(task) {
    let folderId = Number((0,_domScripts_folderDom__WEBPACK_IMPORTED_MODULE_0__.getSelectedFolderID)());
    foldersArray.forEach(fl => {
        if(fl.id == folderId) {
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
"1402 / 8 / 27", "3", 0);

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
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.isComplete = false;
            this.id = id;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7VUNqQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tU2NyaXB0cy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbVNjcmlwdHMvZm9sZGVyRG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb21TY3JpcHRzL21vZGlmeVRhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbVNjcmlwdHMvdGFza0RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZm9sZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdGlhbGl6ZSBhcyBpbml0Rm9sZGVycyB9IGZyb20gXCIuL2ZvbGRlckRvbVwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZSBhcyBpbml0TmV3VGFzayB9IGZyb20gXCIuL21vZGlmeVRhc2tcIjtcbmltcG9ydCB7IGNyZWF0ZVRhc2sgfSBmcm9tIFwiLi90YXNrRG9tXCI7XG5pbXBvcnQgeyBvcGVuVG9Eb01vZGFsIH0gZnJvbSBcIi4vbW9kaWZ5VGFza1wiO1xuaW1wb3J0IHsgdGFza3NBcnJheSB9IGZyb20gXCIuLlwiO1xuXG5jb25zdCBjcmVhdGVOZXdUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdG9kby1idG5cIik7XG5jb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBpbml0Rm9sZGVycygpO1xuICAgIGluaXROZXdUYXNrKCk7XG4gICAgY3JlYXRlTmV3VGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb3BlblRvRG9Nb2RhbCk7XG59XG4iLCJpbXBvcnQgeyBmb2xkZXJzQXJyYXksIGdldEZvbGRlckluc3RhbmNlIH0gZnJvbSBcIi4uL2ZvbGRlclwiO1xuaW1wb3J0IHsgYWRkVG9Gb2xkZXJBcnJheSB9IGZyb20gXCIuLi9mb2xkZXJcIjtcbmltcG9ydCB7IGxvYWRBbGxUYXNrcywgbG9hZFRhc2tzIH0gZnJvbSBcIi4vdGFza0RvbVwiO1xuXG5cbmNvbnN0IGZvbGRlcnNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb2xkZXItbGlzdFwiKTtcbmNvbnN0IG5ld0ZvbGRlclByb21wdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3Rm9sZGVySW5wdXRcIik7XG5jb25zdCBuZXdGb2xkZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb2xkZXJOYW1lSW5wdXRcIik7XG5jb25zdCBmb2xkZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5mb2xkZXJcIik7XG5jb25zdCBmb2xkZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb2xkZXItbmFtZVwiKTtcblxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcblxuICAgIGNvbnN0IG9wZW5OZXdGb2xkZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZEZvbGRlckJ0blwiKTtcbiAgICBvcGVuTmV3Rm9sZGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgbmV3Rm9sZGVyUHJvbXB0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuICAgIFxuIH0pO1xuXG4gICAgY29uc3QgY3JlYXRlRm9sZGVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGVGb2xkZXJCdG5cIik7XG4gICAgY3JlYXRlRm9sZGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRGb2xkZXIpO1xuXG4gICAgY29uc3QgY2FuY2VsRm9sZGVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW5jZWxGb2xkZXJCdG5cIik7XG4gICAgY2FuY2VsRm9sZGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHJlc2V0Rm9sZGVySW5wdXQoKTtcbiAgICAgICAgbmV3Rm9sZGVyUHJvbXB0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgIH0pO1xuXG4gICAgZm9sZGVycy5mb3JFYWNoKGZsID0+IHsgZmwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGVjdEZvbGRlcik7IH0pO1xuICAgIGFkZFRvRm9sZGVyQXJyYXkoXCJEZWZhdWx0XCIpO1xufVxuXG5cbmZ1bmN0aW9uIGFkZEZvbGRlcigpIHtcbiAgICBhZGRUb0ZvbGRlckFycmF5KG5ld0ZvbGRlck5hbWUudmFsdWUpO1xuICAgIGxvYWRGb2xkZXJzKCk7XG4gICAgbmV3Rm9sZGVyUHJvbXB0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgIHJlc2V0Rm9sZGVySW5wdXQoKTtcbiAgICBzZWxlY3RBZGRlZEZvbGRlcigpO1xufVxuXG5cbmZ1bmN0aW9uIHJlc2V0Rm9sZGVySW5wdXQoKSB7XG4gICAgbmV3Rm9sZGVyTmFtZS52YWx1ZSA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGxvYWRGb2xkZXJzKCkge1xuICAgIGZvbGRlcnNMaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgZm9sZGVyc0FycmF5LmZvckVhY2goZmwgPT4ge1xuXG4gICAgICAgIGNvbnN0IGZvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGZvbGRlci5jbGFzc0xpc3QuYWRkKFwiZm9sZGVyXCIpO1xuICAgICAgICBmb2xkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGVjdEZvbGRlcik7XG5cbiAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIGljb24uc3JjID0gXCIuL2ljb25zL2xpc3QucG5nXCI7XG5cbiAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBuYW1lLnRleHRDb250ZW50ID0gZmwubmFtZTtcblxuICAgICAgICBmb2xkZXIuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgICAgIGZvbGRlci5hcHBlbmRDaGlsZChuYW1lKTtcbiAgICAgICAgZm9sZGVyLmlkID0gZmwuaWQ7XG5cbiAgICAgICAgZm9sZGVyc0xpc3QuYXBwZW5kQ2hpbGQoZm9sZGVyKTsgXG4gICAgfSk7XG4gICAgXG59XG5cbmZ1bmN0aW9uIHNlbGVjdEZvbGRlcihlKSB7XG4gICAgY29uc29sZS5sb2coXCJGb2xkZXIgY2xpY2tlZCFcIik7XG4gICAgY29uc3Qgc2VsZWN0ZWRGb2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGVkRm9sZGVyXCIpO1xuICAgIGlmKHNlbGVjdGVkRm9sZGVyKSB7XG4gICAgICAgIHNlbGVjdGVkRm9sZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZEZvbGRlclwiKTtcbiAgICB9XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkRm9sZGVyXCIpO1xuICAgIGNvbnN0IGZvbGRlcklkID0gZ2V0U2VsZWN0ZWRGb2xkZXJJRCgpO1xuICAgIGlmKGZvbGRlcklkID09PSBcImFsbFwiKSB7IFxuICAgICAgICBsb2FkQWxsVGFza3MoKTtcbiAgICAgICAgZm9sZGVyTmFtZS50ZXh0Q29udGVudCA9IFwiQWxsIFRhc2tzXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoZm9sZGVySWQgPT09IFwidG9kYXlcIikge1xuICAgICAgICBmb2xkZXJOYW1lLnRleHRDb250ZW50ID0gXCJUb2RheSBUYXNrc1wiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbG9hZFRhc2tzKCk7XG4gICAgICAgIHNldEZvbGRlck5hbWUoZm9sZGVySWQpO1xuICAgIH1cbiAgICBcbiAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlbGVjdGVkRm9sZGVySUQoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRGb2xkZXJcIikuaWQ7XG59XG5cbmZ1bmN0aW9uIHNldEZvbGRlck5hbWUoKSB7XG4gICAgZm9sZGVyTmFtZS50ZXh0Q29udGVudCA9IGdldEZvbGRlckluc3RhbmNlKGdldFNlbGVjdGVkRm9sZGVySUQoKSkubmFtZTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0QWRkZWRGb2xkZXIoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb2xkZXItbGlzdCAgLmZvbGRlcjpsYXN0LWNoaWxkXCIpLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZEZvbGRlclwiKTtcbiAgICBzZXRGb2xkZXJOYW1lKCk7XG4gICAgbG9hZFRhc2tzKCk7XG59IiwiaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi90YXNrXCI7XG5pbXBvcnQgeyBhZGRUb1Rhc2tBcnJheSB9IGZyb20gXCIuLi9mb2xkZXJcIjtcbmltcG9ydCB7IGxvYWRUYXNrcyB9IGZyb20gXCIuL3Rhc2tEb21cIjtcblxuY29uc3Qgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2F2ZS10b2RvLWJ0blwiKTtcbmNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsLXRvZG8tYnRuXCIpO1xuXG5jb25zdCBuZXdUYXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ldy10YXNrLW1vZGFsXCIpO1xuXG5jb25zdCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dDpub3QoW3R5cGU9XCJyYWRpb1wiXSknKTtcbmNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGV4dGFyZWFbbmFtZT1cInRvZG8tbm90ZVwiXScpO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzYXZlVGFzayk7XG4gICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjYW5jZWxUYXNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5Ub0RvTW9kYWwoKSB7XG4gICAgbmV3VGFza01vZGFsLnNob3dNb2RhbCgpO1xufVxuXG5sZXQgdGl0bGUgPSBcIlwiO1xubGV0IGRldURhdGUgPSBcIlwiO1xubGV0IHByaW9yaXR5ID0gIFwiXCI7XG5sZXQgZGVzY3JpcHRpb24gPSBcIlwiO1xuXG5mdW5jdGlvbiBnZXRJbnB1dHMoKSB7XG4gICAgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9UaXRsZVwiKS52YWx1ZTtcbiAgICBkZXVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvRGF0ZVwiKS52YWx1ZTtcbiAgICBwcmlvcml0eSA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicHJpb3JpdHlcIl06Y2hlY2tlZCcpLnZhbHVlO1xuICAgIGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGV4dGFyZWFbbmFtZT1cInRvZG8tbm90ZVwiXScpLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBzYXZlVGFzaygpIHtcbiAgICBnZXRJbnB1dHMoKTtcbiAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkZXVEYXRlLCBwcmlvcml0eSk7XG4gICAgLy8gQWRkIHRoZSB0YXNrIHRvIHRoZSBzZWxlY3RlZCBmb2xkZXIgaW5zdGFuY2VcbiAgICBhZGRUb1Rhc2tBcnJheShuZXdUYXNrKTtcbiAgICBsb2FkVGFza3MoKTtcbiAgICBuZXdUYXNrTW9kYWwuY2xvc2UoKTtcbiAgICByZXNldElucHV0cygpO1xufVxuXG5mdW5jdGlvbiBjYW5jZWxUYXNrKCkge1xuICAgIG5ld1Rhc2tNb2RhbC5jbG9zZSgpO1xuICAgIHJlc2V0SW5wdXRzKCk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0SW5wdXRzKCkge1xuICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgICAgaW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IFwiXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W2lkPVwiZm91cnRoLXByXCJdJykuY2hlY2tlZCA9IHRydWU7XG4gICAgfSk7XG59IiwiaW1wb3J0IHsgZ2V0U2VsZWN0ZWRGb2xkZXJJRCB9IGZyb20gXCIuL2ZvbGRlckRvbVwiO1xuaW1wb3J0IHsgZm9sZGVyc0FycmF5LCBnZXRGb2xkZXJJbnN0YW5jZSB9IGZyb20gXCIuLi9mb2xkZXJcIjtcblxuY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcblxuY29uc3QgcHJpb3JpdGllcyA9IHtcbiAgICBcIjFcIjogXCJpbXBvcnRhbnRcIixcbiAgICBcIjJcIjogXCJtZWRpdW1cIixcbiAgICBcIjNcIjogXCJsb3dcIixcbiAgICBcIjRcIjogXCJub25lXCIsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFRhc2tzKCkge1xuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgY29uc3QgZm9sZGVyID0gZ2V0Rm9sZGVySW5zdGFuY2UoZ2V0U2VsZWN0ZWRGb2xkZXJJRCgpKTtcbiAgICBmb2xkZXIudGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgY3JlYXRlVGFzayh0YXNrKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRBbGxUYXNrcygpIHtcbiAgICB0b2RvTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGZvbGRlcnNBcnJheS5mb3JFYWNoKGZvbGRlciA9PiB7XG4gICAgICAgIGZvbGRlci50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgY3JlYXRlVGFzayh0YXNrKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhc2sodGFzaykge1xuXG4gICAgY29uc3QgdG9kbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdG9kby5jbGFzc0xpc3QuYWRkKFwidG9kb1wiKTtcblxuICAgIGNvbnN0IGRpdjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGRpdjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJjaGVja2JveFwiKTtcbiAgICBjb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgdG9kb1RpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLXRpdGxlXCIpO1xuXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eVwiKTtcbiAgICBwcmlvcml0eS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2hhbmdlUHJpb3JpdHkpO1xuXG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGR1ZURhdGUuY2xhc3NMaXN0LmFkZChcInRvZG8tZGF0ZVwiKTtcblxuICAgIGRpdjEuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgIGRpdjEuYXBwZW5kQ2hpbGQodG9kb1RpdGxlKTtcblxuICAgIGRpdjIuYXBwZW5kQ2hpbGQocHJpb3JpdHkpO1xuICAgIGRpdjIuYXBwZW5kQ2hpbGQoZHVlRGF0ZSk7XG5cbiAgICB0b2RvVGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xuXG4gICAgc2V0UHJpb3JpdHkodGFzaywgcHJpb3JpdHkpO1xuICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmR1ZURhdGU7XG5cbiAgICB0b2RvLmFwcGVuZENoaWxkKGRpdjEpO1xuICAgIHRvZG8uYXBwZW5kQ2hpbGQoZGl2Mik7XG5cbiAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZCh0b2RvKTtcbn1cblxuXG5mdW5jdGlvbiBzZXRQcmlvcml0eSh0YXNrLCBwcmlvcml0eSkge1xuICAgIGxldCBwciA9IHByaW9yaXRpZXNbdGFzay5wcmlvcml0eV07XG4gICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZChwcik7XG4gICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSBwcjtcbn1cblxuZnVuY3Rpb24gY2hhbmdlUHJpb3JpdHkocHIpIHtcbiAgICBjb25zdCB0YXJnZXRUYXNrID0gcHIudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZSgpIHtcblxufSIsImltcG9ydCB7IGdldFNlbGVjdGVkRm9sZGVySUQgfSBmcm9tIFwiLi9kb21TY3JpcHRzL2ZvbGRlckRvbVwiO1xuXG5leHBvcnQgbGV0IGZvbGRlcnNBcnJheSA9IFtdO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdGb2xkZXIobmFtZSwgdGFza3MgPSBbXSwgaWQgPSAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgdGFza3M6IHRhc2tzLFxuICAgICAgICBpZDogaWQsXG5cbiAgICAgICAgYWRkVGFzayh0YXNrKSB7XG4gICAgICAgICAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlVGFzayh0YXNrKSB7XG4gICAgICAgICAgICB0aGlzLnRhc2tzID0gdGhpcy50YXNrcy5maWx0ZXIodHMgPT4gdHMuaWQgIT09IHRhc2suaWQpO1xuICAgICAgICB9XG4gICAgfTtcbn0gXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRUb0ZvbGRlckFycmF5KGZvbGRlck5hbWUpIHtcbiAgICBjb25zdCBmb2xkZXIgPSBuZXdGb2xkZXIoZm9sZGVyTmFtZSk7XG4gICAgZm9sZGVyLmlkID0gZm9sZGVyc0FycmF5Lmxlbmd0aCAhPT0gMCA/IGZvbGRlcnNBcnJheS5sZW5ndGggOiAwO1xuICAgIGZvbGRlcnNBcnJheS5wdXNoKGZvbGRlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb2xkZXJJbnN0YW5jZShmb2xkZXJJZCkge1xuICAgIHJldHVybiBmb2xkZXJzQXJyYXkuZmlsdGVyKGZsID0+IGZsLmlkID09IGZvbGRlcklkKVswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRvVGFza0FycmF5KHRhc2spIHtcbiAgICBsZXQgZm9sZGVySWQgPSBOdW1iZXIoZ2V0U2VsZWN0ZWRGb2xkZXJJRCgpKTtcbiAgICBmb2xkZXJzQXJyYXkuZm9yRWFjaChmbCA9PiB7XG4gICAgICAgIGlmKGZsLmlkID09IGZvbGRlcklkKSB7XG4gICAgICAgICAgICBmbC5hZGRUYXNrKHRhc2spO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cblxuIiwiaW1wb3J0IHtpbml0aWFsaXplICwgYWRkVGFza3NUb1BhZ2V9IGZyb20gXCIuL2RvbVNjcmlwdHMvZG9tXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza1wiO1xuaW1wb3J0IHsgYWRkVG9UYXNrQXJyYXkgfSBmcm9tIFwiLi9mb2xkZXJcIjtcbmltcG9ydCB7IGxvYWRUYXNrcyB9IGZyb20gXCIuL2RvbVNjcmlwdHMvdGFza0RvbVwiO1xuXG5pbml0aWFsaXplKCk7XG5cbmxldCB0YXNrMSA9IG5ldyBUYXNrKFwiQWIgZXhlcmNpc2VcIiwgXCJkbyAzMCBqdW1waW5nIGphY2tzXCIsIFxuXCIxNDAyIC8gOCAvIDI3XCIsIFwiM1wiLCAwKTtcblxuYWRkVG9UYXNrQXJyYXkodGFzazEpO1xubG9hZFRhc2tzKCk7XG5cbiIsImV4cG9ydCBjbGFzcyBUYXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBcbiAgICAgICAgZGVzY3JpcHRpb24gPSBcIk5vIGRlc2NyaXB0aW9uXCIsXG4gICAgICAgIGR1ZURhdGUgPSBcIlwiLCBwcmlvcml0eSwgaWQpIHtcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgfVxuXG4gICAgdG9nZ2xlQ29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZSA9ICF0aGlzLmlzQ29tcGxldGU7XG4gICAgfSAgXG5cbn1cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==