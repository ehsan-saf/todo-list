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
    (0,_taskDom__WEBPACK_IMPORTED_MODULE_1__.loadTasks)();
    if(folderId === "all") { 
        folderName.textContent = "All Tasks";
    }
    else if(folderId === "today") {
        folderName.textContent = "Today Tasks";
    }
    else {
        setFolderName();
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
/* harmony export */   changeChecked: () => (/* binding */ changeChecked),
/* harmony export */   getEventTask: () => (/* binding */ getEventTask),
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
    const selectFolder = (0,_folderDom__WEBPACK_IMPORTED_MODULE_0__.getSelectedFolderID)();
    if(selectFolder === "all") { 
        loadAllTasks();
    }
    else {
        
        const folder = (0,_folder__WEBPACK_IMPORTED_MODULE_1__.getFolderInstance)((0,_folderDom__WEBPACK_IMPORTED_MODULE_0__.getSelectedFolderID)());
        folder.tasks.forEach(task => {
        createTask(task);
        });
    }
    
}

function loadAllTasks() {
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

    const checkbox = document.createElement("button");
    checkbox.classList.add("checkbox");

    if(task.isComplete) {
        checkbox.style.backgroundImage = "url(./icons/checkbox.png)";
    }

    checkbox.addEventListener("mouseover", (e) => {
        const task = getEventTask(e);
        if(!task.isComplete) {
            e.target.style.backgroundImage = "url(./icons/checkbox.gif)";
        }
    });

    checkbox.addEventListener("mouseleave", (e) => {
        const task = getEventTask(e);
        if(!task.isComplete) {
            e.target.style.backgroundImage = "";
        }
    });

    checkbox.addEventListener("click", changeChecked);

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
    removeButton.addEventListener("click", _folder__WEBPACK_IMPORTED_MODULE_1__.removeFromTasks);

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
    todo.dataset.folderId = task.folderId;

    todoList.appendChild(todo);
}


function setPriority(task, priority) {
    let pr = priorities[task.priority];
    priority.classList.add(pr);
    priority.textContent = pr;
}

function changePriority() {

}

function changeChecked(event) {
    const task = getEventTask(event);
    task.toggleComplete();
    loadTasks();
}

function getEventTask(event) {
    const ts = event.target.closest(".todo");
    const task = (0,_folder__WEBPACK_IMPORTED_MODULE_1__.getTask)(ts.id, ts.dataset.folderId);
    return task;
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
/* harmony export */   getTask: () => (/* binding */ getTask),
/* harmony export */   newFolder: () => (/* binding */ newFolder),
/* harmony export */   removeFromTasks: () => (/* binding */ removeFromTasks)
/* harmony export */ });
/* harmony import */ var _domScripts_folderDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domScripts/folderDom */ "./src/domScripts/folderDom.js");
/* harmony import */ var _domScripts_taskDom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domScripts/taskDom */ "./src/domScripts/taskDom.js");



let foldersArray = [];


function newFolder(name, tasks = [], id = 0) {
    return {
        name: name,
        tasks: tasks,
        id: id,

        addTask(task) {
            this.tasks.push(task);
        },

        removeTask(taskId) {
            console.log("Deleting task .....");
            console.log(this.tasks.filter(ts => ts.id !== taskId));
            this.tasks = this.tasks.filter(ts => ts.id !== taskId);
            this.tasks.forEach((ts, index) =>  {
                ts.id = index;
            });
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
            task.folderId = folderId;
            fl.addTask(task);
        }
    });
}

function removeFromTasks(e) {
    const todo = e.target.closest(".todo");
    const taskId = Number(todo.id);
    const folderId = Number(todo.dataset.folderId);
    foldersArray.forEach(fl => {
        if(fl.id == folderId) {
            fl.removeTask(taskId);
        }
    });
    (0,_domScripts_taskDom__WEBPACK_IMPORTED_MODULE_1__.loadTasks)();
}

