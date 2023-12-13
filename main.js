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

    const removeButton = document.createElement("button");
    const removeIcon = document.createElement("img");
    removeIcon.src = "./icons/remove.png";
    removeButton.appendChild(removeIcon);

    removeButton.classList.add("delete-todo")
    removeButton.addEventListener("click", removeTask);

    removeIcon.addEventListener("mouseover", () => {
        removeIcon.src = "./icons/remove.gif";
    });
    removeIcon.addEventListener("mouseleave", () => {
        removeIcon.src = "./icons/remove.png";
    });

    div1.appendChild(checkbox);
    div1.appendChild(todoTitle);

    div2.appendChild(priority);
    div2.appendChild(dueDate);
    div2.appendChild(removeButton);

    todoTitle.textContent = task.title;

    setPriority(task, priority);
    dueDate.textContent = task.dueDate;

    todo.appendChild(div1);
    todo.appendChild(div2);

    todo.id = task.id;

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

function removeTask() {

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
            task.id = fl.tasks.length;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qjs7QUFFQSx1REFBYztBQUNkLDhEQUFTOzs7Ozs7Ozs7Ozs7Ozs7O0FDWEY7O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztVQ2pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb21TY3JpcHRzL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tU2NyaXB0cy9mb2xkZXJEb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbVNjcmlwdHMvbW9kaWZ5VGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tU2NyaXB0cy90YXNrRG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9mb2xkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0aWFsaXplIGFzIGluaXRGb2xkZXJzIH0gZnJvbSBcIi4vZm9sZGVyRG9tXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplIGFzIGluaXROZXdUYXNrIH0gZnJvbSBcIi4vbW9kaWZ5VGFza1wiO1xuaW1wb3J0IHsgY3JlYXRlVGFzayB9IGZyb20gXCIuL3Rhc2tEb21cIjtcbmltcG9ydCB7IG9wZW5Ub0RvTW9kYWwgfSBmcm9tIFwiLi9tb2RpZnlUYXNrXCI7XG5pbXBvcnQgeyB0YXNrc0FycmF5IH0gZnJvbSBcIi4uXCI7XG5cbmNvbnN0IGNyZWF0ZU5ld1Rhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10b2RvLWJ0blwiKTtcbmNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIGluaXRGb2xkZXJzKCk7XG4gICAgaW5pdE5ld1Rhc2soKTtcbiAgICBjcmVhdGVOZXdUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuVG9Eb01vZGFsKTtcbn1cbiIsImltcG9ydCB7IGZvbGRlcnNBcnJheSwgZ2V0Rm9sZGVySW5zdGFuY2UgfSBmcm9tIFwiLi4vZm9sZGVyXCI7XG5pbXBvcnQgeyBhZGRUb0ZvbGRlckFycmF5IH0gZnJvbSBcIi4uL2ZvbGRlclwiO1xuaW1wb3J0IHsgbG9hZEFsbFRhc2tzLCBsb2FkVGFza3MgfSBmcm9tIFwiLi90YXNrRG9tXCI7XG5cblxuY29uc3QgZm9sZGVyc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvbGRlci1saXN0XCIpO1xuY29uc3QgbmV3Rm9sZGVyUHJvbXB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXdGb2xkZXJJbnB1dFwiKTtcbmNvbnN0IG5ld0ZvbGRlck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZvbGRlck5hbWVJbnB1dFwiKTtcbmNvbnN0IGZvbGRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZvbGRlclwiKTtcbmNvbnN0IGZvbGRlck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvbGRlci1uYW1lXCIpO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuXG4gICAgY29uc3Qgb3Blbk5ld0ZvbGRlckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkRm9sZGVyQnRuXCIpO1xuICAgIG9wZW5OZXdGb2xkZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBuZXdGb2xkZXJQcm9tcHQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gICAgXG4gfSk7XG5cbiAgICBjb25zdCBjcmVhdGVGb2xkZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyZWF0ZUZvbGRlckJ0blwiKTtcbiAgICBjcmVhdGVGb2xkZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFkZEZvbGRlcik7XG5cbiAgICBjb25zdCBjYW5jZWxGb2xkZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbmNlbEZvbGRlckJ0blwiKTtcbiAgICBjYW5jZWxGb2xkZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgcmVzZXRGb2xkZXJJbnB1dCgpO1xuICAgICAgICBuZXdGb2xkZXJQcm9tcHQuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG4gICAgfSk7XG5cbiAgICBmb2xkZXJzLmZvckVhY2goZmwgPT4geyBmbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VsZWN0Rm9sZGVyKTsgfSk7XG4gICAgYWRkVG9Gb2xkZXJBcnJheShcIkRlZmF1bHRcIik7XG59XG5cblxuZnVuY3Rpb24gYWRkRm9sZGVyKCkge1xuICAgIGFkZFRvRm9sZGVyQXJyYXkobmV3Rm9sZGVyTmFtZS52YWx1ZSk7XG4gICAgbG9hZEZvbGRlcnMoKTtcbiAgICBuZXdGb2xkZXJQcm9tcHQuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG4gICAgcmVzZXRGb2xkZXJJbnB1dCgpO1xuICAgIHNlbGVjdEFkZGVkRm9sZGVyKCk7XG59XG5cblxuZnVuY3Rpb24gcmVzZXRGb2xkZXJJbnB1dCgpIHtcbiAgICBuZXdGb2xkZXJOYW1lLnZhbHVlID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gbG9hZEZvbGRlcnMoKSB7XG4gICAgZm9sZGVyc0xpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBmb2xkZXJzQXJyYXkuZm9yRWFjaChmbCA9PiB7XG5cbiAgICAgICAgY29uc3QgZm9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZm9sZGVyLmNsYXNzTGlzdC5hZGQoXCJmb2xkZXJcIik7XG4gICAgICAgIGZvbGRlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VsZWN0Rm9sZGVyKTtcblxuICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgaWNvbi5zcmMgPSBcIi4vaWNvbnMvbGlzdC5wbmdcIjtcblxuICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIG5hbWUudGV4dENvbnRlbnQgPSBmbC5uYW1lO1xuXG4gICAgICAgIGZvbGRlci5hcHBlbmRDaGlsZChpY29uKTtcbiAgICAgICAgZm9sZGVyLmFwcGVuZENoaWxkKG5hbWUpO1xuICAgICAgICBmb2xkZXIuaWQgPSBmbC5pZDtcblxuICAgICAgICBmb2xkZXJzTGlzdC5hcHBlbmRDaGlsZChmb2xkZXIpOyBcbiAgICB9KTtcbiAgICBcbn1cblxuZnVuY3Rpb24gc2VsZWN0Rm9sZGVyKGUpIHtcbiAgICBjb25zb2xlLmxvZyhcIkZvbGRlciBjbGlja2VkIVwiKTtcbiAgICBjb25zdCBzZWxlY3RlZEZvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRGb2xkZXJcIik7XG4gICAgaWYoc2VsZWN0ZWRGb2xkZXIpIHtcbiAgICAgICAgc2VsZWN0ZWRGb2xkZXIuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkRm9sZGVyXCIpO1xuICAgIH1cbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRGb2xkZXJcIik7XG4gICAgY29uc3QgZm9sZGVySWQgPSBnZXRTZWxlY3RlZEZvbGRlcklEKCk7XG4gICAgaWYoZm9sZGVySWQgPT09IFwiYWxsXCIpIHsgXG4gICAgICAgIGxvYWRBbGxUYXNrcygpO1xuICAgICAgICBmb2xkZXJOYW1lLnRleHRDb250ZW50ID0gXCJBbGwgVGFza3NcIjtcbiAgICB9XG4gICAgZWxzZSBpZihmb2xkZXJJZCA9PT0gXCJ0b2RheVwiKSB7XG4gICAgICAgIGZvbGRlck5hbWUudGV4dENvbnRlbnQgPSBcIlRvZGF5IFRhc2tzXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsb2FkVGFza3MoKTtcbiAgICAgICAgc2V0Rm9sZGVyTmFtZShmb2xkZXJJZCk7XG4gICAgfVxuICAgIFxuICAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRGb2xkZXJJRCgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RlZEZvbGRlclwiKS5pZDtcbn1cblxuZnVuY3Rpb24gc2V0Rm9sZGVyTmFtZSgpIHtcbiAgICBmb2xkZXJOYW1lLnRleHRDb250ZW50ID0gZ2V0Rm9sZGVySW5zdGFuY2UoZ2V0U2VsZWN0ZWRGb2xkZXJJRCgpKS5uYW1lO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RBZGRlZEZvbGRlcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvbGRlci1saXN0ICAuZm9sZGVyOmxhc3QtY2hpbGRcIikuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkRm9sZGVyXCIpO1xuICAgIHNldEZvbGRlck5hbWUoKTtcbiAgICBsb2FkVGFza3MoKTtcbn0iLCJpbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL3Rhc2tcIjtcbmltcG9ydCB7IGFkZFRvVGFza0FycmF5IH0gZnJvbSBcIi4uL2ZvbGRlclwiO1xuaW1wb3J0IHsgbG9hZFRhc2tzIH0gZnJvbSBcIi4vdGFza0RvbVwiO1xuXG5jb25zdCBzYXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zYXZlLXRvZG8tYnRuXCIpO1xuY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtdG9kby1idG5cIik7XG5cbmNvbnN0IG5ld1Rhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXRhc2stbW9kYWxcIik7XG5cbmNvbnN0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0Om5vdChbdHlwZT1cInJhZGlvXCJdKScpO1xuY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPVwidG9kby1ub3RlXCJdJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNhdmVUYXNrKTtcbiAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNhbmNlbFRhc2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlblRvRG9Nb2RhbCgpIHtcbiAgICBuZXdUYXNrTW9kYWwuc2hvd01vZGFsKCk7XG59XG5cbmxldCB0aXRsZSA9IFwiXCI7XG5sZXQgZGV1RGF0ZSA9IFwiXCI7XG5sZXQgcHJpb3JpdHkgPSAgXCJcIjtcbmxldCBkZXNjcmlwdGlvbiA9IFwiXCI7XG5cbmZ1bmN0aW9uIGdldElucHV0cygpIHtcbiAgICB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb1RpdGxlXCIpLnZhbHVlO1xuICAgIGRldURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9EYXRlXCIpLnZhbHVlO1xuICAgIHByaW9yaXR5ID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJwcmlvcml0eVwiXTpjaGVja2VkJykudmFsdWU7XG4gICAgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPVwidG9kby1ub3RlXCJdJykudmFsdWU7XG59XG5cbmZ1bmN0aW9uIHNhdmVUYXNrKCkge1xuICAgIGdldElucHV0cygpO1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRldURhdGUsIHByaW9yaXR5KTtcbiAgICAvLyBBZGQgdGhlIHRhc2sgdG8gdGhlIHNlbGVjdGVkIGZvbGRlciBpbnN0YW5jZVxuICAgIGFkZFRvVGFza0FycmF5KG5ld1Rhc2spO1xuICAgIGxvYWRUYXNrcygpO1xuICAgIG5ld1Rhc2tNb2RhbC5jbG9zZSgpO1xuICAgIHJlc2V0SW5wdXRzKCk7XG59XG5cbmZ1bmN0aW9uIGNhbmNlbFRhc2soKSB7XG4gICAgbmV3VGFza01vZGFsLmNsb3NlKCk7XG4gICAgcmVzZXRJbnB1dHMoKTtcbn1cblxuZnVuY3Rpb24gcmVzZXRJbnB1dHMoKSB7XG4gICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICBpbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gXCJcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbaWQ9XCJmb3VydGgtcHJcIl0nKS5jaGVja2VkID0gdHJ1ZTtcbiAgICB9KTtcbn0iLCJpbXBvcnQgeyBnZXRTZWxlY3RlZEZvbGRlcklEIH0gZnJvbSBcIi4vZm9sZGVyRG9tXCI7XG5pbXBvcnQgeyBmb2xkZXJzQXJyYXksIGdldEZvbGRlckluc3RhbmNlIH0gZnJvbSBcIi4uL2ZvbGRlclwiO1xuXG5jb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpO1xuXG5jb25zdCBwcmlvcml0aWVzID0ge1xuICAgIFwiMVwiOiBcImltcG9ydGFudFwiLFxuICAgIFwiMlwiOiBcIm1lZGl1bVwiLFxuICAgIFwiM1wiOiBcImxvd1wiLFxuICAgIFwiNFwiOiBcIm5vbmVcIixcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkVGFza3MoKSB7XG4gICAgdG9kb0xpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBjb25zdCBmb2xkZXIgPSBnZXRGb2xkZXJJbnN0YW5jZShnZXRTZWxlY3RlZEZvbGRlcklEKCkpO1xuICAgIGZvbGRlci50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBjcmVhdGVUYXNrKHRhc2spO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEFsbFRhc2tzKCkge1xuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgZm9sZGVyc0FycmF5LmZvckVhY2goZm9sZGVyID0+IHtcbiAgICAgICAgZm9sZGVyLnRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICBjcmVhdGVUYXNrKHRhc2spO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGFzayh0YXNrKSB7XG5cbiAgICBjb25zdCB0b2RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0b2RvLmNsYXNzTGlzdC5hZGQoXCJ0b2RvXCIpO1xuXG4gICAgY29uc3QgZGl2MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgZGl2MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZChcImNoZWNrYm94XCIpO1xuICAgIGNvbnN0IHRvZG9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICB0b2RvVGl0bGUuY2xhc3NMaXN0LmFkZChcInRvZG8tdGl0bGVcIik7XG5cbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZChcInByaW9yaXR5XCIpO1xuICAgIHByaW9yaXR5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGFuZ2VQcmlvcml0eSk7XG5cbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwidG9kby1kYXRlXCIpO1xuXG4gICAgY29uc3QgcmVtb3ZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjb25zdCByZW1vdmVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICByZW1vdmVJY29uLnNyYyA9IFwiLi9pY29ucy9yZW1vdmUucG5nXCI7XG4gICAgcmVtb3ZlQnV0dG9uLmFwcGVuZENoaWxkKHJlbW92ZUljb24pO1xuXG4gICAgcmVtb3ZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtdG9kb1wiKVxuICAgIHJlbW92ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVtb3ZlVGFzayk7XG5cbiAgICByZW1vdmVJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuICAgICAgICByZW1vdmVJY29uLnNyYyA9IFwiLi9pY29ucy9yZW1vdmUuZ2lmXCI7XG4gICAgfSk7XG4gICAgcmVtb3ZlSWNvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7XG4gICAgICAgIHJlbW92ZUljb24uc3JjID0gXCIuL2ljb25zL3JlbW92ZS5wbmdcIjtcbiAgICB9KTtcblxuICAgIGRpdjEuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgIGRpdjEuYXBwZW5kQ2hpbGQodG9kb1RpdGxlKTtcblxuICAgIGRpdjIuYXBwZW5kQ2hpbGQocHJpb3JpdHkpO1xuICAgIGRpdjIuYXBwZW5kQ2hpbGQoZHVlRGF0ZSk7XG4gICAgZGl2Mi5hcHBlbmRDaGlsZChyZW1vdmVCdXR0b24pO1xuXG4gICAgdG9kb1RpdGxlLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcblxuICAgIHNldFByaW9yaXR5KHRhc2ssIHByaW9yaXR5KTtcbiAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5kdWVEYXRlO1xuXG4gICAgdG9kby5hcHBlbmRDaGlsZChkaXYxKTtcbiAgICB0b2RvLmFwcGVuZENoaWxkKGRpdjIpO1xuXG4gICAgdG9kby5pZCA9IHRhc2suaWQ7XG5cbiAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZCh0b2RvKTtcbn1cblxuXG5mdW5jdGlvbiBzZXRQcmlvcml0eSh0YXNrLCBwcmlvcml0eSkge1xuICAgIGxldCBwciA9IHByaW9yaXRpZXNbdGFzay5wcmlvcml0eV07XG4gICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZChwcik7XG4gICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSBwcjtcbn1cblxuZnVuY3Rpb24gY2hhbmdlUHJpb3JpdHkocHIpIHtcbiAgICBjb25zdCB0YXJnZXRUYXNrID0gcHIudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlVGFzaygpIHtcblxufSIsImltcG9ydCB7IGdldFNlbGVjdGVkRm9sZGVySUQgfSBmcm9tIFwiLi9kb21TY3JpcHRzL2ZvbGRlckRvbVwiO1xuXG5leHBvcnQgbGV0IGZvbGRlcnNBcnJheSA9IFtdO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdGb2xkZXIobmFtZSwgdGFza3MgPSBbXSwgaWQgPSAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgdGFza3M6IHRhc2tzLFxuICAgICAgICBpZDogaWQsXG5cbiAgICAgICAgYWRkVGFzayh0YXNrKSB7XG4gICAgICAgICAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlVGFzayh0YXNrKSB7XG4gICAgICAgICAgICB0aGlzLnRhc2tzID0gdGhpcy50YXNrcy5maWx0ZXIodHMgPT4gdHMuaWQgIT09IHRhc2suaWQpO1xuICAgICAgICB9XG4gICAgfTtcbn0gXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRUb0ZvbGRlckFycmF5KGZvbGRlck5hbWUpIHtcbiAgICBjb25zdCBmb2xkZXIgPSBuZXdGb2xkZXIoZm9sZGVyTmFtZSk7XG4gICAgZm9sZGVyLmlkID0gZm9sZGVyc0FycmF5Lmxlbmd0aCAhPT0gMCA/IGZvbGRlcnNBcnJheS5sZW5ndGggOiAwO1xuICAgIGZvbGRlcnNBcnJheS5wdXNoKGZvbGRlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb2xkZXJJbnN0YW5jZShmb2xkZXJJZCkge1xuICAgIHJldHVybiBmb2xkZXJzQXJyYXkuZmlsdGVyKGZsID0+IGZsLmlkID09IGZvbGRlcklkKVswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRvVGFza0FycmF5KHRhc2spIHtcbiAgICBsZXQgZm9sZGVySWQgPSBOdW1iZXIoZ2V0U2VsZWN0ZWRGb2xkZXJJRCgpKTtcbiAgICBmb2xkZXJzQXJyYXkuZm9yRWFjaChmbCA9PiB7XG4gICAgICAgIGlmKGZsLmlkID09IGZvbGRlcklkKSB7XG4gICAgICAgICAgICB0YXNrLmlkID0gZmwudGFza3MubGVuZ3RoO1xuICAgICAgICAgICAgZmwuYWRkVGFzayh0YXNrKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5cbiIsImltcG9ydCB7aW5pdGlhbGl6ZSAsIGFkZFRhc2tzVG9QYWdlfSBmcm9tIFwiLi9kb21TY3JpcHRzL2RvbVwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCB7IGFkZFRvVGFza0FycmF5IH0gZnJvbSBcIi4vZm9sZGVyXCI7XG5pbXBvcnQgeyBsb2FkVGFza3MgfSBmcm9tIFwiLi9kb21TY3JpcHRzL3Rhc2tEb21cIjtcblxuaW5pdGlhbGl6ZSgpO1xuXG5sZXQgdGFzazEgPSBuZXcgVGFzayhcIkFiIGV4ZXJjaXNlXCIsIFwiZG8gMzAganVtcGluZyBqYWNrc1wiLCBcblwiMTQwMiAvIDggLyAyN1wiLCBcIjNcIiwgMCk7XG5cbmFkZFRvVGFza0FycmF5KHRhc2sxKTtcbmxvYWRUYXNrcygpO1xuXG4iLCJleHBvcnQgY2xhc3MgVGFzayB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgXG4gICAgICAgIGRlc2NyaXB0aW9uID0gXCJObyBkZXNjcmlwdGlvblwiLFxuICAgICAgICBkdWVEYXRlID0gXCJcIiwgcHJpb3JpdHksIGlkKSB7XG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICAgICAgdGhpcy5pc0NvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIH1cblxuICAgIHRvZ2dsZUNvbXBsZXRlKCkge1xuICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSAhdGhpcy5pc0NvbXBsZXRlO1xuICAgIH0gIFxuXG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=