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
/* harmony export */   addTasksToPage: () => (/* binding */ addTasksToPage),
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

function addTasksToPage() {
    todoList.innerHTML = "";
    ___WEBPACK_IMPORTED_MODULE_3__.tasksArray.forEach(task =>  { (0,_taskDom__WEBPACK_IMPORTED_MODULE_2__.createTask)(task) });
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
/* harmony export */   initialize: () => (/* binding */ initialize)
/* harmony export */ });
const foldersList = document.querySelector(".folders");
const newFolderPrompt = document.querySelector(".newFolderInput");
const newFolderName = document.querySelector("#folderNameInput");

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
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/domScripts/dom.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .. */ "./src/index.js");




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
    ___WEBPACK_IMPORTED_MODULE_2__.tasksArray.push(newTask);
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.addTasksToPage)();
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
/* harmony export */   createTask: () => (/* binding */ createTask)
/* harmony export */ });
const todoList = document.querySelector(".todo-list");
const newTaskModal = document.querySelector(".new-task-modal");

const priorities = {
    "1": "important",
    "2": "medium",
    "3": "low",
    "4": "none",
};

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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tasksArray: () => (/* binding */ tasksArray)
/* harmony export */ });
/* harmony import */ var _domScripts_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domScripts/dom */ "./src/domScripts/dom.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/task.js");



(0,_domScripts_dom__WEBPACK_IMPORTED_MODULE_0__.initialize)();

let task1 = new _task__WEBPACK_IMPORTED_MODULE_1__.Task("Ab exercise", "do 30 jumping jacks", 
"1402 / 8 / 27", "3", "workouts");