function getTask(taskId, folderId) {
    const folder = getFolderInstance(folderId);
    return folder.tasks.find(ts => ts.id == taskId);
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
        dueDate = "", priority, id, folderId) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.isComplete = false;
            this.id = id;
            this.folderId = folderId;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBd0Q7QUFDQztBQUNsQjtBQUNNO0FBQ2I7O0FBRWhDO0FBQ0E7O0FBRU87QUFDUCxJQUFJLHNEQUFXO0FBQ2YsSUFBSSx1REFBVztBQUNmLCtDQUErQyxzREFBYTtBQUM1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYjREO0FBQ2Y7QUFDTzs7O0FBR3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCw0QkFBNEIsNkNBQTZDO0FBQ3pFLElBQUkseURBQWdCO0FBQ3BCOzs7QUFHQTtBQUNBLElBQUkseURBQWdCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxpREFBWTs7QUFFaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxtREFBUztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsMERBQWlCO0FBQzlDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksbURBQVM7QUFDYjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEcrQjtBQUNZO0FBQ0w7O0FBRXRDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsdUNBQUk7QUFDNUI7QUFDQSxJQUFJLHVEQUFjO0FBQ2xCLElBQUksbURBQVM7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3REa0Q7QUFDb0M7O0FBRXRGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0EseUJBQXlCLCtEQUFtQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDBEQUFpQixDQUFDLCtEQUFtQjtBQUM1RDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFTztBQUNQLElBQUksaURBQVk7QUFDaEI7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMsb0RBQWU7O0FBRTFEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSxpQkFBaUIsZ0RBQU87QUFDeEI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RJNkQ7QUFDRTs7QUFFeEQ7OztBQUdBO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQLDBCQUEwQiwwRUFBbUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSSw4REFBUztBQUNiOztBQUVPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRDZEO0FBQy9CO0FBQ1k7QUFDTzs7QUFFakQsMkRBQVU7O0FBRVYsZ0JBQWdCLHVDQUFJO0FBQ3BCOztBQUVBLHVEQUFjO0FBQ2QsOERBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYRjs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7VUNsQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tU2NyaXB0cy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbVNjcmlwdHMvZm9sZGVyRG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb21TY3JpcHRzL21vZGlmeVRhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbVNjcmlwdHMvdGFza0RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZm9sZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdGlhbGl6ZSBhcyBpbml0Rm9sZGVycyB9IGZyb20gXCIuL2ZvbGRlckRvbVwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZSBhcyBpbml0TmV3VGFzayB9IGZyb20gXCIuL21vZGlmeVRhc2tcIjtcbmltcG9ydCB7IGNyZWF0ZVRhc2sgfSBmcm9tIFwiLi90YXNrRG9tXCI7XG5pbXBvcnQgeyBvcGVuVG9Eb01vZGFsIH0gZnJvbSBcIi4vbW9kaWZ5VGFza1wiO1xuaW1wb3J0IHsgdGFza3NBcnJheSB9IGZyb20gXCIuLlwiO1xuXG5jb25zdCBjcmVhdGVOZXdUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdG9kby1idG5cIik7XG5jb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBpbml0Rm9sZGVycygpO1xuICAgIGluaXROZXdUYXNrKCk7XG4gICAgY3JlYXRlTmV3VGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb3BlblRvRG9Nb2RhbCk7XG59XG4iLCJpbXBvcnQgeyBmb2xkZXJzQXJyYXksIGdldEZvbGRlckluc3RhbmNlIH0gZnJvbSBcIi4uL2ZvbGRlclwiO1xuaW1wb3J0IHsgYWRkVG9Gb2xkZXJBcnJheSB9IGZyb20gXCIuLi9mb2xkZXJcIjtcbmltcG9ydCB7IGxvYWRBbGxUYXNrcywgbG9hZFRhc2tzIH0gZnJvbSBcIi4vdGFza0RvbVwiO1xuXG5cbmNvbnN0IGZvbGRlcnNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb2xkZXItbGlzdFwiKTtcbmNvbnN0IG5ld0ZvbGRlclByb21wdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3Rm9sZGVySW5wdXRcIik7XG5jb25zdCBuZXdGb2xkZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb2xkZXJOYW1lSW5wdXRcIik7XG5jb25zdCBmb2xkZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5mb2xkZXJcIik7XG5jb25zdCBmb2xkZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb2xkZXItbmFtZVwiKTtcblxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcblxuICAgIGNvbnN0IG9wZW5OZXdGb2xkZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZEZvbGRlckJ0blwiKTtcbiAgICBvcGVuTmV3Rm9sZGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgbmV3Rm9sZGVyUHJvbXB0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuICAgIFxuIH0pO1xuXG4gICAgY29uc3QgY3JlYXRlRm9sZGVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGVGb2xkZXJCdG5cIik7XG4gICAgY3JlYXRlRm9sZGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRGb2xkZXIpO1xuXG4gICAgY29uc3QgY2FuY2VsRm9sZGVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW5jZWxGb2xkZXJCdG5cIik7XG4gICAgY2FuY2VsRm9sZGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHJlc2V0Rm9sZGVySW5wdXQoKTtcbiAgICAgICAgbmV3Rm9sZGVyUHJvbXB0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgIH0pO1xuXG4gICAgZm9sZGVycy5mb3JFYWNoKGZsID0+IHsgZmwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGVjdEZvbGRlcik7IH0pO1xuICAgIGFkZFRvRm9sZGVyQXJyYXkoXCJEZWZhdWx0XCIpO1xufVxuXG5cbmZ1bmN0aW9uIGFkZEZvbGRlcigpIHtcbiAgICBhZGRUb0ZvbGRlckFycmF5KG5ld0ZvbGRlck5hbWUudmFsdWUpO1xuICAgIGxvYWRGb2xkZXJzKCk7XG4gICAgbmV3Rm9sZGVyUHJvbXB0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgIHJlc2V0Rm9sZGVySW5wdXQoKTtcbiAgICBzZWxlY3RBZGRlZEZvbGRlcigpO1xufVxuXG5cbmZ1bmN0aW9uIHJlc2V0Rm9sZGVySW5wdXQoKSB7XG4gICAgbmV3Rm9sZGVyTmFtZS52YWx1ZSA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGxvYWRGb2xkZXJzKCkge1xuICAgIGZvbGRlcnNMaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgZm9sZGVyc0FycmF5LmZvckVhY2goZmwgPT4ge1xuXG4gICAgICAgIGNvbnN0IGZvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGZvbGRlci5jbGFzc0xpc3QuYWRkKFwiZm9sZGVyXCIpO1xuICAgICAgICBmb2xkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGVjdEZvbGRlcik7XG5cbiAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIGljb24uc3JjID0gXCIuL2ljb25zL2xpc3QucG5nXCI7XG5cbiAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBuYW1lLnRleHRDb250ZW50ID0gZmwubmFtZTtcblxuICAgICAgICBmb2xkZXIuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgICAgIGZvbGRlci5hcHBlbmRDaGlsZChuYW1lKTtcbiAgICAgICAgZm9sZGVyLmlkID0gZmwuaWQ7XG5cbiAgICAgICAgZm9sZGVyc0xpc3QuYXBwZW5kQ2hpbGQoZm9sZGVyKTsgXG4gICAgfSk7XG4gICAgXG59XG5cbmZ1bmN0aW9uIHNlbGVjdEZvbGRlcihlKSB7XG4gICAgY29uc29sZS5sb2coXCJGb2xkZXIgY2xpY2tlZCFcIik7XG4gICAgY29uc3Qgc2VsZWN0ZWRGb2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGVkRm9sZGVyXCIpO1xuICAgIGlmKHNlbGVjdGVkRm9sZGVyKSB7XG4gICAgICAgIHNlbGVjdGVkRm9sZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZEZvbGRlclwiKTtcbiAgICB9XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkRm9sZGVyXCIpO1xuICAgIGNvbnN0IGZvbGRlcklkID0gZ2V0U2VsZWN0ZWRGb2xkZXJJRCgpO1xuICAgIGxvYWRUYXNrcygpO1xuICAgIGlmKGZvbGRlcklkID09PSBcImFsbFwiKSB7IFxuICAgICAgICBmb2xkZXJOYW1lLnRleHRDb250ZW50ID0gXCJBbGwgVGFza3NcIjtcbiAgICB9XG4gICAgZWxzZSBpZihmb2xkZXJJZCA9PT0gXCJ0b2RheVwiKSB7XG4gICAgICAgIGZvbGRlck5hbWUudGV4dENvbnRlbnQgPSBcIlRvZGF5IFRhc2tzXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzZXRGb2xkZXJOYW1lKCk7XG4gICAgfVxuICAgIFxuICAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRGb2xkZXJJRCgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RlZEZvbGRlclwiKS5pZDtcbn1cblxuZnVuY3Rpb24gc2V0Rm9sZGVyTmFtZSgpIHtcbiAgICBmb2xkZXJOYW1lLnRleHRDb250ZW50ID0gZ2V0Rm9sZGVySW5zdGFuY2UoZ2V0U2VsZWN0ZWRGb2xkZXJJRCgpKS5uYW1lO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RBZGRlZEZvbGRlcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvbGRlci1saXN0ICAuZm9sZGVyOmxhc3QtY2hpbGRcIikuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkRm9sZGVyXCIpO1xuICAgIHNldEZvbGRlck5hbWUoKTtcbiAgICBsb2FkVGFza3MoKTtcbn0iLCJpbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL3Rhc2tcIjtcbmltcG9ydCB7IGFkZFRvVGFza0FycmF5IH0gZnJvbSBcIi4uL2ZvbGRlclwiO1xuaW1wb3J0IHsgbG9hZFRhc2tzIH0gZnJvbSBcIi4vdGFza0RvbVwiO1xuXG5jb25zdCBzYXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zYXZlLXRvZG8tYnRuXCIpO1xuY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtdG9kby1idG5cIik7XG5cbmNvbnN0IG5ld1Rhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXRhc2stbW9kYWxcIik7XG5cbmNvbnN0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0Om5vdChbdHlwZT1cInJhZGlvXCJdKScpO1xuY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPVwidG9kby1ub3RlXCJdJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNhdmVUYXNrKTtcbiAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNhbmNlbFRhc2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlblRvRG9Nb2RhbCgpIHtcbiAgICBuZXdUYXNrTW9kYWwuc2hvd01vZGFsKCk7XG59XG5cbmxldCB0aXRsZSA9IFwiXCI7XG5sZXQgZGV1RGF0ZSA9IFwiXCI7XG5sZXQgcHJpb3JpdHkgPSAgXCJcIjtcbmxldCBkZXNjcmlwdGlvbiA9IFwiXCI7XG5cbmZ1bmN0aW9uIGdldElucHV0cygpIHtcbiAgICB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb1RpdGxlXCIpLnZhbHVlO1xuICAgIGRldURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9EYXRlXCIpLnZhbHVlO1xuICAgIHByaW9yaXR5ID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJwcmlvcml0eVwiXTpjaGVja2VkJykudmFsdWU7XG4gICAgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPVwidG9kby1ub3RlXCJdJykudmFsdWU7XG59XG5cbmZ1bmN0aW9uIHNhdmVUYXNrKCkge1xuICAgIGdldElucHV0cygpO1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRldURhdGUsIHByaW9yaXR5KTtcbiAgICAvLyBBZGQgdGhlIHRhc2sgdG8gdGhlIHNlbGVjdGVkIGZvbGRlciBpbnN0YW5jZVxuICAgIGFkZFRvVGFza0FycmF5KG5ld1Rhc2spO1xuICAgIGxvYWRUYXNrcygpO1xuICAgIG5ld1Rhc2tNb2RhbC5jbG9zZSgpO1xuICAgIHJlc2V0SW5wdXRzKCk7XG59XG5cbmZ1bmN0aW9uIGNhbmNlbFRhc2soKSB7XG4gICAgbmV3VGFza01vZGFsLmNsb3NlKCk7XG4gICAgcmVzZXRJbnB1dHMoKTtcbn1cblxuZnVuY3Rpb24gcmVzZXRJbnB1dHMoKSB7XG4gICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICBpbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gXCJcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbaWQ9XCJmb3VydGgtcHJcIl0nKS5jaGVja2VkID0gdHJ1ZTtcbiAgICB9KTtcbn0iLCJpbXBvcnQgeyBnZXRTZWxlY3RlZEZvbGRlcklEIH0gZnJvbSBcIi4vZm9sZGVyRG9tXCI7XG5pbXBvcnQgeyBmb2xkZXJzQXJyYXksIGdldEZvbGRlckluc3RhbmNlLCBnZXRUYXNrLCByZW1vdmVGcm9tVGFza3MgfSBmcm9tIFwiLi4vZm9sZGVyXCI7XG5cbmNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIik7XG5cbmNvbnN0IHByaW9yaXRpZXMgPSB7XG4gICAgXCIxXCI6IFwiaW1wb3J0YW50XCIsXG4gICAgXCIyXCI6IFwibWVkaXVtXCIsXG4gICAgXCIzXCI6IFwibG93XCIsXG4gICAgXCI0XCI6IFwibm9uZVwiLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRUYXNrcygpIHtcbiAgICB0b2RvTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGNvbnN0IHNlbGVjdEZvbGRlciA9IGdldFNlbGVjdGVkRm9sZGVySUQoKTtcbiAgICBpZihzZWxlY3RGb2xkZXIgPT09IFwiYWxsXCIpIHsgXG4gICAgICAgIGxvYWRBbGxUYXNrcygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZvbGRlciA9IGdldEZvbGRlckluc3RhbmNlKGdldFNlbGVjdGVkRm9sZGVySUQoKSk7XG4gICAgICAgIGZvbGRlci50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBjcmVhdGVUYXNrKHRhc2spO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQWxsVGFza3MoKSB7XG4gICAgZm9sZGVyc0FycmF5LmZvckVhY2goZm9sZGVyID0+IHtcbiAgICAgICAgZm9sZGVyLnRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICBjcmVhdGVUYXNrKHRhc2spO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGFzayh0YXNrKSB7XG5cbiAgICBjb25zdCB0b2RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0b2RvLmNsYXNzTGlzdC5hZGQoXCJ0b2RvXCIpO1xuXG4gICAgY29uc3QgZGl2MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgZGl2MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZChcImNoZWNrYm94XCIpO1xuXG4gICAgaWYodGFzay5pc0NvbXBsZXRlKSB7XG4gICAgICAgIGNoZWNrYm94LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKC4vaWNvbnMvY2hlY2tib3gucG5nKVwiO1xuICAgIH1cblxuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc3QgdGFzayA9IGdldEV2ZW50VGFzayhlKTtcbiAgICAgICAgaWYoIXRhc2suaXNDb21wbGV0ZSkge1xuICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoLi9pY29ucy9jaGVja2JveC5naWYpXCI7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhc2sgPSBnZXRFdmVudFRhc2soZSk7XG4gICAgICAgIGlmKCF0YXNrLmlzQ29tcGxldGUpIHtcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGFuZ2VDaGVja2VkKTtcblxuICAgIGNvbnN0IHRvZG9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICB0b2RvVGl0bGUuY2xhc3NMaXN0LmFkZChcInRvZG8tdGl0bGVcIik7XG5cbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZChcInByaW9yaXR5XCIpO1xuICAgIHByaW9yaXR5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGFuZ2VQcmlvcml0eSk7XG5cbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwidG9kby1kYXRlXCIpO1xuXG4gICAgY29uc3QgcmVtb3ZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjb25zdCByZW1vdmVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICByZW1vdmVJY29uLnNyYyA9IFwiLi9pY29ucy9yZW1vdmUucG5nXCI7XG4gICAgcmVtb3ZlQnV0dG9uLmFwcGVuZENoaWxkKHJlbW92ZUljb24pO1xuXG4gICAgcmVtb3ZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtdG9kb1wiKVxuICAgIHJlbW92ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVtb3ZlRnJvbVRhc2tzKTtcblxuICAgIHJlbW92ZUljb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG4gICAgICAgIHJlbW92ZUljb24uc3JjID0gXCIuL2ljb25zL3JlbW92ZS5naWZcIjtcbiAgICB9KTtcbiAgICByZW1vdmVJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsICgpID0+IHtcbiAgICAgICAgcmVtb3ZlSWNvbi5zcmMgPSBcIi4vaWNvbnMvcmVtb3ZlLnBuZ1wiO1xuICAgIH0pO1xuXG4gICAgZGl2MS5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgZGl2MS5hcHBlbmRDaGlsZCh0b2RvVGl0bGUpO1xuXG4gICAgZGl2Mi5hcHBlbmRDaGlsZChwcmlvcml0eSk7XG4gICAgZGl2Mi5hcHBlbmRDaGlsZChkdWVEYXRlKTtcbiAgICBkaXYyLmFwcGVuZENoaWxkKHJlbW92ZUJ1dHRvbik7XG5cbiAgICB0b2RvVGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xuXG4gICAgc2V0UHJpb3JpdHkodGFzaywgcHJpb3JpdHkpO1xuICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmR1ZURhdGU7XG5cbiAgICB0b2RvLmFwcGVuZENoaWxkKGRpdjEpO1xuICAgIHRvZG8uYXBwZW5kQ2hpbGQoZGl2Mik7XG5cbiAgICB0b2RvLmlkID0gdGFzay5pZDtcbiAgICB0b2RvLmRhdGFzZXQuZm9sZGVySWQgPSB0YXNrLmZvbGRlcklkO1xuXG4gICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQodG9kbyk7XG59XG5cblxuZnVuY3Rpb24gc2V0UHJpb3JpdHkodGFzaywgcHJpb3JpdHkpIHtcbiAgICBsZXQgcHIgPSBwcmlvcml0aWVzW3Rhc2sucHJpb3JpdHldO1xuICAgIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQocHIpO1xuICAgIHByaW9yaXR5LnRleHRDb250ZW50ID0gcHI7XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVByaW9yaXR5KCkge1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VDaGVja2VkKGV2ZW50KSB7XG4gICAgY29uc3QgdGFzayA9IGdldEV2ZW50VGFzayhldmVudCk7XG4gICAgdGFzay50b2dnbGVDb21wbGV0ZSgpO1xuICAgIGxvYWRUYXNrcygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXZlbnRUYXNrKGV2ZW50KSB7XG4gICAgY29uc3QgdHMgPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi50b2RvXCIpO1xuICAgIGNvbnN0IHRhc2sgPSBnZXRUYXNrKHRzLmlkLCB0cy5kYXRhc2V0LmZvbGRlcklkKTtcbiAgICByZXR1cm4gdGFzaztcbn0iLCJpbXBvcnQgeyBnZXRTZWxlY3RlZEZvbGRlcklEIH0gZnJvbSBcIi4vZG9tU2NyaXB0cy9mb2xkZXJEb21cIjtcbmltcG9ydCB7IGxvYWRUYXNrcywgbG9hZEFsbFRhc2tzIH0gZnJvbSBcIi4vZG9tU2NyaXB0cy90YXNrRG9tXCI7XG5cbmV4cG9ydCBsZXQgZm9sZGVyc0FycmF5ID0gW107XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld0ZvbGRlcihuYW1lLCB0YXNrcyA9IFtdLCBpZCA9IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICB0YXNrczogdGFza3MsXG4gICAgICAgIGlkOiBpZCxcblxuICAgICAgICBhZGRUYXNrKHRhc2spIHtcbiAgICAgICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVUYXNrKHRhc2tJZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWxldGluZyB0YXNrIC4uLi4uXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy50YXNrcy5maWx0ZXIodHMgPT4gdHMuaWQgIT09IHRhc2tJZCkpO1xuICAgICAgICAgICAgdGhpcy50YXNrcyA9IHRoaXMudGFza3MuZmlsdGVyKHRzID0+IHRzLmlkICE9PSB0YXNrSWQpO1xuICAgICAgICAgICAgdGhpcy50YXNrcy5mb3JFYWNoKCh0cywgaW5kZXgpID0+ICB7XG4gICAgICAgICAgICAgICAgdHMuaWQgPSBpbmRleDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn0gXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRUb0ZvbGRlckFycmF5KGZvbGRlck5hbWUpIHtcbiAgICBjb25zdCBmb2xkZXIgPSBuZXdGb2xkZXIoZm9sZGVyTmFtZSk7XG4gICAgZm9sZGVyLmlkID0gZm9sZGVyc0FycmF5Lmxlbmd0aCAhPT0gMCA/IGZvbGRlcnNBcnJheS5sZW5ndGggOiAwO1xuICAgIGZvbGRlcnNBcnJheS5wdXNoKGZvbGRlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb2xkZXJJbnN0YW5jZShmb2xkZXJJZCkge1xuICAgIHJldHVybiBmb2xkZXJzQXJyYXkuZmlsdGVyKGZsID0+IGZsLmlkID09IGZvbGRlcklkKVswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRvVGFza0FycmF5KHRhc2spIHtcbiAgICBsZXQgZm9sZGVySWQgPSBOdW1iZXIoZ2V0U2VsZWN0ZWRGb2xkZXJJRCgpKTtcbiAgICBmb2xkZXJzQXJyYXkuZm9yRWFjaChmbCA9PiB7XG4gICAgICAgIGlmKGZsLmlkID09IGZvbGRlcklkKSB7XG4gICAgICAgICAgICB0YXNrLmlkID0gZmwudGFza3MubGVuZ3RoO1xuICAgICAgICAgICAgdGFzay5mb2xkZXJJZCA9IGZvbGRlcklkO1xuICAgICAgICAgICAgZmwuYWRkVGFzayh0YXNrKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRnJvbVRhc2tzKGUpIHtcbiAgICBjb25zdCB0b2RvID0gZS50YXJnZXQuY2xvc2VzdChcIi50b2RvXCIpO1xuICAgIGNvbnN0IHRhc2tJZCA9IE51bWJlcih0b2RvLmlkKTtcbiAgICBjb25zdCBmb2xkZXJJZCA9IE51bWJlcih0b2RvLmRhdGFzZXQuZm9sZGVySWQpO1xuICAgIGZvbGRlcnNBcnJheS5mb3JFYWNoKGZsID0+IHtcbiAgICAgICAgaWYoZmwuaWQgPT0gZm9sZGVySWQpIHtcbiAgICAgICAgICAgIGZsLnJlbW92ZVRhc2sodGFza0lkKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGxvYWRUYXNrcygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFzayh0YXNrSWQsIGZvbGRlcklkKSB7XG4gICAgY29uc3QgZm9sZGVyID0gZ2V0Rm9sZGVySW5zdGFuY2UoZm9sZGVySWQpO1xuICAgIHJldHVybiBmb2xkZXIudGFza3MuZmluZCh0cyA9PiB0cy5pZCA9PSB0YXNrSWQpO1xufVxuXG5cbiIsImltcG9ydCB7aW5pdGlhbGl6ZSAsIGFkZFRhc2tzVG9QYWdlfSBmcm9tIFwiLi9kb21TY3JpcHRzL2RvbVwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCB7IGFkZFRvVGFza0FycmF5IH0gZnJvbSBcIi4vZm9sZGVyXCI7XG5pbXBvcnQgeyBsb2FkVGFza3MgfSBmcm9tIFwiLi9kb21TY3JpcHRzL3Rhc2tEb21cIjtcblxuaW5pdGlhbGl6ZSgpO1xuXG5sZXQgdGFzazEgPSBuZXcgVGFzayhcIkFiIGV4ZXJjaXNlXCIsIFwiZG8gMzAganVtcGluZyBqYWNrc1wiLCBcblwiMTQwMiAvIDggLyAyN1wiLCBcIjNcIiwgMCk7XG5cbmFkZFRvVGFza0FycmF5KHRhc2sxKTtcbmxvYWRUYXNrcygpO1xuXG4iLCJleHBvcnQgY2xhc3MgVGFzayB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgXG4gICAgICAgIGRlc2NyaXB0aW9uID0gXCJObyBkZXNjcmlwdGlvblwiLFxuICAgICAgICBkdWVEYXRlID0gXCJcIiwgcHJpb3JpdHksIGlkLCBmb2xkZXJJZCkge1xuICAgICAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgICAgIHRoaXMuaXNDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICAgICAgdGhpcy5mb2xkZXJJZCA9IGZvbGRlcklkO1xuICAgICAgICB9XG5cbiAgICB0b2dnbGVDb21wbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5pc0NvbXBsZXRlID0gIXRoaXMuaXNDb21wbGV0ZTtcbiAgICB9ICBcblxufVxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9