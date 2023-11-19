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
/* harmony export */   addTask: () => (/* binding */ addTask),
/* harmony export */   initialize: () => (/* binding */ initialize)
/* harmony export */ });
/* harmony import */ var _folderDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./folderDom */ "./src/domScripts/folderDom.js");
/* harmony import */ var _taskDom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskDom */ "./src/domScripts/taskDom.js");



function initialize() {
    (0,_folderDom__WEBPACK_IMPORTED_MODULE_0__.initialize)();
}

function addTask(task) {
    (0,_taskDom__WEBPACK_IMPORTED_MODULE_1__.createTask)(task);
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
        dueDate = "", priority,
        folderName) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.isComplete = false;
            this.folderName = folderName;
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _domScripts_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domScripts/dom */ "./src/domScripts/dom.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/task.js");



(0,_domScripts_dom__WEBPACK_IMPORTED_MODULE_0__.initialize)();

let task1 = new _task__WEBPACK_IMPORTED_MODULE_1__.Task("Ab exercise", "do 30 jumping jacks", 
"1402 / 8 / 27", "important", "workouts");
(0,_domScripts_dom__WEBPACK_IMPORTED_MODULE_0__.addTask)(task1);

const folders = [];
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUF3RDtBQUNqQjs7QUFFaEM7QUFDUCxJQUFJLHNEQUFXO0FBQ2Y7O0FBRU87QUFDUCxJQUFJLG9EQUFVO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTs7QUFFTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2hEQTs7QUFFTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUM3Q087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztVQ25CQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05zRDtBQUN4Qjs7QUFFOUIsMkRBQVU7O0FBRVYsZ0JBQWdCLHVDQUFJO0FBQ3BCO0FBQ0Esd0RBQU87O0FBRVAsbUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tU2NyaXB0cy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbVNjcmlwdHMvZm9sZGVyRG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb21TY3JpcHRzL3Rhc2tEb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluaXRpYWxpemUgYXMgaW5pdEZvbGRlcnMgfSBmcm9tIFwiLi9mb2xkZXJEb21cIjtcbmltcG9ydCB7IGNyZWF0ZVRhc2sgfSBmcm9tIFwiLi90YXNrRG9tXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIGluaXRGb2xkZXJzKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRUYXNrKHRhc2spIHtcbiAgICBjcmVhdGVUYXNrKHRhc2spO1xufVxuXG5mdW5jdGlvbiBvcGVuRm9sZGVyKGZvbGRlcklkKSB7XG4gICAgXG59IiwiY29uc3QgZm9sZGVyc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvbGRlcnNcIik7XG5jb25zdCBuZXdGb2xkZXJQcm9tcHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ld0ZvbGRlcklucHV0XCIpO1xuY29uc3QgbmV3Rm9sZGVyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9sZGVyTmFtZUlucHV0XCIpO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcblxuICAgIGNvbnN0IG9wZW5OZXdGb2xkZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZEZvbGRlckJ0blwiKTtcbiAgICBvcGVuTmV3Rm9sZGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgbmV3Rm9sZGVyUHJvbXB0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuICAgIFxuIH0pO1xuXG4gICAgY29uc3QgY3JlYXRlRm9sZGVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGVGb2xkZXJCdG5cIik7XG4gICAgY3JlYXRlRm9sZGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRGb2xkZXIpO1xuXG4gICAgY29uc3QgY2FuY2VsRm9sZGVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW5jZWxGb2xkZXJCdG5cIik7XG4gICAgY2FuY2VsRm9sZGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHJlc2V0Rm9sZGVySW5wdXQoKTtcbiAgICAgICAgbmV3Rm9sZGVyUHJvbXB0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgIH0pO1xufVxuXG5cbmZ1bmN0aW9uIGFkZEZvbGRlcigpIHtcbiAgICBjcmVhdGVGb2xkZXIobmV3Rm9sZGVyTmFtZS52YWx1ZSk7XG4gICAgbmV3Rm9sZGVyUHJvbXB0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgIHJlc2V0Rm9sZGVySW5wdXQoKTtcbn1cblxuXG5mdW5jdGlvbiByZXNldEZvbGRlcklucHV0KCkge1xuICAgIG5ld0ZvbGRlck5hbWUudmFsdWUgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGb2xkZXIoZm9sZGVyTmFtZSkge1xuXG4gICAgY29uc3QgZm9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb2xkZXIuY2xhc3NMaXN0LmFkZChcImZvbGRlclwiKTtcblxuICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGljb24uc3JjID0gXCIuL2ljb25zL2xpc3QucG5nXCI7XG5cbiAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgbmFtZS50ZXh0Q29udGVudCA9IGZvbGRlck5hbWU7XG5cbiAgICBmb2xkZXIuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgZm9sZGVyLmFwcGVuZENoaWxkKG5hbWUpO1xuICAgIGZvbGRlcnNMaXN0LmFwcGVuZENoaWxkKGZvbGRlcik7XG59IiwiY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRhc2sodGFzaykge1xuXG4gICAgY29uc3QgdG9kbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdG9kby5jbGFzc0xpc3QuYWRkKFwidG9kb1wiKTtcblxuICAgIGNvbnN0IGRpdjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGRpdjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJjaGVja2JveFwiKTtcbiAgICBjb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgdG9kb1RpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLXRpdGxlXCIpO1xuXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eVwiKTtcblxuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWRhdGVcIik7XG5cbiAgICBkaXYxLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICBkaXYxLmFwcGVuZENoaWxkKHRvZG9UaXRsZSk7XG5cbiAgICBkaXYyLmFwcGVuZENoaWxkKHByaW9yaXR5KTtcbiAgICBkaXYyLmFwcGVuZENoaWxkKGR1ZURhdGUpO1xuXG4gICAgdG9kb1RpdGxlLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcbiAgICBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKHRhc2sucHJpb3JpdHkpO1xuICAgIHByaW9yaXR5LnRleHRDb250ZW50ID0gdGFzay5wcmlvcml0eTtcbiAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5kdWVEYXRlO1xuXG4gICAgdG9kby5hcHBlbmRDaGlsZChkaXYxKTtcbiAgICB0b2RvLmFwcGVuZENoaWxkKGRpdjIpO1xuXG4gICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQodG9kbyk7XG59XG5cblxuZnVuY3Rpb24gc2V0UHJpb3JpdHkoKSB7XG4gICAgXG59XG5cbmZ1bmN0aW9uIGdldERhdGUoKSB7XG5cbn0iLCJleHBvcnQgY2xhc3MgVGFzayB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgXG4gICAgICAgIGRlc2NyaXB0aW9uID0gXCJObyBkZXNjcmlwdGlvblwiLFxuICAgICAgICBkdWVEYXRlID0gXCJcIiwgcHJpb3JpdHksXG4gICAgICAgIGZvbGRlck5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZm9sZGVyTmFtZSA9IGZvbGRlck5hbWU7XG4gICAgICAgIH1cblxuXG4gICAgdG9nZ2xlQ29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZSA9ICF0aGlzLmlzQ29tcGxldGU7XG4gICAgfSAgXG5cbn1cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2luaXRpYWxpemUgLCBhZGRUYXNrfSBmcm9tIFwiLi9kb21TY3JpcHRzL2RvbVwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tcIjtcblxuaW5pdGlhbGl6ZSgpO1xuXG5sZXQgdGFzazEgPSBuZXcgVGFzayhcIkFiIGV4ZXJjaXNlXCIsIFwiZG8gMzAganVtcGluZyBqYWNrc1wiLCBcblwiMTQwMiAvIDggLyAyN1wiLCBcImltcG9ydGFudFwiLCBcIndvcmtvdXRzXCIpO1xuYWRkVGFzayh0YXNrMSk7XG5cbmNvbnN0IGZvbGRlcnMgPSBbXTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=