let tasksArray = [];
tasksArray.push(task1);
(0,_domScripts_dom__WEBPACK_IMPORTED_MODULE_0__.addTasksToPage)();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdEO0FBQ0M7QUFDbEI7QUFDTTtBQUNiOztBQUVoQztBQUNBOztBQUVPO0FBQ1AsSUFBSSxzREFBVztBQUNmLElBQUksdURBQVc7QUFDZiwrQ0FBK0Msc0RBQWE7QUFDNUQ7O0FBRU87QUFDUDtBQUNBLElBQUkseUNBQVUsb0JBQW9CLG9EQUFVLFFBQVE7QUFDcEQ7OztBQUdBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFDQTtBQUNBOztBQUVPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hEK0I7QUFDUTtBQUNQOztBQUVoQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLHVDQUFJO0FBQzVCLElBQUkseUNBQVU7QUFDZCxJQUFJLG9EQUFjO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7OztBQ3JEQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQzVENkQ7QUFDL0I7O0FBRTlCLDJEQUFVOztBQUVWLGdCQUFnQix1Q0FBSTtBQUNwQjs7O0FBR087QUFDUDtBQUNBLCtEQUFjOzs7Ozs7Ozs7Ozs7OztBQ1hQOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7VUNqQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tU2NyaXB0cy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbVNjcmlwdHMvZm9sZGVyRG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb21TY3JpcHRzL21vZGlmeVRhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbVNjcmlwdHMvdGFza0RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluaXRpYWxpemUgYXMgaW5pdEZvbGRlcnMgfSBmcm9tIFwiLi9mb2xkZXJEb21cIjtcbmltcG9ydCB7IGluaXRpYWxpemUgYXMgaW5pdE5ld1Rhc2sgfSBmcm9tIFwiLi9tb2RpZnlUYXNrXCI7XG5pbXBvcnQgeyBjcmVhdGVUYXNrIH0gZnJvbSBcIi4vdGFza0RvbVwiO1xuaW1wb3J0IHsgb3BlblRvRG9Nb2RhbCB9IGZyb20gXCIuL21vZGlmeVRhc2tcIjtcbmltcG9ydCB7IHRhc2tzQXJyYXkgfSBmcm9tIFwiLi5cIjtcblxuY29uc3QgY3JlYXRlTmV3VGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRvZG8tYnRuXCIpO1xuY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgaW5pdEZvbGRlcnMoKTtcbiAgICBpbml0TmV3VGFzaygpO1xuICAgIGNyZWF0ZU5ld1Rhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Ub0RvTW9kYWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVGFza3NUb1BhZ2UoKSB7XG4gICAgdG9kb0xpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0YXNrc0FycmF5LmZvckVhY2godGFzayA9PiAgeyBjcmVhdGVUYXNrKHRhc2spIH0pO1xufVxuXG5cbmZ1bmN0aW9uIG9wZW5Gb2xkZXIoZm9sZGVySWQpIHtcbiAgICBcbn0iLCJjb25zdCBmb2xkZXJzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9sZGVyc1wiKTtcbmNvbnN0IG5ld0ZvbGRlclByb21wdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3Rm9sZGVySW5wdXRcIik7XG5jb25zdCBuZXdGb2xkZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb2xkZXJOYW1lSW5wdXRcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuXG4gICAgY29uc3Qgb3Blbk5ld0ZvbGRlckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkRm9sZGVyQnRuXCIpO1xuICAgIG9wZW5OZXdGb2xkZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBuZXdGb2xkZXJQcm9tcHQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gICAgXG4gfSk7XG5cbiAgICBjb25zdCBjcmVhdGVGb2xkZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyZWF0ZUZvbGRlckJ0blwiKTtcbiAgICBjcmVhdGVGb2xkZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFkZEZvbGRlcik7XG5cbiAgICBjb25zdCBjYW5jZWxGb2xkZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbmNlbEZvbGRlckJ0blwiKTtcbiAgICBjYW5jZWxGb2xkZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgcmVzZXRGb2xkZXJJbnB1dCgpO1xuICAgICAgICBuZXdGb2xkZXJQcm9tcHQuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG4gICAgfSk7XG59XG5cblxuZnVuY3Rpb24gYWRkRm9sZGVyKCkge1xuICAgIGNyZWF0ZUZvbGRlcihuZXdGb2xkZXJOYW1lLnZhbHVlKTtcbiAgICBuZXdGb2xkZXJQcm9tcHQuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG4gICAgcmVzZXRGb2xkZXJJbnB1dCgpO1xufVxuXG5cbmZ1bmN0aW9uIHJlc2V0Rm9sZGVySW5wdXQoKSB7XG4gICAgbmV3Rm9sZGVyTmFtZS52YWx1ZSA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvbGRlcihmb2xkZXJOYW1lKSB7XG5cbiAgICBjb25zdCBmb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvbGRlci5jbGFzc0xpc3QuYWRkKFwiZm9sZGVyXCIpO1xuXG4gICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgaWNvbi5zcmMgPSBcIi4vaWNvbnMvbGlzdC5wbmdcIjtcblxuICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBuYW1lLnRleHRDb250ZW50ID0gZm9sZGVyTmFtZTtcblxuICAgIGZvbGRlci5hcHBlbmRDaGlsZChpY29uKTtcbiAgICBmb2xkZXIuYXBwZW5kQ2hpbGQobmFtZSk7XG4gICAgZm9sZGVyc0xpc3QuYXBwZW5kQ2hpbGQoZm9sZGVyKTtcbn0iLCJpbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL3Rhc2tcIjtcbmltcG9ydCB7IGFkZFRhc2tzVG9QYWdlIH0gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgeyB0YXNrc0FycmF5IH0gZnJvbSBcIi4uXCI7XG5cbmNvbnN0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNhdmUtdG9kby1idG5cIik7XG5jb25zdCBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC10b2RvLWJ0blwiKTtcblxuY29uc3QgbmV3VGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctdGFzay1tb2RhbFwiKTtcblxuY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpO1xuY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPVwidG9kby1ub3RlXCJdJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNhdmVUYXNrKTtcbiAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNhbmNlbFRhc2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlblRvRG9Nb2RhbCgpIHtcbiAgICBuZXdUYXNrTW9kYWwuc2hvd01vZGFsKCk7XG59XG5cbmxldCB0aXRsZSA9IFwiXCI7XG5sZXQgZGV1RGF0ZSA9IFwiXCI7XG5sZXQgcHJpb3JpdHkgPSAgXCJcIjtcbmxldCBkZXNjcmlwdGlvbiA9IFwiXCI7XG5cbmZ1bmN0aW9uIGdldElucHV0cygpIHtcbiAgICB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb1RpdGxlXCIpLnZhbHVlO1xuICAgIGRldURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9EYXRlXCIpLnZhbHVlO1xuICAgIHByaW9yaXR5ID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJwcmlvcml0eVwiXTpjaGVja2VkJykudmFsdWU7XG4gICAgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPVwidG9kby1ub3RlXCJdJykudmFsdWU7XG59XG5cbmZ1bmN0aW9uIHNhdmVUYXNrKCkge1xuICAgIGdldElucHV0cygpO1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRldURhdGUsIHByaW9yaXR5KTtcbiAgICB0YXNrc0FycmF5LnB1c2gobmV3VGFzayk7XG4gICAgYWRkVGFza3NUb1BhZ2UoKTtcbiAgICBuZXdUYXNrTW9kYWwuY2xvc2UoKTtcbiAgICByZXNldElucHV0cygpO1xufVxuXG5mdW5jdGlvbiBjYW5jZWxUYXNrKCkge1xuICAgIG5ld1Rhc2tNb2RhbC5jbG9zZSgpO1xuICAgIHJlc2V0SW5wdXRzKCk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0SW5wdXRzKCkge1xuICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgICAgaW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IFwiXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W2lkPVwiZm91cnRoLXByXCJdJykuY2hlY2tlZCA9IHRydWU7XG4gICAgfSk7XG59IiwiY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcbmNvbnN0IG5ld1Rhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXRhc2stbW9kYWxcIik7XG5cbmNvbnN0IHByaW9yaXRpZXMgPSB7XG4gICAgXCIxXCI6IFwiaW1wb3J0YW50XCIsXG4gICAgXCIyXCI6IFwibWVkaXVtXCIsXG4gICAgXCIzXCI6IFwibG93XCIsXG4gICAgXCI0XCI6IFwibm9uZVwiLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRhc2sodGFzaykge1xuXG4gICAgY29uc3QgdG9kbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdG9kby5jbGFzc0xpc3QuYWRkKFwidG9kb1wiKTtcblxuICAgIGNvbnN0IGRpdjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGRpdjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJjaGVja2JveFwiKTtcbiAgICBjb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgdG9kb1RpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLXRpdGxlXCIpO1xuXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eVwiKTtcbiAgICBwcmlvcml0eS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2hhbmdlUHJpb3JpdHkpO1xuXG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGR1ZURhdGUuY2xhc3NMaXN0LmFkZChcInRvZG8tZGF0ZVwiKTtcblxuICAgIGRpdjEuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgIGRpdjEuYXBwZW5kQ2hpbGQodG9kb1RpdGxlKTtcblxuICAgIGRpdjIuYXBwZW5kQ2hpbGQocHJpb3JpdHkpO1xuICAgIGRpdjIuYXBwZW5kQ2hpbGQoZHVlRGF0ZSk7XG5cbiAgICB0b2RvVGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xuXG4gICAgc2V0UHJpb3JpdHkodGFzaywgcHJpb3JpdHkpO1xuICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmR1ZURhdGU7XG5cbiAgICB0b2RvLmFwcGVuZENoaWxkKGRpdjEpO1xuICAgIHRvZG8uYXBwZW5kQ2hpbGQoZGl2Mik7XG5cbiAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZCh0b2RvKTtcbn1cblxuXG5mdW5jdGlvbiBzZXRQcmlvcml0eSh0YXNrLCBwcmlvcml0eSkge1xuICAgIGxldCBwciA9IHByaW9yaXRpZXNbdGFzay5wcmlvcml0eV07XG4gICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZChwcik7XG4gICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSBwcjtcbn1cblxuZnVuY3Rpb24gY2hhbmdlUHJpb3JpdHkocHIpIHtcbiAgICBjb25zdCB0YXJnZXRUYXNrID0gcHIudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZSgpIHtcblxufSIsImltcG9ydCB7aW5pdGlhbGl6ZSAsIGFkZFRhc2tzVG9QYWdlfSBmcm9tIFwiLi9kb21TY3JpcHRzL2RvbVwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tcIjtcblxuaW5pdGlhbGl6ZSgpO1xuXG5sZXQgdGFzazEgPSBuZXcgVGFzayhcIkFiIGV4ZXJjaXNlXCIsIFwiZG8gMzAganVtcGluZyBqYWNrc1wiLCBcblwiMTQwMiAvIDggLyAyN1wiLCBcIjNcIiwgXCJ3b3Jrb3V0c1wiKTtcblxuXG5leHBvcnQgbGV0IHRhc2tzQXJyYXkgPSBbXTtcbnRhc2tzQXJyYXkucHVzaCh0YXNrMSk7XG5hZGRUYXNrc1RvUGFnZSgpOyIsImV4cG9ydCBjbGFzcyBUYXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBcbiAgICAgICAgZGVzY3JpcHRpb24gPSBcIk5vIGRlc2NyaXB0aW9uXCIsXG4gICAgICAgIGR1ZURhdGUgPSBcIlwiLCBwcmlvcml0eSwgaWQpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgdG9nZ2xlQ29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZSA9ICF0aGlzLmlzQ29tcGxldGU7XG4gICAgfSAgXG5cbn1cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==